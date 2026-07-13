#!/usr/bin/env bash
# Idempotent brand-asset fetch for the Changi Airport demo.
# Assets are public CDN/DAM URLs from changiairport.com — for visual fidelity only.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="$ROOT/public/brand"
BASE="https://www.changiairport.com"
mkdir -p "$BRAND/happenings" "$BRAND/destinations" "$BRAND/icons"

curl -fsSL -A 'Mozilla/5.0' -o "$BRAND/logo.svg" \
  "$BASE/content/dam/changiairport/sg/airport/evergreen/homepage/Logo_CAG_Horizontal_RGB_Pos.svg"
curl -fsSL -A 'Mozilla/5.0' -o "$BRAND/logo-light.png" \
  "$BASE/content/dam/changiairport/common/header/logo-light.png"
curl -fsSL -A 'Mozilla/5.0' -o "$BRAND/icons/globe.svg" \
  "$BASE/etc.clientlibs/changiairport/clientlibs/clientlib-site/resources/images/website-globe.svg"
curl -fsSL -A 'Mozilla/5.0' -o "$BRAND/icons/search.svg" \
  "$BASE/content/dam/changiairport/common/header/search.svg"
curl -fsSL -A 'Mozilla/5.0' -o "$BRAND/icons/app-store.svg" \
  "$BASE/content/dam/changiairport/common/footer/AppStore.svg"
curl -fsSL -A 'Mozilla/5.0' -o "$BRAND/icons/google-play.svg" \
  "$BASE/content/dam/changiairport/common/footer/GooglePlay.svg"

echo "Brand assets refreshed under $BRAND"
