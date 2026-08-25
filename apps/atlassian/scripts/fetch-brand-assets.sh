#!/usr/bin/env bash
# Re-fetch public Atlassian artwork into public/brand/.
#
# The official logo kit lives behind Atlassian Mosaic. This script tries a few
# public mirrors and keeps the hand-authored stand-ins if they are unreachable.
# See public/brand/brand-assets.json for provenance.
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

fetch .brand-cache/favicon.ico "https://www.atlassian.com/favicon.ico"
fetch .brand-cache/atlassian-logo.svg "https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/atlassian-horizontal-blue-rgb.svg"

if [ -s ".brand-cache/atlassian-logo.svg" ]; then
  cp ".brand-cache/atlassian-logo.svg" public/brand/mark.svg
  echo "→ public/brand/mark.svg  (from atlassian-horizontal-blue-rgb.svg)"
fi

rm -rf .brand-cache
echo "Done. Review public/brand/brand-assets.json if any asset stayed on its stand-in."
