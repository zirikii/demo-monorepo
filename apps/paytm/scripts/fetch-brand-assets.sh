#!/usr/bin/env bash
# Fetch official Paytm web assets into public/brand/ for the unofficial demo.
# Idempotent: re-running overwrites files in place. All assets are self-hosted;
# the app never hotlinks paytm.com CDNs at runtime.
set -uo pipefail

cd "$(dirname "$0")/.."
BRAND_DIR="public/brand"
ICON_DIR="$BRAND_DIR/icons"
mkdir -p "$ICON_DIR"

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"

fetch() {
  local out="$1" url="$2"
  echo "-> $out"
  curl -sfL --retry 3 --retry-delay 2 -A "$UA" -o "$out" "$url" || echo "   WARN: failed $url"
}

PWEB="https://pwebassets.paytm.com/commonwebassets/paytmweb"
CDN="https://assetscdn1.paytm.com/images"

# Logos
fetch "$BRAND_DIR/paytm-upi-logo.svg" "$PWEB/header/images/logo_new.svg"
fetch "$BRAND_DIR/paytm-logo.svg" "$PWEB/footer/images/paytmLogo.svg"
fetch "$BRAND_DIR/paytm-travel-logo.svg" "https://paytmtravel-images-akamai.paytm.com/icons/Paytm_Travel_Logo.svg"
fetch "$BRAND_DIR/favicon.ico" "https://paytm.com/favicon.ico"

# Header aux icons
fetch "$ICON_DIR/download-app.svg" "$PWEB/header/images/downloadApp.svg"

# Footer trust + payment-network icons
for f in help assurance trust pci plus; do
  fetch "$ICON_DIR/$f.svg" "$PWEB/footer/images/$f.svg"
done
fetch "$ICON_DIR/visa.svg" "$PWEB/footer/images/visa.svg"
fetch "$ICON_DIR/mastercard.svg" "$PWEB/footer/images/mastercard.svg"
fetch "$ICON_DIR/rupay.svg" "$PWEB/footer/images/ruPay.svg"
fetch "$ICON_DIR/diners-club.svg" "$PWEB/footer/images/dinerClub.svg"
fetch "$ICON_DIR/american-express.png" "$PWEB/footer/images/americanExpress.png"

# Footer social icons
for s in facebook twitter youtube linkedin instagram; do
  fetch "$ICON_DIR/social-$s.svg" "$PWEB/footer/images/social/$s.svg"
done

# Home "Recharges & Bill Payments" category icons
fetch "$ICON_DIR/cat-mobile.png" "$CDN/catalog/view_item/3179318/36886801089433092.png"
fetch "$ICON_DIR/cat-electricity.png" "$CDN/catalog/view_item/3179321/4291158023212300.png"
fetch "$ICON_DIR/cat-fastag.png" "$CDN/catalog/view_item/3179320/36886837922197985.png"
fetch "$ICON_DIR/cat-dth.png" "$CDN/catalog/view_item/3179317/36886820392724710.png"
fetch "$ICON_DIR/cat-insurance.png" "$CDN/catalog/view_item/3238780/1792648419066137.png"
fetch "$ICON_DIR/cat-metro.png" "$CDN/catalog/view_item/3179323/17103808700486.png"
fetch "$ICON_DIR/cat-toll.png" "$CDN/catalog/view_item/3179324/17120113824819.png"
fetch "$ICON_DIR/cat-view-all.png" "$CDN/catalog/view_item/3179319/36886901834673050.png"
fetch "$ICON_DIR/cat-broadband.png" "$CDN/catalog/view_item/3179326/2323337009767875.png"
fetch "$ICON_DIR/cat-loan-emi.png" "$CDN/catalog/view_item/3179327/1995512275286656.png"

# Travel widget tab icons
fetch "$ICON_DIR/travel-flights.png" "$CDN/wap/production/20260128/1769583668741.png"
fetch "$ICON_DIR/travel-bus.png" "$CDN/wap/production/20260128/1769583668464.png"
fetch "$ICON_DIR/travel-trains.png" "$CDN/wap/production/20260128/1769583668110.png"
fetch "$ICON_DIR/travel-intl.png" "$CDN/wap/production/20260128/1769583667725.png"

echo "Done. Review public/brand/ and update brand-assets.json if URLs changed."
