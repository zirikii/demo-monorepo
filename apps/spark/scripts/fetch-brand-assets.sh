#!/usr/bin/env bash
# Idempotent brand asset fetch for the Spark NZ demo.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BRAND="$ROOT/public/brand"
PHOTOS="$BRAND/photos"
ICONS="$BRAND/icons"
BASE="https://www.spark.co.nz"
mkdir -p "$PHOTOS" "$ICONS"

curl -fsSL -A "Mozilla/5.0" -o "$BRAND/logo.svg" "$BASE/content/dam/sparkdigital/images/logo/purple.svg"
curl -fsSL -A "Mozilla/5.0" -o "$BRAND/logo-white.svg" "$BASE/content/dam/sparkdigital/images/logo/white.svg"
curl -fsSL -A "Mozilla/5.0" -o "$BRAND/favicon.png" "$BASE/favicon_128.png"

curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/hero-friends-grass.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/consumer/2025-collection/digital/friend-group-hanging-on-grass-1920x1280.jpg"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/app-cta-girls.png" \
  "$BASE/content/dam/spark/images/spark-photography/consumer/2025-collection/banners/girls-on-phone-landscape-banner-asset.png"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/network-coverage.png" \
  "$BASE/content/dam/spark/images/backgrounds/marketing/promo/network-coverage-tile-2025-desktop.png"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/setting-up.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/consumer/2025-collection/digital/retail/store-rep-helping-mature-man-1920x1280.jpg"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/spark-arena.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/stock-photos/person-taking-photo-at-concert-getty-1920x1280.jpg"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/spark-store.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/consumer/2025-collection/digital/retail/store-rep-helping-man-1920x1280.jpg"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/tech-accessories.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/consumer/2025-collection/digital/retail/mum-and-daughter-looking-at-devices-store-1-1920x1280.jpg"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/entertainment.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/consumer/2025-collection/digital/girls-taking-selfie-with-granddad-2-1920x1280.jpg"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/foundation.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/consumer/2025-collection/digital/woman-working-from-home-1920x1080.jpg"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/parent-hub.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/consumer/2025-collection/digital/teenager-taking-photo-1920x1280.jpg"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/happy-women.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/stock-photos/happy-women-1920x1281.jpg"
curl -fsSL -A "Mozilla/5.0" -o "$PHOTOS/family-tv.jpg" \
  "$BASE/content/dam/spark/images/spark-photography/consumer/2025-collection/digital/family-watches-tv-landscape-1920x1280.jpg"

curl -fsSL -A "Mozilla/5.0" -o "$ICONS/mobile.png" "$BASE/content/dam/spark/images/icons/mobile-icon.png"
curl -fsSL -A "Mozilla/5.0" -o "$ICONS/broadband.png" "$BASE/content/dam/spark/images/icons/broadband.png"
curl -fsSL -A "Mozilla/5.0" -o "$ICONS/phone.png" "$BASE/content/dam/spark/images/icons/phone-icon.png"
curl -fsSL -A "Mozilla/5.0" -o "$ICONS/myspark.svg" "$BASE/content/dam/spark/images/icons/svg/me_large.svg"
curl -fsSL -A "Mozilla/5.0" -o "$ICONS/deals.svg" "$BASE/content/dam/spark/images/icons/svg/shop_large.svg"

node <<'NODE'
const fs = require('fs');
const path = require('path');
const brand = process.env.BRAND || require('path').join(__dirname, '..', 'public', 'brand');
NODE

DATE="$(date -u +%Y-%m-%d)"
cat > "$BRAND/brand-assets.json" <<JSON
{
  "fetchedAt": "$DATE",
  "note": "Unofficial demo assets sourced from public spark.co.nz pages for visual fidelity only. Not affiliated with Spark NZ.",
  "assets": [
    { "file": "logo.svg", "source": "$BASE/content/dam/sparkdigital/images/logo/purple.svg" },
    { "file": "logo-white.svg", "source": "$BASE/content/dam/sparkdigital/images/logo/white.svg" },
    { "file": "favicon.png", "source": "$BASE/favicon_128.png" },
    { "file": "photos/hero-friends-grass.jpg", "source": "Travel & Move AEM hero" },
    { "file": "logo-mark.svg", "source": "recreated spark mark approximation for favicon-scale use" }
  ]
}
JSON

echo "Brand assets updated in $BRAND"
