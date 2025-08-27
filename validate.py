# validate.py (ב-root של הרפו)
import json, sys, glob
from jsonschema import validate, Draft202012Validator

SCHEMA_PATH = "schema/vision-0.1.json"
EXAMPLES_GLOB = "examples/*.json"

def main():
    with open(SCHEMA_PATH, encoding="utf-8") as f:
        schema = json.load(f)
    validator = Draft202012Validator(schema)

    ok = True
    for path in glob.glob(EXAMPLES_GLOB):
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        errors = sorted(validator.iter_errors(data), key=lambda e: e.path)
        if errors:
            ok = False
            print(f"❌ {path}")
            for e in errors:
                print("   -", e.message)
        else:
            print(f"✅ {path}")
    sys.exit(0 if ok else 1)

if __name__ == "__main__":
    main()
