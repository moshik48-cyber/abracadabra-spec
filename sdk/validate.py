import json
import sys
from jsonschema import validate, ValidationError

with open("schema/vision-0.1.json", encoding="utf-8") as f:
    schema = json.load(f)

def validate_scene(path):
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    try:
        validate(instance=data, schema=schema)
        print(f"✅ {path} is valid.")
    except ValidationError as e:
        print(f"❌ {path} is invalid:\n{e.message}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python sdk/validate.py examples/welcome-scene.json")
    else:
        validate_scene(sys.argv[1])
