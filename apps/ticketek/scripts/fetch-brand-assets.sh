#!/usr/bin/env sh
# Re-fetches the official Ticketek brand kit and event artwork into public/brand/.
# Sources: the public Ticketek brand page (d35kvm5iuwjt9t.cloudfront.net/static-pages/branding/)
# and the Ticketek image CDN. Requires curl, unzip and node (sharp is a devDependency).
set -eu
cd "$(dirname "$0")/.."
CDN="https://d35kvm5iuwjt9t.cloudfront.net"
OUT="public/brand"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT/events"

curl -fsSL "$CDN/brand/Ticketek_Logo_Pack.zip" -o "$TMP/logo-pack.zip"
unzip -q -o "$TMP/logo-pack.zip" -d "$TMP"
cp "$TMP/Ticketek_Logo_Pack/RGB/SVG/TKT-Logo-White-RGB.svg" "$OUT/ticketek-logo-white.svg"
cp "$TMP/Ticketek_Logo_Pack/RGB/SVG/TKT-Logo-Midnight-RGB.svg" "$OUT/ticketek-logo-midnight.svg"
cp "$TMP/Ticketek_Logo_Pack/RGB/SVG/TKT-Logo-Black-RGB.svg" "$OUT/ticketek-logo-black.svg"
curl -fsSL "$CDN/static-pages/branding/favicon.ico" -o "$OUT/favicon.ico"

node scripts/optimize-event-images.mjs
echo "Brand assets refreshed in $OUT"
