// src/core/demo.run.js
// Run: node src/core/demo.run.js  (requires Node >=18 for ES modules)
// If your repo is CommonJS, wrap with transpile or change to require().

import { runVision } from "./workflow.js";
import { ExampleAdapters } from "./adapters.example.js";
import { writeFileSync } from "node:fs";

const vision = {
  version: "abra-0.1.0",
  intent: "Independence Day city scene",
  scene: {
    flow: [
      { do: [{ lighting: { ref: "city_street_lights", preset: "blue" } }] },
      { after: "600ms", do: [{ lighting: { ref: "public_buildings", preset: "white" } }] },
      { after: "1200ms", do: [{ audio: { ref: "city_pa", play: true } }] },
      { after: "2s", do: [{ screen: { ref: "main_square_wall", show: "Independence Day 🇮🇱" } }] },
    ]
  }
};

const offline = process.argv.includes("--offline");

const main = async () => {
  const res = await runVision(vision, ExampleAdapters, {
    offline,
    retries: 1,
    actionTimeoutMs: 3000
  });

  writeFileSync("trace.json", JSON.stringify(res.trace, null, 2));
  console.log("\nSaved trace.json\n");
  if (!res.ok) process.exit(1);
};

main().catch(e => { console.error(e); process.exit(1); });
