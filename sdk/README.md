# SDK Notes — Offline Mode

Adapters can run Abracadabra visions **without internet**.  
For example:
- `lightingAdapter` → talks directly to Philips Hue bridge on local LAN.  
- `audioAdapter` → plays locally stored audio files.  
- `displayAdapter` → updates connected screen over HDMI or LAN.

This demonstrates how **resilience is built-in**:  
Even if central servers or LLMs are unavailable, pre-compiled visions can still be validated and executed locally.
