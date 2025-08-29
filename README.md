# ✨ Abracadabra — Vision Schema for Human-to-Machine Intent

**Abracadabra** is a simple, open JSON *language* (a “Vision Schema”) that turns a short human request into a structured plan computers can run across domains (IoT, robotics, CAD/3D printing, VR, smart cities).

Today:
- LLMs (like ChatGPT) answer ad-hoc in text.
- Every domain has its own format (IoT, CAD, VR…), so nothing lines up.
- There is no single, shared “intent format.”

Abracadabra:
- Converts natural language → **Vision Schema JSON** (one simple format).
- Then any adapter (home lights, speakers, screens, printers, robots…) can execute its part.
- Think of it as **HTML for the physical world**.

---

## ✏️ Example 1 — Independence Day
**User input:**
**Vision Schema JSON:**
```json
{
  "version": "abra-0.1.0",
  "intent": "Independence Day scene",
  "scene": {
    "flow": [
      { "do": [ { "lighting": { "ref": "city_lights", "preset": "blue" } } ] },
      { "after": "500ms", "do": [ { "lighting": { "ref": "public_buildings", "preset": "white" } } ] },
      { "after": "1s", "do": [ { "audio": { "ref": "city_pa", "play": "anthem.mp3" } } ] },
      { "after": "2s", "do": [ { "screen": { "ref": "main_square", "show": "🇮🇱 Happy Independence Day" } } ] }
    ]
  }
}
Prepare the living room for Shabbat: dim the lights, play a soft nigun, show 'Shabbat Shalom ✨'.
{
  "version": "abra-0.1.0",
  "intent": "Shabbat preparation",
  "scene": {
    "flow": [
      { "do": [ { "lighting": { "ref": "living_room", "preset": "dim" } } ] },
      { "after": "1s", "do": [ { "audio": { "ref": "home_speaker", "play": "soft_nigun.mp3" } } ] },
      { "after": "2s", "do": [ { "screen": { "ref": "wall", "show": "Shabbat Shalom ✨" } } ] }
    ]
  }
}
