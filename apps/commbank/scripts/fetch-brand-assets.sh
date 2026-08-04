#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="$ROOT/public/brand"
SOURCE="https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg"
TARGET="$BRAND/commbank-logo.svg"
TEMP="$BRAND/.commbank-logo.download"

mkdir -p "$BRAND"
if curl -fsSL -A "Mozilla/5.0" -o "$TEMP" "$SOURCE"; then
  mv "$TEMP" "$TARGET"
  echo "CommBank logo refreshed from the public source."
else
  rm -f "$TEMP"
  if [[ -f "$TARGET" ]]; then
    echo "Source unavailable; keeping the checked-in faithful local fallback."
  else
    echo "Source unavailable and no local fallback exists." >&2
    exit 1
  fi
fi
