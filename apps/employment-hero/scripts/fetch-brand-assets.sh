#!/usr/bin/env bash
# Re-fetch the Employment Hero brand artwork used by this demo into public/brand/.
#
# Every upstream host below is blocked by the egress proxy in the cloud build environment
# (the connection is reset before any bytes arrive), so the committed SVGs are recreations
# drawn from the logo supplied with the build task. Run this from an unrestricted machine
# to replace them with the official artwork; see public/brand/brand-assets.json.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/brand

fetch() {
  local name=$1 url=$2
  printf '→ %s\n' "$name"
  if ! curl -fsSL --retry 2 --max-time 30 -o "public/brand/$name" "$url"; then
    printf '  skipped — %s is unreachable from this network\n' "${url%%/*}"
    return 1
  fi
}

failed=0

fetch logo.svg \
  "https://employmenthero.com/wp-content/themes/employmentherocom2025/assets/images/eh-logo-full.svg" || failed=1
fetch symbol.svg \
  "https://employmenthero.com/wp-content/themes/employmentherocom2025/assets/images/small-logo.svg" || failed=1

if [ "$failed" -ne 0 ]; then
  cat <<'MSG'

One or more official assets could not be downloaded, so the committed recreations were
left in place. That is the expected outcome inside the sandboxed cloud environment.
MSG
  exit 0
fi

echo "Done."
