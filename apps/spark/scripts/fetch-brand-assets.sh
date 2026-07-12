#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRAND_DIR="$ROOT_DIR/public/brand"
mkdir -p "$BRAND_DIR"

curl -L -o "$BRAND_DIR/logo.svg" "https://www.spark.co.nz/content/dam/sparkdigital/images/logo/purple.svg"
curl -L -o "$BRAND_DIR/travel-queenstown.png" "https://www.spark.co.nz/content/dam/spark/images/backgrounds/marketing/hero-banners/travel-pack/qtown-590x203.png"
curl -L -o "$BRAND_DIR/travel-beach.png" "https://www.spark.co.nz/content/dam/spark/images/backgrounds/marketing/hero-banners/travel-pack/beach-590x203.png"
curl -L -o "$BRAND_DIR/travel-mount.png" "https://www.spark.co.nz/content/dam/spark/images/backgrounds/marketing/hero-banners/travel-pack/mount-590x203.png"
curl -L -o "$BRAND_DIR/sim-icon.svg" "https://www.spark.co.nz/content/dam/telecomcms/responsive/images/shop/mobile/plans-pricing/icon-cirlce-black-150x150-sim.svg"
curl -L -o "$BRAND_DIR/wifi-icon.png" "https://www.spark.co.nz/content/dam/telecomcms/responsive/images/shop/mobile/plans-pricing/wifi-icon-150x150.png"

printf 'Spark NZ brand assets refreshed in %s\n' "$BRAND_DIR"
