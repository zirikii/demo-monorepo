#!/usr/bin/env bash
# Re-fetch public Gojek artwork into public/brand/.
#
# The header lockup committed in this repo is the official gojek.io SVG supplied
# with the build request. This script only tries public mirrors for a 2022
# wordmark fallback and never overwrites the hand-authored lockup if the
# network is blocked.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/brand .brand-cache

fetch() {
  local dest="$1" url="$2"
  echo "→ ${dest}"
  if ! curl -fsSL --retry 3 --max-time 30 -o "$dest" "$url"; then
    echo "  ! unreachable: ${url} (keeping the existing stand-in)" >&2
    return 0
  fi
}

fetch .brand-cache/gojek-2022.svg \
  "https://commons.wikimedia.org/wiki/Special:FilePath/Gojek_logo_2022.svg"
fetch .brand-cache/gojek-2019-white.svg \
  "https://commons.wikimedia.org/wiki/Special:FilePath/Gojek_logo_2019_white_text.svg"

if [ -s ".brand-cache/gojek-2022.svg" ]; then
  echo "→ retrieved Wikimedia 2022 wordmark (reference only; lockup stays official header SVG)"
fi

rm -rf .brand-cache
echo "Done. Review public/brand/brand-assets.json for provenance."
