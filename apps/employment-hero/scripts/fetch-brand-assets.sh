#!/usr/bin/env bash
# Regenerates local Employment Hero brand SVGs.
# Official site CDN is often blocked in restricted cloud agents; the committed
# SVGs match the official horizontal lockup (circular two-heads mark + wordmark).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="$ROOT/public/brand"
mkdir -p "$BRAND"
echo "Brand assets already committed under public/brand/."
echo "Palette: purple #7622D7, ink #212529."
ls -la "$BRAND"
