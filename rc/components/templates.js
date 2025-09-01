// src/components/templates.js
export const TEMPLATES = [
  {
    id: "city_independence",
    name: "City Independence",
    params: [
      { key: "city", label: "City", default: "Jerusalem" },
      { key: "anthem", label: "Play Anthem?", default: true },
    ],
    compile(params) {
      const city = params.city || "Jerusalem";
      const anthem = !!params.anthem;
      return {
        version: "abra-0.1.0",
        intent: `Independence Day in ${city}`,
        scene: {
          flow: [
            { do: [ { lighting: { ref: "city_street_lights", preset: "blue" } } ] },
            { after: "600ms", do: [ { lighting: { ref: "public_buildings", preset: "white" } } ] },
            ...(anthem ? [{ after: "1200ms", do: [ { audio: { ref: "city_pa", play: true } } ] }] : []),
            { after: "2s", do: [ { screen: { ref: "main_square_wall", show: `Independence Day – ${city} 🇮🇱` } } ] }
          ]
        }
      };
    }
  },
  {
    id: "shabbat_prep",
    name: "Shabbat Prep (Home)",
    params: [],
    compile() {
      return {
        version: "abra-0.1.0",
        intent: "Prepare Shabbat room",
        scene: {
          flow: [
            { do: [ { lighting: { ref: "living_room", preset: "dim" } } ] },
            { after: "1s", do: [ { audio: { ref: "home_speaker", play: true } } ] },
            { after: "2s", do: [ { screen: { ref: "wall", show: "Shabbat Shalom ✨" } } ] }
          ]
        }
      };
    }
  },
  {
    id: "escape_room_indy",
    name: "Escape Room: Indy",
    params: [{ key: "banner", label: "Banner", default: "Welcome to the Temple of Doom" }],
    compile({ banner }) {
      return {
        version: "abra-0.1.0",
        intent: "Escape room – Indiana Jones vibe",
        scene: {
          flow: [
            { do: [ { lighting: { ref: "room_lights", preset: "dim" } } ] },
            { after: "1200ms", do: [ { audio: { ref: "room_speakers", play: true } } ] },
            { after: "2s", do: [ { screen: { ref: "projector", show: banner || "Jungle Awaits..." } } ] }
          ]
        }
      };
    }
  }
];

export function compileTemplate(id, params = {}) {
  const t = TEMPLATES.find(x => x.id === id);
  if (!t) throw new Error(`Template not found: ${id}`);
  return t.compile(params);
}
