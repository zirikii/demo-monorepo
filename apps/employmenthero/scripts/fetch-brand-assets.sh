#!/usr/bin/env bash
# Re-fetch the Employment Hero brand artwork used by this demo into public/brand/.
#
# employmenthero.com and every public logo mirror are blocked from the restricted build
# environment this demo was authored in, so public/brand/ currently ships hand-authored
# stand-ins. Run this from an unrestricted network to pull the official artwork instead.
# See public/brand/brand-assets.json for provenance.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/brand .brand-cache

THEME="https://employmenthero.com/wp-content/themes/employmentherocom2025/assets/images"

fetch() {
  local dest="$1" url="$2"
  echo "→ ${dest}"
  if ! curl -fsSL --retry 3 --max-time 30 -o "$dest" "$url"; then
    echo "  ! unreachable: ${url} (keeping the existing stand-in)" >&2
    return 0
  fi
}

fetch .brand-cache/eh-logo-full.svg "${THEME}/eh-logo-full.svg"
fetch .brand-cache/small-logo.svg "${THEME}/small-logo.svg"
fetch .brand-cache/eh-horizontal-black.svg \
  "https://employmenthero.com/wp-content/uploads/2025/04/EH-Horizontal-Logo-Black-cropped.svg"
fetch .brand-cache/favicon.ico "https://employmenthero.com/favicon.ico"

for candidate in small-logo.svg eh-logo-full.svg eh-horizontal-black.svg; do
  if [ -s ".brand-cache/${candidate}" ]; then
    cp ".brand-cache/${candidate}" public/brand/mark.svg
    echo "→ public/brand/mark.svg  (from ${candidate})"
    break
  fi
done

rm -rf .brand-cache
echo "Done. Review public/brand/brand-assets.json if any asset stayed on its stand-in."
