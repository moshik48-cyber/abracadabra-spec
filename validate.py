import json
import jsonschema
from jsonschema import validate

# טוען את הסכמה
with open("schema/vision-0.1.json", "r", encoding="utf-8") as f:
    schema = json.load(f)

# טוען את קובץ הדוגמה
with open("schema/sample-scene.json", "r", encoding="utf-8") as f:
    sample = json.load(f)

# מבצע בדיקה
try:
    validate(instance=sample, schema=schema)
    print("✅ הקובץ sample-scene.json תקין לפי הסכמה!")
except jsonschema.exceptions.ValidationError as e:
    print("❌ שגיאה:", e.message)
