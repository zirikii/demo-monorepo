#!/usr/bin/env bash
# Idempotently (re)fetch the official Spark New Zealand brand logos used by this
# demo. Assets are self-hosted under public/brand — never hot-linked at runtime.
#
# Unofficial demo. Not affiliated with Spark New Zealand Trading Limited.
# Logos are sourced from public Spark web pages for visual-fidelity purposes only.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$DIR/public/brand"
UA="Mozilla/5.0 (compatible; spark-demo-asset-fetch/1.0)"

mkdir -p "$OUT"

fetch() {
  local url="$1" dest="$2"
  echo "→ $dest"
  curl -fsSL -A "$UA" -o "$OUT/$dest" "$url"
}

fetch "https://www.spark.co.nz/content/dam/sparkdigital/images/logo/purple.svg" "spark-logo.svg"
fetch "https://www.spark.co.nz/content/dam/sparkdigital/images/logo/white.svg" "spark-logo-white.svg"

echo "Done. Brand assets written to $OUT"
echo "favicon.svg, icon.svg and spark-mark.svg are hand-authored and committed in the repo."
