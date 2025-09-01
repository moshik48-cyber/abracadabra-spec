// src/core/adapters.example.js
// Example adapters. Replace these with real Hue/Audio/Screen integrations.

export const ExampleAdapters = {
  async lighting({ ref, preset }, { offline, trace }) {
    // Here you would call Hue/KNX/etc. For demo, we simulate:
    if (offline) {
      trace?.event("adapter.sim.lighting", { ref, preset });
      return { simulated: true, ref, preset };
    }
    // TODO: real call here
    return { ok: true, ref, preset };
  },

  async audio({ ref, play }, { offline, trace }) {
    if (offline) {
      trace?.event("adapter.sim.audio", { ref, play });
      return { simulated: true, ref, play };
    }
    // TODO: real call (local file / stream / pause)
    return { ok: true, ref, play };
  },

  async screen({ ref, show }, { offline, trace }) {
    if (offline) {
      trace?.event("adapter.sim.screen", { ref, show });
      return { simulated: true, ref, show };
    }
    // TODO: real call (projector/TV signage)
    return { ok: true, ref, show };
  }
};
