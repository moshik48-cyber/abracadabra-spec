// src/adapters/hue.js
// שימוש דמו: runVisionOnHue(vision, { bridgeIp, username, groupId, simulate:true }, emit)

function presetToHueState(preset) {
  // פשטני להדגמה
  const map = {
    blue:  { on: true, bri: 200, hue: 46920, sat: 200 },
    white: { on: true, bri: 254, ct: 300 },
    dim:   { on: true, bri: 60 },
    normal:{ on: true, bri: 140 }
  };
  return map[preset] || { on: true, bri: 140 };
}

async function hueGroupAction({ bridgeIp, username, groupId, state }) {
  const url = `http://${bridgeIp}/api/${username}/groups/${groupId}/action`;
  const resp = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state)
  });
  return resp.json();
}

export async function runVisionOnHue(vision, config, emit = () => {}) {
  const flow = vision?.scene?.flow || [];
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const toMs = (s) => s?.endsWith("ms") ? parseInt(s) : s?.endsWith("s") ? parseInt(s)*1000 : 0;

  emit("hue_start", { cfg: { ...config, username: "•••" } });

  for (const step of flow) {
    const d = toMs(step.after);
    if (d) await wait(d);

    for (const action of step.do || []) {
      if (action.lighting) {
        const preset = action.lighting.preset;
        const state = presetToHueState(preset);
        emit("hue_apply", { preset, state });

        if (config.simulate) continue;

        try {
          const out = await hueGroupAction({
            bridgeIp: config.bridgeIp,
            username: config.username,
            groupId: config.groupId,
            state
          });
          emit("hue_response", { out });
        } catch (e) {
          emit("hue_error", { error: String(e) });
        }
      }
    }
  }
  emit("hue_done", {});
}
