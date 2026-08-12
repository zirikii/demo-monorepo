#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/public/brand"

curl --fail --location --silent --show-error \
  "https://employmenthero.com/wp-content/themes/employmentherocom2025/assets/images/eh-logo-full.svg" \
  --output "$DEST/logo.svg"

curl --fail --location --silent --show-error \
  "https://employmenthero.com/wp-content/themes/employmentherocom2025/assets/images/small-logo.svg" \
  --output "$DEST/favicon.svg"

echo "Employment Hero brand assets refreshed in $DEST"
