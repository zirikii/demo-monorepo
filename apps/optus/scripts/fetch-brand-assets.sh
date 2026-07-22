#!/usr/bin/env bash
# Idempotent brand asset fetch for the Optus demo.
#
# NOTE: optus.com.au is outside the Cursor cloud network allowlist, so these
# downloads will fail in that environment and the committed original SVGs (built
# from the documented Optus palette) are used instead. Run this from a machine
# where optus.com.au is reachable to swap in the official brand assets, then
# re-point the <img> src values (they already reference /brand/*).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="$ROOT/public/brand"
PHOTOS="$BRAND/photos"
BASE="https://www.optus.com.au"
mkdir -p "$PHOTOS"

fetch() {
  local url="$1" out="$2"
  if curl -fsSL -A "Mozilla/5.0" -o "$out" "$url"; then
    echo "fetched $out"
  else
    echo "WARN: could not fetch $url (kept existing $out)" >&2
  fi
}

# Official logo assets (see media centre). Endpoints may change over time.
fetch "$BASE/etc.clientlibs/optus/clientlibs/clientlib-site/resources/images/optus-logo.svg" "$BRAND/logo.svg"
fetch "$BASE/etc.clientlibs/optus/clientlibs/clientlib-site/resources/images/optus-logo-white.svg" "$BRAND/logo-white.svg"
fetch "$BASE/favicon.ico" "$BRAND/favicon.ico"

DATE="$(date -u +%Y-%m-%d)"
echo "Brand asset refresh attempted at $DATE — see $BRAND/brand-assets.json"
