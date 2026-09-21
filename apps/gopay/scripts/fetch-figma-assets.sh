#!/usr/bin/env bash
# Re-download the static assets exported from the GoPay reKYC Figma file.
#
# public/figma/* is committed, so this script is only needed when the design changes.
# The URLs in public/figma/manifest.json are Figma MCP export links which expire ~7 days
# after they are generated — regenerate them with the Figma MCP `get_design_context`
# tool before re-running this.
#
# Some networks resolve figma.com but not www.figma.com; CloudFront serves both from the
# same distribution, so we request the apex host and pass www.figma.com as the Host header.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/figma"
MANIFEST="$DEST/manifest.json"

if [[ ! -f "$MANIFEST" ]]; then
  echo "No manifest at $MANIFEST" >&2
  exit 1
fi

mkdir -p "$DEST"

node -e '
const fs = require("node:fs");
const manifest = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
for (const [name, url] of Object.entries(manifest.assets)) console.log(`${name}\t${url}`);
' "$MANIFEST" | while IFS=$'\t' read -r name url; do
  apex="${url/https:\/\/www.figma.com/https://figma.com}"
  if curl -fsSL -H "Host: www.figma.com" "$apex" -o "$DEST/$name"; then
    echo "ok   $name"
  else
    echo "FAIL $name (export link probably expired)" >&2
  fi
done

echo "Assets in $DEST"
