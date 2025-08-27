# ✨ Abracadabra – Speak Your Vision Into Reality

**Abracadabra** is a new **vision schema language** – a simple way to describe and run **experiential scenes** (lights, sound, screen, vibration, IoT).  

Think of it as **HTML for experiences**:  
from text → to living, multi-sensory reality.

---

### 🚀 Why Abracadabra?
- ✨ **Simple**: Write what you imagine, run it anywhere.  
- 🌍 **Universal**: A shared schema for XR, IoT, Smart Homes, Events.  
- 🔌 **Interoperable**: Works with LLMs, MCP, and any API/Adapter.  
- 📦 **Extensible**: Developers can add their own adapters.  

---

### 📜 Vision Schema (v0.1)

Core format is **JSON-based**:

```json
{
  "version": "abra-0.1.0",
  "intent": "welcome ceremony",
  "bind": {
    "lights": { "type": "light_group" },
    "sound":  { "type": "audio" },
    "screen": { "type": "screen" }
  },
  "scene": {
    "flow": [
      { "do": [ { "lighting": { "ref": "lights", "preset": "blue-wash" } } ] },
      { "after": "2s", "do": [ { "audio": { "ref": "sound", "play": true } } ] },
      { "after": "5s", "do": [ { "screen": { "ref": "screen", "show": "Welcome to Abracadabra!" } } ] }
    ]
  }
}
