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
---

## 🔒 Cyber-Resilience & Offline Mode

One of the **unique advantages** of Abracadabra is its **ability to function even if the internet goes down**.  
While most LLM-based systems depend on constant online access, Abracadabra defines a **Vision Schema** that can be:

- **Stored locally** as JSON blueprints.  
- **Shared peer-to-peer** between machines without central servers.  
- **Executed offline** by adapters (e.g., Philips Hue, Raspberry Pi, audio systems) using the same schema.

This means:
- A city can still run its emergency protocol if networks are under cyberattack.  
- A factory floor can continue to coordinate machines without cloud access.  
- Robots and IoT devices can operate with **pre-compiled visions**, even in disconnected environments.

In other words:  
Abracadabra is not just a convenience layer for LLMs — it is also a **resilient protocol for continuity under attack or outage**.  
Just like HTML pages can be stored and loaded without internet, Vision Schema makes "intent → action" survivable even when connectivity fails.

## 🔍 Related Work

Abracadabra builds on a rich ecosystem of standards and frameworks. Here is how our approach differs:

- **W3C Web of Things (WoT TD):** Describes device capabilities in JSON-LD for interoperability.  
  → *Abracadabra goes beyond device description to orchestrate cross-domain visions with timing and flow.*

- **Schema.org Actions:** Provides a vocabulary for actions on the web.  
  → *We define structured multi-step scenarios (Vision Schema), not just atomic actions.*

- **Alexa / Google Smart Home APIs:** Define device intents (lights, thermostat, etc.) for consumer IoT.  
  → *Abracadabra addresses large-scale, multi-domain coordination (cities, factories, robotics).*

- **OPC UA (industrial interoperability):** Standard for secure industrial data models.  
  → *We provide human-intent-driven orchestration, not telemetry exchange.*

- **AutomationML (IEC 62714):** Engineering data exchange for digital twins.  
  → *Our schema is lightweight, natural-language-driven, and suitable for real-time intent execution.*

- **ROS Actions / PDDL / Behavior Trees:** Formal planning models for robotics.  
  → *Abracadabra bridges LLMs and heterogeneous systems with a unified, human-readable schema.*

- **MCP / Function Calling (OpenAI, etc.):** Connects LLMs to tools with JSON.  
  → *We sit above MCP: defining the **vision** (what should happen) and delegating the “how” to adapters/tools.*

---

🧩 **Key Differentiator**:  
All of the above handle *pieces* (devices, vocabularies, telemetry, planning, or tool calls).  
**Abracadabra defines a unified, validated schema for human intent as multi-step flows, offline-first, and adapter-ready across domains (IoT, robotics, VR, CAD, public infrastructure).**
💡 **Investor Note:**  
While existing standards solve narrow slices of interoperability, **Abracadabra is the first to define a unified, human-readable intent schema that works across domains and offline.**  
This positions it as both **defensible IP** and a potential **foundational layer** for future AI-driven ecosystems.
