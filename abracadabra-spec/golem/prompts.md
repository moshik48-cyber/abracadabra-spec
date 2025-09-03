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
