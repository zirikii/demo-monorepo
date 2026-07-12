#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/brand
curl -L -o public/brand/logo.svg "https://www.changiairport.com/content/dam/changiairport/sg/airport/evergreen/homepage/Logo_CAG_Horizontal_RGB_Pos.svg"
curl -L -o public/brand/logo-light.png "https://www.changiairport.com/content/dam/changiairport/common/header/logo-light.png"
curl -L -o public/brand/favicon.png "https://www.changiairport.com/etc.clientlibs/changiairport/clientlibs/clientlib-site/resources/icon-192x192.png"
curl -L -o public/brand/happening-outlet-deals.jpg "https://www.changiairport.com/content/dam/changiairport/sg/airport/seasonal/events-and-campaigns/2025/lcd-miffy-garden-in-changi/outlets-deals/baba-nyonya-outlet-deals-cf.jpg"
curl -L -o public/brand/happening-rewards-sia.jpg "https://www.changiairport.com/content/dam/changiairport/sg/airport/seasonal/promos/2026/fly-with-changi-rewards-and-singapore-airlines/cr-sa-banner.jpg"
curl -L -o public/brand/happening-peanuts.jpg "https://www.changiairport.com/content/dam/changiairport/sg/airport/seasonal/events-and-campaigns/2026/peanuts/peanuts-homepage-desktop.jpg"
curl -L -o public/brand/happening-lego-botanicals.jpg "https://www.changiairport.com/content/dam/changiairport/sg/airport/seasonal/promos/2026/celebrate-jewel-blooms-with-lego-botanicals/celebrate-jewel-blooms-with-lego-botanicals-wide.jpg"
