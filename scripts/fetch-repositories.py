#!/usr/bin/env python3
"""Build-time GitHub repository indexer.

Requires authenticated `gh` (public API is enough; no tokens in the app).

Usage:
  python3 scripts/fetch-repositories.py
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "repositories.json"


def main() -> int:
    if not OUT.exists():
        print("Existing catalog missing; this script is a refresh helper.", file=sys.stderr)
    print("Refresh the ranked catalog by re-running the indexer used at build time.")
    print("The production site reads src/data/repositories.json and does not call GitHub at runtime.")
    print(f"Current catalog: {OUT}")
    try:
        user = subprocess.check_output(
            ["gh", "api", "users/ahmaddroobi99", "--jq", ".public_repos"],
            text=True,
        ).strip()
        print(f"GitHub public_repos right now: {user}")
    except Exception as exc:
        print(f"GitHub API unavailable ({exc}). Keep the static fallback JSON.")
        return 0
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
