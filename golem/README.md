# 🧱 GOLEM Branch

A new philosophical and technical module within Abracadabra.

## What is GOLEM?

GOLEM is a minimalistic runtime agent that:
- Executes structured dreams (Abracadabra JSON)
- Receives one-liner visions or full scenes
- Responds in strict JSON
- Never speaks, only acts

Think of it as:
> “A golem that silently follows your structured wishes.”

## Folder Structure

- `schema/golem-schema.json`  
  → JSON Schema that defines the GOLEM-compatible blueprint.

- `runtime/golem-runner.js`  
  → Minimal JavaScript engine that parses and executes a scene JSON.

---

## How to Use

1. **Create a scene JSON**:
   ```json
   {
     "version": "abra-0.1.0",
     "intent": "Simple lighting scene",
     "scene": {
       "flow": [
         { "do": [{ "lighting": { "ref": "living_room", "preset": "warm" } }] }
       ]
     }
   }
