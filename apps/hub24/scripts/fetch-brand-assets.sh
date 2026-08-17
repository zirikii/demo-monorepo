#!/usr/bin/env bash
#
# Replace the hand-authored placeholder lockups in public/brand with the official HUB24
# artwork. Requires network access to hub24.com.au, which is blocked in the Cursor cloud
# environment this demo was authored in — run it locally.
#
# Usage: pnpm --filter hub24-website-demo brand
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$DIR/public/brand"
BASE="https://www.hub24.com.au/wp-content/uploads/2021/10"

mkdir -p "$OUT"

fetch() {
  local url="$1" dest="$2"
  echo "→ $url"
  if curl -fsSL --max-time 30 -A "Mozilla/5.0" "$url" -o "$dest.tmp"; then
    # A WAF challenge page also returns 200, so only keep the download if it is really SVG.
    if head -c 512 "$dest.tmp" | grep -qi "<svg"; then
      mv "$dest.tmp" "$dest"
      echo "  saved $(basename "$dest")"
    else
      rm -f "$dest.tmp"
      echo "  skipped $(basename "$dest") — response was not an SVG (bot challenge?)" >&2
    fi
  else
    rm -f "$dest.tmp"
    echo "  failed $(basename "$dest")" >&2
  fi
}

fetch "$BASE/hub24-logo-dark.svg" "$OUT/logo-dark.svg"
fetch "$BASE/hub24-logo-light.svg" "$OUT/logo-light.svg"

echo
echo "Done. Review public/brand/brand-assets.json and update the 'source' fields for any"
echo "file that was replaced with official artwork."
