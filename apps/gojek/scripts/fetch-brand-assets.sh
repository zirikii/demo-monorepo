#!/usr/bin/env bash
# Fetch / refresh Gojek brand assets for the (unofficial) demo.
#
# The gojek.io header renders its wordmark as INLINE SVG (not a hosted file), so the
# canonical assets in public/brand/*.svg are committed recreations of that markup with
# Gojek's published brand green (#00AA13). This script is provided for parity with the
# other demo apps and documents where the real marks live; it will try the public
# green Solv mark CDN if it is reachable, otherwise it is a no-op.
set -euo pipefail

DEST="$(cd "$(dirname "$0")/.." && pwd)/public/brand"
mkdir -p "$DEST"

# Optional: the public green Solv mark used across gojek.com help pages.
SOLV_URL="https://lelogama.go-jek.com/prime/upload/image/solv-logo-green.svg"

if command -v curl >/dev/null 2>&1; then
  echo "Attempting to refresh Solv mark from $SOLV_URL ..."
  if curl -fsSL "$SOLV_URL" -o "$DEST/solv-cdn-green.svg" 2>/dev/null; then
    echo "Saved $DEST/solv-cdn-green.svg"
  else
    echo "CDN not reachable (offline/allowlist) — keeping committed SVGs. This is fine."
  fi
else
  echo "curl not found — keeping committed SVGs."
fi

echo "Brand assets ready in $DEST"
