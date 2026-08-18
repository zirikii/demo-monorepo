#!/usr/bin/env bash
# Re-fetch the HUB24 brand artwork used by this demo into public/brand/.
#
# hub24.com.au is blocked by the restricted build environment this demo was authored in, so
# public/brand/ currently ships hand-authored stand-ins. Run this from an unrestricted network
# to pull the official artwork instead. See public/brand/brand-assets.json for provenance.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/brand

UPLOADS="https://www.hub24.com.au/wp-content/uploads/2021/10"

fetch() {
  local dest="$1" url="$2"
  echo "→ ${dest}"
  if ! curl -fsSL --retry 3 --max-time 30 -o "$dest" "$url"; then
    echo "  ! unreachable: ${url} (keeping the existing stand-in)" >&2
    return 0
  fi
}

fetch public/brand/hub24-logo-dark.svg "${UPLOADS}/hub24-logo-dark.svg"
fetch public/brand/hub24-logo-light.svg "${UPLOADS}/hub24-logo-light.svg"

echo "Done. Review public/brand/brand-assets.json if any asset stayed on its stand-in."
