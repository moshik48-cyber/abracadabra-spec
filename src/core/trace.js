// src/core/trace.js
// Lightweight tracing for Abracadabra Vision runs.
// No deps. Works in Node/Browser.

function nowTs() { return new Date().toISOString(); }
function rid(len=8){ return Math.random().toString(16).slice(2, 2+len); }

export class TraceSession {
  constructor({ runId = `run_${rid(12)}`, visionIntent = "", metadata = {} } = {}) {
    this.runId = runId;
    this.visionIntent = visionIntent;
    this.startedAt = nowTs();
    this.finishedAt = null;
    this.events = [];
    this.metadata = metadata;
  }

  event(type, payload = {}, level = "info") {
    const evt = {
      t: nowTs(),
      runId: this.runId,
      level,
      type,
      ...payload
    };
    this.events.push(evt);
    // Console log for quick developer feedback (can be silenced)
    if (level === "error") console.error("[abra]", type, payload);
    else if (level === "warn") console.warn("[abra]", type, payload);
    else console.log("[abra]", type, payload);
    return evt;
  }

  spanStart(kind, ctx = {}) {
    const spanId = `sp_${rid(10)}`;
    this.event("span.start", { spanId, kind, ctx });
    return spanId;
  }

  spanEnd(spanId, outcome = "ok", data = {}) {
    this.event("span.end", { spanId, outcome, data });
  }

  finish(outcome = "ok") {
    this.finishedAt = nowTs();
    this.event("run.finish", { outcome });
  }

  toJSON() {
    return {
      runId: this.runId,
      visionIntent: this.visionIntent,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      events: this.events,
      metadata: this.metadata
    };
  }
}

export function createConsoleSink(trace) {
  // Helper: pretty-print a compact summary
  const summary = {
    runId: trace.runId,
    startedAt: trace.startedAt,
    finishedAt: trace.finishedAt,
    events: trace.events.length
  };
  console.log("[abra][trace-summary]", summary);
}
