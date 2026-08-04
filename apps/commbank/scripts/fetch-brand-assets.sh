#!/usr/bin/env bash
# Idempotent brand-asset fetch for the CommBank demo.
#
# The cloud build environment does not allowlist commbank.com.au, so the committed files under
# public/brand/ are vector reproductions. Run this from a network where the host is reachable to
# swap in the official assets. Assets are public CDN/DAM URLs — visual fidelity only.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="$ROOT/public/brand"
BASE="https://www.commbank.com.au"
mkdir -p "$BRAND"

curl -fsSL -A 'Mozilla/5.0' -o "$BRAND/logo.svg" \
  "$BASE/content/dam/commbank/commBank-logo.svg"

echo "Brand assets refreshed under $BRAND"
echo "Re-check public/brand/brand-assets.json and flip 'origin' to 'official' for replaced files."
