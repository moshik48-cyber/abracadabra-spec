# Example Prompts for Golem

Golem receives a single sentence of natural language and outputs a clean JSON object.

---

**Prompt → JSON**

"Create a quote for Shlomo Cohen with paint and plaster"

```json
{
  "action": "create_quote",
  "client": "Shlomo Cohen",
  "items": ["paint", "plaster"],
  "vat": 0.17,
  "platform": "base44"
}
{
  "action": "lights_on",
  "client": "Jerusalem City Hall",
  "items": ["lights"],
  "vat": 0,
  "platform": "hue"
}
---

## 📜 4. `golem_protocol.md`

**📍 Copy to:** `abracadabra-spec/golem/golem_protocol.md`

```markdown
# Golem Protocol (MCP)

The Golem does not chat.  
It listens. It parses. It acts.

---

## Core Concept

- **Input:** Free-form human intent
- **Processing:** Via an LLM (like GPT) using a tightly scoped prompt
- **Output:** A clean JSON matching the MCP schema

---

## Advantages over typical automation:

- 🔒 Offline-ready
- 🧱 JSON structure enables deterministic execution
- 💡 Auditable, testable, reviewable pipelines
- 🤝 Works with real-world APIs: Hue, Telegram, Twilio, Webhooks, etc.
