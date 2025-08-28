#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
from validate import validate_file

def main():
    parser = argparse.ArgumentParser(
        description="Abracadabra CLI - run and validate vision schemas"
    )
    parser.add_argument("command", choices=["validate", "run"], help="Command to execute")
    parser.add_argument("file", help="Path to vision file (json)")
    args = parser.parse_args()

    file_path = Path(args.file)

    if not file_path.exists():
        print(f"❌ File not found: {file_path}")
        return

    if args.command == "validate":
        ok = validate_file(file_path)
        if ok:
            print("✅ Schema is valid")
        else:
            print("❌ Schema validation failed")

    elif args.command == "run":
        with open(file_path, "r") as f:
            data = json.load(f)
            print("✨ Running vision:", json.dumps(data, indent=2))

if __name__ == "__main__":
    main()
