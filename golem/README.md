# GOLEM

Golem is a zero-talk, high-intent execution layer for reality-shaping.

Unlike LLMs that generate endless conversations, **Golem listens, interprets, and executes** using a strict JSON schema.

## 🧠 Intent → 🎯 Action

### Input:

> "אני צריך הצעת מחיר לשיפוץ עבור שלמה כהן"

### Output:

```json
{
  "action": "create_quote",
  "client": "שלמה כהן",
  "items": ["שפכטל", "צבע", "עבודה"],
  "vat": 0.17,
  "platform": "base44"
}
---

## 🔬 שלב 5: דמוים ב־`/golem/examples`

### 📦 hue-demo.json
```json
{
  "action": "set_lights",
  "platform": "hue",
  "color": "blue",
  "zone": "city_center"
}
{
  "action": "drone_delivery",
  "items": ["פיש", "צ'יפס"],
  "destination": "תל אביב, רח' השלום 5",
  "platform": "smartDrone"
}
