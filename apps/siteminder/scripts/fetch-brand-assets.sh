#!/usr/bin/env sh
# Rebuilds public/brand/ from SiteMinder's official YouTube channel.
# siteminder.com and its asset CDN aren't reachable from the build sandbox, so:
#   - the wordmark is traced (potrace) from the white-background logo in the official
#     "SiteMinder x Stripe" video thumbnail (8OBzeYHS1YM) and recoloured to Stratos navy #00033B;
#   - marketing imagery is the channel's own thumbnails, listed in scripts/media.json.
# Requires curl, ffmpeg, potrace and node (sharp is a devDependency).
set -eu
cd "$(dirname "$0")/.."
OUT="public/brand"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT/media"

for id in $(node -e 'const m=require("./scripts/media.json");console.log([...new Set(m.images.map(i=>i.id))].join(" "))'); do
  curl -fsSL "https://i.ytimg.com/vi/$id/maxresdefault.jpg" -o "$TMP/$id.jpg"
done
curl -fsSL "https://i.ytimg.com/vi/8OBzeYHS1YM/maxresdefault.jpg" -o "$TMP/logo-src.jpg"

ffmpeg -nostdin -loglevel error -y -i "$TMP/logo-src.jpg" \
  -vf "crop=380:90:345:315,scale=3040:720:flags=lanczos,format=gray,lutyuv=y='if(gt(val,165),0,255)'" "$TMP/logo.pgm"
potrace -s --turdsize 200 --alphamax 1.0 --opttolerance 0.4 -o "$TMP/logo.svg" "$TMP/logo.pgm"
node scripts/build-logos.mjs "$TMP/logo.svg"
node scripts/optimize-media.mjs "$TMP"
echo "Brand assets refreshed in $OUT"
