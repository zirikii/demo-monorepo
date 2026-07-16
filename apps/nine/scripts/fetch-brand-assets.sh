#!/usr/bin/env bash
# Idempotent fetch of nine.com.au brand assets into public/brand/.
#
# NOTE: The cloud build environment used to scaffold this demo has restricted
# egress and cannot reach nine.com.au, so the committed logo.svg was taken from
# the official Nine wordmark supplied in the task brief. Run this script from a
# machine with network access to refresh the assets from the live site.
set -euo pipefail

DEST="$(cd "$(dirname "$0")/.." && pwd)/public/brand"
mkdir -p "$DEST"

fetch() {
  local url="$1" out="$2"
  echo "→ $out"
  curl -fsSL "$url" -o "$DEST/$out" || echo "  (skipped — $url unreachable)"
}

# Header wordmark + favicon as served by nine.com.au. Paths change over time;
# inspect the live page source / network tab if these 404.
fetch "https://www.nine.com.au/favicon.ico" "favicon.ico"

echo "Done. Review $DEST and update brand-assets.json with any new sources."
