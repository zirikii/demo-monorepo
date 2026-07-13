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

# Destination stills — Scene7 square crops (names match live AU homepage carousel)
SCENE7="https://changiairport.scene7.com/is/image/changiairport"
DEST_CROP="wid=640&hei=640&fit=crop"

fetch_destination() {
  local outfile="$1"
  local asset="$2"
  local url="${SCENE7}/${asset// /%20}?${DEST_CROP}"
  echo "  → $outfile"
  curl -fsSL -A 'Mozilla/5.0' -o "$BRAND/destinations/$outfile" "$url"
}

echo "Fetching destination images (640×640 crop)…"
fetch_destination "kyoto.jpg"       "01 Kyoto"
fetch_destination "rome.jpg"          "02 rome"
fetch_destination "surabaya.jpg"      "03 Surabaya"
fetch_destination "cebu.jpg"          "04 Cebu"
fetch_destination "phnom-penh.jpg"    "05 PhnomPenh"
fetch_destination "melbourne.jpg"     "06 Melbourne"
fetch_destination "penang.jpg"        "07 Penang"
fetch_destination "haikou.jpg"        "08 Haikou"
fetch_destination "addis-ababa.jpg"   "09 AddisAbaba"
fetch_destination "jeonju.jpg"        "10 Jeonju"
fetch_destination "bahrain.jpg"       "11 Bahrain"
fetch_destination "busan.jpg"         "12 Busan"
fetch_destination "ipoh.jpg"          "13 Ipoh"
fetch_destination "sibu.jpg"          "14 Sibu"
fetch_destination "london.jpg"        "15 London"
fetch_destination "tokyo.jpg"         "16 Tokyo"
fetch_destination "amsterdam.jpg"     "17 Amsterdam"
fetch_destination "bangkok.jpg"       "18 Bangkok"
fetch_destination "jeju.jpg"          "19 Jeju"
fetch_destination "hong-kong.jpg"     "20 HongKong"

# Scene7 sources include baked-in white padding; trim to full-bleed squares.
if command -v python3 >/dev/null 2>&1; then
  if python3 -c "import PIL" 2>/dev/null; then
    python3 "$ROOT/scripts/trim-destination-images.py"
  else
    echo "Note: install Pillow (pip install pillow) and run scripts/trim-destination-images.py to remove image padding."
  fi
fi

echo "Brand assets refreshed under $BRAND"
