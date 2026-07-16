#!/usr/bin/env bash
# Reproduces brand asset placement for the nine.com.au demo.
# The primary logo was supplied in the task brief (not fetched from CDN —
# nine.com.au is egress-blocked in this environment).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/brand"
mkdir -p "$DEST"
echo "Brand assets already committed under $DEST"
ls -la "$DEST"
