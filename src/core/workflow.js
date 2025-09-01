// src/core/workflow.js
// Deterministic runner for Vision JSON with idempotency, retry, timeout + tracing.

import { TraceSession } from "./trace.js";

// --- Helpers ---
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
const parseDelay = (s) => {
  if (!s) return 0;
  if (typeof s === "number") return s;
  const m = String(s).match(/^(\d+)(ms|s)$/);
  if (!m) throw new Error(`Bad delay format: ${s}`);
  const n = parseInt(m[1], 10);
  return m[2] === "s" ? n * 1000 : n;
};

// A tiny idempotency store (in-memory). Replace with Redis/DB in production.
class IdempotencyStore {
  constructor(){ this.done = new Set(); }
  has(key){ return this.done.has(key); }
  mark(key){ this.done.add(key); }
}

// --- Default policy ---
const DEFAULTS = {
  stepTimeoutMs: 7000,   // per step
  actionTimeoutMs: 4000, // per action
  retries: 1,            // per action
  offline: false,        // if true -> prefer offline adapters/sim
};

// Vision validator (minimal, assumes you've got a stricter one elsewhere)
export function basicValidateVision(v) {
  const errors = [];
  if (!v || typeof v !== "object") errors.push("Root must be object");
  if (v.version !== "abra-0.1.0") errors.push('version must be "abra-0.1.0"');
  if (!v.intent) errors.push("intent required");
  if (!v.scene || !Array.isArray(v.scene.flow)) errors.push("scene.flow must be array");
  return { ok: errors.length === 0, errors };
}

// Run a single action with timeout + retry + tracing
async function runAction({ action, adapters, trace, policy, idempotencyKey }) {
  const kind = Object.keys(action)[0]; // lighting|audio|screen|...
  const payload = action[kind];
  const span = trace.spanStart("action", { kind, payload, idempotencyKey });

  // Idempotency: if already executed we skip
  if (policy.store && policy.store.has(idempotencyKey)) {
    trace.event("action.skip.idempotent", { kind, idempotencyKey });
    trace.spanEnd(span, "skipped");
    return { skipped: true };
  }

  // Adapter selection
  const fn = adapters?.[kind];
  if (typeof fn !== "function") {
    trace.event("action.adapter.missing", { kind }, "warn");
    trace.spanEnd(span, "error", { reason: "adapter_missing" });
    throw new Error(`No adapter for ${kind}`);
  }

  // Execute with retry+timeout
  let lastErr;
  for (let attempt = 0; attempt <= (policy.retries ?? 0); attempt++) {
    const attemptSpan = trace.spanStart("action.attempt", { attempt });

    const p = Promise.resolve().then(() => fn(payload, { offline: policy.offline, trace }));
    const result = await Promise.race([
      p,
      sleep(policy.actionTimeoutMs).then(() => { throw new Error("timeout"); })
    ]).then(
      (ok) => ({ ok }),
      (err) => ({ err })
    );

    if (!result.err) {
      policy.store?.mark(idempotencyKey);
      trace.event("action.ok", { kind, attempt, result: result.ok });
      trace.spanEnd(attemptSpan, "ok");
      trace.spanEnd(span, "ok");
      return { ok: result.ok };
    }

    lastErr = result.err;
    trace.event("action.error", { kind, attempt, error: String(result.err) }, "warn");
    trace.spanEnd(attemptSpan, "error", { error: String(result.err) });
    if (attempt < (policy.retries ?? 0)) await sleep(200); // backoff tiny
  }

  trace.spanEnd(span, "error", { error: String(lastErr) });
  throw lastErr;
}

// Public API: runVision
export async function runVision(vision, adapters, options = {}) {
  const policy = { ...DEFAULTS, ...options, store: options.store ?? new IdempotencyStore() };
  const trace = policy.trace ?? new TraceSession({ visionIntent: vision?.intent, metadata: { policy } });

  const v = basicValidateVision(vision);
  if (!v.ok) {
    trace.event("vision.invalid", { errors: v.errors }, "error");
    trace.finish("error");
    return { ok: false, trace: trace.toJSON(), errors: v.errors };
  }

  trace.event("run.start", { version: vision.version, intent: vision.intent });

  for (let i = 0; i < vision.scene.flow.length; i++) {
    const step = vision.scene.flow[i];
    const span = trace.spanStart("step", { index: i, after: step.after });

    try {
      const delay = parseDelay(step.after);
      if (delay > 0) {
        trace.event("step.delay", { index: i, ms: delay });
        await sleep(delay);
      }

      const actions = step.do ?? [];
      for (let j = 0; j < actions.length; j++) {
        const action = actions[j];
        const idKey = `${i}:${j}:${JSON.stringify(action)}`;
        await runAction({ action, adapters, trace, policy, idempotencyKey: idKey });
      }

      trace.spanEnd(span, "ok");
    } catch (err) {
      trace.spanEnd(span, "error", { error: String(err) });
      trace.finish("error");
      return { ok: false, trace: trace.toJSON(), error: String(err) };
    }
  }

  trace.finish("ok");
  return { ok: true, trace: trace.toJSON() };
}
