### 🌟 Example

Here’s a simple **Abracadabra scene**:

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
