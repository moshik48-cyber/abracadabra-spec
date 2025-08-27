---

# ROADMAP.md (להדבקה)

```markdown
# Abracadabra – Roadmap

מטרה: להפוך את Abracadabra ל"שפת HTML של חוויות".

## v0.1 (Now)

- ✅ JSON Schema בסיסי (`schema/vision-0.1.json`)
- ✅ דוגמה עובדת (`examples/welcome-scene.json`)
- ✅ SDK Python + סימולטור Console
- ✅ CI שמאמת דוגמאות

### משימות פתוחות
- [ ] להוסיף Examples: `party-scene.json`, `meditation.json`, `conference-intro.json`
- [ ] לשפר README ודפי דוקו קצרים
- [ ] להתחיל CLI: `abra validate | run --sim | init`
- [ ] לתייג release: `v0.1.0`

## v0.2 (Design → Build)

- [ ] **Guards/Conditions**: `when`, `unless`
- [ ] **Variables**: `vars` + שימוש ב־`${name}`
- [ ] **Events**: `on: time/tap/mqtt`
- [ ] **Timing**: `parallel`, `repeat`, `duration` (fade)
- [ ] לשמור תאימות אחורה ל־v0.1

## SDKs & Adapters

- [ ] SDK Python יציב (Runtime אחד, לוגים טובים)
- [ ] CLI `abra` כ-PyPI package
- [ ] SDK JS/Node (Runner בסיסי)
- [ ] Adapters:
  - [ ] MQTT mock
  - [ ] Hue/DMX (סקיצה)
  - [ ] OBS/Sonos (סקיצה)

## קהילה

- [ ] דף GitHub Pages עם דמו קל (הדבק JSON → הרצה בסימולטור)
- [ ] Gallery של סצנות (תיקייה + README)
- [ ] Good First Issues מתוייגים
- [ ] פינג לשותפים/יוצרי תוכן/אירועים

## מדדי הצלחה (90 יום)

- [ ] 50+ ⭐, 10+ PRים חיצוניים
- [ ] 15+ סצנות בגלריה
- [ ] Adapter חיצוני אחד לפחות
- [ ] דמו “One-Click” למשקיע/שותף
