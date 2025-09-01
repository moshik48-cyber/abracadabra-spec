// src/components/workflow.js
function simpleHash(str) {
  let h = 0, i, chr;
  if (!str || !str.length) return "0";
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    h = (h << 5) - h + chr;
    h |= 0;
  }
  return String(h >>> 0);
}

export async function runWithWorkflow({
  vision,
  runImpl,               // e.g. window.runVision (ה-Runner הקיים)
  retry = 1,
  timeoutMs = 15000,
  idempotencyKey = null, // default: hash(vision)
  emit = () => {}
}) {
  const key = idempotencyKey || simpleHash(JSON.stringify(vision));
  const inFlightKey = `abra.inflight.${key}`;
  if (localStorage.getItem(inFlightKey)) {
    emit("workflow_skip", { reason: "idempotent_inflight", key });
    return { ok: true, skipped: true, key };
  }

  const start = Date.now();
  localStorage.setItem(inFlightKey, "1");
  emit("workflow_start", { key, timeoutMs, retry });

  let attempt = 0;
  let lastErr = null;

  while (attempt <= retry) {
    attempt++;
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), timeoutMs);

    try {
      emit("workflow_attempt", { attempt });
      // מריצים את ה-Runner בפועל
      await runImpl(vision, { signal: ac.signal, emit });
      clearTimeout(timer);
      emit("workflow_done", { ms: Date.now() - start, attempts: attempt });
      localStorage.removeItem(inFlightKey);
      return { ok: true, attempts: attempt, key };
    } catch (e) {
      clearTimeout(timer);
      lastErr = e;
      emit("workflow_error", { attempt, error: String(e) });

      if (attempt > retry) break;

      // backoff קטן
      await new Promise(r => setTimeout(r, 300 * attempt));
    }
  }

  localStorage.removeItem(inFlightKey);
  emit("workflow_failed", { error: String(lastErr) });
  return { ok: false, error: String(lastErr), key };
}
