#!/usr/bin/env bash
# Idempotent brand asset fetch for the Optus demo.
#
# NOTE: optus.com.au is unreachable from the Cursor cloud VM (egress blocked), so this
# script documents the intended official sources for when network access is enabled.
# The committed assets in public/brand/ were built from the wordmark supplied with the
# task plus locally-derived white/spark variants — run this only in an unrestricted env.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="$ROOT/public/brand"
BASE="https://www.optus.com.au"
mkdir -p "$BRAND"

echo "Attempting to fetch official Optus brand assets from $BASE ..."

# Header wordmark — inspect the live header <img>/<svg> for the current path.
curl -fsSL -A "Mozilla/5.0" -o "$BRAND/favicon.ico" "$BASE/favicon.ico" \
  || echo "WARN: favicon fetch failed (egress may be blocked); keeping committed favicon.svg"

DATE="$(date -u +%Y-%m-%d)"
echo "Done (or skipped on failure) at $DATE. Committed SVG assets remain the source of truth."
