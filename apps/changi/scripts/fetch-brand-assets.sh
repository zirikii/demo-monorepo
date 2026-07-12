#!/usr/bin/env bash
#
# Idempotently (re)download the official Changi Airport brand assets used by this
# unofficial demo for visual fidelity. Assets are self-hosted under public/brand —
# never hotlinked at runtime. Not affiliated with Changi Airport Group.
#
# Usage: apps/changi/scripts/fetch-brand-assets.sh
set -euo pipefail

BASE="https://www.changiairport.com"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/brand"
UA="Mozilla/5.0 (compatible; changi-demo-asset-fetch)"
mkdir -p "$DIR"

fetch() {
  local url="$1" out="$2"
  echo "→ $out"
  curl -sSL --max-time 30 -A "$UA" -o "$DIR/$out" "$url"
}

# Full horizontal logo (globe emblem is extracted from this into changi-globe.svg).
fetch "$BASE/content/dam/changiairport/sg/airport/evergreen/homepage/Logo_CAG_Horizontal_RGB_Pos.svg" "logo-cag-horizontal.svg"

# Footer social icons.
fetch "$BASE/content/dam/changiairport/common/footer/facebook-app-symbol.svg" "facebook.svg"
fetch "$BASE/content/dam/changiairport/common/footer/instagram.svg" "instagram.svg"
fetch "$BASE/content/dam/changiairport/common/footer/linkedin.svg" "linkedin.svg"
fetch "$BASE/content/dam/changiairport/common/footer/youtube.svg" "youtube.svg"
fetch "$BASE/content/dam/changiairport/common/footer/telegram.svg" "telegram.svg"

echo "Done. changi-globe.svg / favicon.svg are hand-extracted from the horizontal logo."
