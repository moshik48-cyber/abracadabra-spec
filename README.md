# Abracadabra – Vision Schema (v0.1)

**מה זה?**  
שפה/סכמה לתיאור *סצנה אחת* (חזון מרובה-פעולות) שניתנת לקומפילציה לכלים שונים (MCP / Node-RED / Home-Assistant / DMX / ...).

**למה צריך את זה?**  
LLM מבין שפה טבעית ו-MCP מחבר לכלים, אבל חסר **פורמט אחד** שמתאר חזון שלם (מי עושה מה, מתי ובאיזו אווירה).  
Abracadabra היא ה־"HTML" של סצנות.

---

### ליבת הסכמה
- `intent` – כותרת/שם החזון
- `bind` – שמות יציבים למשאבים (תאורה/סאונד/מסך)
- `scene.flow` – רצף/מקביליות של פעולות (עם `after` לזמנים)
- `guards` – כללי בטיחות/הרשאות/גיבויים

---## דוגמה
כך נראה תסריט בשפת Abracadabra להפעלת תאורה ומוסיקה יחד:

```json
{
  "version": "abra-0.1.0",
  "intent": "חדר שבת",
  "bind": {
    "lights": { "type": "light_group", "tags": ["living-room"] },
    "music": { "type": "audio", "src": "playlist:shabbat" }
  },
  "scene": {
    "flow": [
      { "do": [ { "lighting": { "ref": "lights", "preset": "dim" } } ] },
      { "after": "2s", "do": [ { "audio": { "ref": "music", "play": true } } ] }
    ]
  }
}



### מצב
טיוטת v0.1 – בסיס מינימלי, קל ליישום.

### רודמפ קצר
- v0.1 = JSON בלבד  
- v0.2 = דקדוק DSL  
- v0.3 = יצואנים (Node-RED/HA)  
- v0.4 = קונפורמנס טסטים רשמיים
