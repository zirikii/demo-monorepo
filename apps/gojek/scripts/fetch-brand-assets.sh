#!/usr/bin/env bash
# Re-fetch the Gojek brand artwork used by this demo into public/brand/.
#
# gojek.io is blocked by the restricted build environment this demo was authored in, so
# public/brand/ currently ships the lockup supplied with the build request plus recolours of
# it. Run this from an unrestricted network to refresh from the live site instead. See
# public/brand/brand-assets.json for provenance.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/brand

fetch() {
  local dest="$1" url="$2"
  echo "→ ${dest}"
  if ! curl -fsSL --retry 3 --max-time 30 -o "$dest" "$url"; then
    echo "  ! unreachable: ${url} (keeping the existing artwork)" >&2
    return 0
  fi
}

fetch public/brand/gojek-logo-white.svg "https://www.gojek.io/images/logo/gojek-white.svg"
fetch public/brand/favicon.svg "https://www.gojek.io/favicon.svg"

echo "Done. Review public/brand/brand-assets.json if any asset stayed on its local copy."
