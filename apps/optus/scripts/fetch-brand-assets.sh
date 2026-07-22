#!/usr/bin/env bash
# Idempotent brand asset fetcher for the Optus demo.
# Prefer official Optus media URLs; fall back to Wikimedia Commons when egress blocks optus.com.au.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="$ROOT/public/brand"
mkdir -p "$BRAND"

fetch() {
  local url="$1" out="$2"
  if curl -fsSL --max-time 30 -A "Mozilla/5.0" -o "$out.tmp" "$url"; then
    mv "$out.tmp" "$out"
    echo "OK  $out <- $url"
    return 0
  fi
  rm -f "$out.tmp"
  echo "SKIP $url"
  return 1
}

# Official / CDN candidates (may fail under restricted egress)
fetch "https://www.optus.com.au/favicon.ico" "$BRAND/favicon.ico" || true
fetch "https://upload.wikimedia.org/wikipedia/commons/c/ca/Optus_logo.svg" "$BRAND/logo-official.svg" || true

# If Commons SVG landed, copy to primary logo slots (keep white/mark variants from repo)
if [[ -f "$BRAND/logo-official.svg" ]]; then
  cp "$BRAND/logo-official.svg" "$BRAND/logo.svg"
fi

DATE="$(date -u +%Y-%m-%d)"
cat > "$BRAND/brand-assets.json" <<EOF
{
  "fetchedAt": "$DATE",
  "script": "scripts/fetch-brand-assets.sh",
  "assets": [
    { "file": "logo.svg", "note": "Official when reachable; otherwise repo wordmark" },
    { "file": "logo-white.svg", "note": "White wordmark for dark footer" },
    { "file": "logo-mark.svg", "note": "Compact O mark" },
    { "file": "yes-mark.svg", "note": "Yellow Yes accent" },
    { "file": "favicon.png", "note": "App favicon" }
  ]
}
EOF

echo "Brand fetch complete."
