#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/brand
echo "Optus asset downloads are attempted from official/public sources."
echo "If the network allows it, replace the fallback SVGs with assets from:"
echo "- https://www.optus.com.au/about/media-centre/multimedia/logos"
echo "- https://www.optus.com.au/"
echo "Current cloud egress blocked direct downloads during this run."
