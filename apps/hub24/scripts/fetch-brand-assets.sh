#!/usr/bin/env bash
# Re-fetch official HUB24 wordmarks into public/brand/.
#
# hub24.com.au is often blocked from restricted build environments (TLS reset).
# This script keeps the committed stand-ins when the CDN is unreachable.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/brand .brand-cache

fetch() {
  local dest="$1" url="$2"
  echo "→ ${dest}"
  if ! curl -fsSL --retry 3 --max-time 30 -A "Mozilla/5.0" -o "$dest" "$url"; then
    echo "  ! unreachable: ${url} (keeping the existing stand-in)" >&2
    return 0
  fi
}

fetch .brand-cache/logo-light.svg \
  "https://www.hub24.com.au/wp-content/uploads/2021/10/hub24-logo-light.svg"
fetch .brand-cache/logo-dark.svg \
  "https://www.hub24.com.au/wp-content/uploads/2021/10/hub24-logo-dark.svg"
fetch .brand-cache/favicon.ico "https://www.hub24.com.au/favicon.ico"

if [ -s .brand-cache/logo-light.svg ]; then
  cp .brand-cache/logo-light.svg public/brand/logo-light.svg
  echo "→ public/brand/logo-light.svg (official)"
fi
if [ -s .brand-cache/logo-dark.svg ]; then
  cp .brand-cache/logo-dark.svg public/brand/logo-dark.svg
  echo "→ public/brand/logo-dark.svg (official)"
fi

rm -rf .brand-cache
echo "Done. Review public/brand/brand-assets.json if any asset stayed on its stand-in."
