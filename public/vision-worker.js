// public/vision-worker.js
function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }
function toMs(s){ return s?.endsWith("ms") ? parseInt(s) : s?.endsWith("s") ? parseInt(s)*1000 : 0; }

self.onmessage = async (e) => {
  const { cmd, vision } = e.data || {};
  if (cmd !== "run" || !vision) return;

  const flow = vision.scene?.flow || [];
  self.postMessage({ type: "edge_start", intent: vision.intent });

  for (const step of flow) {
    const d = toMs(step.after);
    if (d) await sleep(d);

    for (const action of (step.do||[])) {
      // במקום להריץ DOM/אודיו מהוורקר, אנחנו שולחים אירוע ל-Main Thread:
      self.postMessage({ type: "edge_action", action });
    }
  }
  self.postMessage({ type: "edge_done" });
};
