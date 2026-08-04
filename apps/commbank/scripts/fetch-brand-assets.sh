#!/usr/bin/env bash
# Fetch official CommBank brand assets into public/brand/.
# Idempotent. Falls back to existing geometric mark if CDN is unreachable.
set -uo pipefail
cd "$(dirname "$0")/.."
BRAND_DIR="public/brand"
mkdir -p "$BRAND_DIR"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"

fetch() {
  local out="$1" url="$2"
  echo "-> $out"
  if curl -sfL --retry 2 --retry-delay 1 -A "$UA" -o "$out.tmp" "$url"; then
    mv "$out.tmp" "$out"
  else
    rm -f "$out.tmp"
    echo "   WARN: failed $url (keeping existing file if present)"
  fi
}

fetch "$BRAND_DIR/commbank-logo.svg" "https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg"
# Prefer official file as favicon source when available
if [[ -f "$BRAND_DIR/commbank-logo.svg" ]]; then
  # Keep mark + favicon as diamond-only fallbacks unless replaced manually
  :
fi
echo "Done. Review public/brand/ and brand-assets.json."
