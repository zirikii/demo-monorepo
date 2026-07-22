#!/usr/bin/env bash
set -euo pipefail

# Idempotent brand asset recreation for the Optus Australia demo.
# optus.com.au assets may be blocked in cloud environments, so logos are embedded.

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
BRAND="$ROOT/public/brand"
ICONS="$BRAND/icons"
mkdir -p "$ICONS"

cat > "$BRAND/logo.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160.6 31.7" role="img" aria-label="Optus">
  <path fill="#00A3AD" d="M120.3 18.6c0 4.2-2.6 6.2-6.4 6.2s-6.2-2-6.2-6.2V1.7c0-.7-.1-1.1-.9-1.4-.6-.2-1.6-.4-3-.4s-2.4.2-3 .4c-.8.3-.9.7-.9 1.4v17.1c0 8.5 5.3 13 14 13 8.8 0 14.1-4.6 14.1-13V1.7c0-.7-.1-1.1-.9-1.4-.6-.2-1.6-.4-3-.4s-2.3.2-3 .4c-.8.2-.9.6-.9 1.4v16.9zM81.8 31.7c1.4 0 2.4-.2 3-.4.8-.2.9-.6.9-1.4V7.4h8.1c.8 0 1.1-.3 1.3-.9.2-.5.3-1.4.3-2.5s-.2-2.1-.3-2.5c-.2-.6-.5-.9-1.3-.9h-24c-.8 0-1.1.3-1.3.9-.2.5-.3 1.4-.3 2.5s.2 2.1.3 2.5c.2.6.5.9 1.3.9h8.1V30c0 .7.1 1.1.9 1.4.6.1 1.7.3 3 .3M17-.1C7-.1 0 6.7 0 15.9s7 16 17 16 17-6.8 17-16-7-16-17-16m0 24.9c-5.2 0-8.9-3.7-8.9-8.9C8.1 10.6 11.8 7 17 7s8.9 3.7 8.9 8.9c-.1 5.3-3.7 8.9-8.9 8.9M53.2.5H40.3c-.6 0-1 .4-1 1V30c0 .7.1 1.1.9 1.4.6.2 1.6.4 3 .4s2.4-.2 3-.4c.8-.2.9-.6.9-1.4v-7.9h6.2c8 0 12.3-4.3 12.3-10.7C65.5 4.8 61.3.5 53.2.5M53 15.6h-5.9V7.1H53c2.8 0 4.6 1.4 4.6 4.2s-1.8 4.3-4.6 4.3m80.1 12.6c4 2.5 9.1 3.7 13.7 3.7 8 0 13.7-4 13.7-10.6 0-5-3.7-7.7-10.5-8.9l-1.4-.2c-5.2-.9-6.6-1.6-6.6-3 0-1.7 1.9-2.6 5.3-2.6 2.7 0 5.3.6 8 1.8.7.3 1.1.3 1.6-.2.8-.8 2-2.9 2.4-4.4q.3-1.05-.6-1.5c-3.3-1.6-7.3-2.5-11.4-2.5-8.3 0-13.4 3.7-13.5 9.8-.1 5.5 3.6 8.2 10.3 9.2l1.6.2c5 .8 6.5 1.4 6.5 3 0 1.8-2 3-5.5 3-3.2 0-6.4-1.1-10.2-3-.7-.4-1-.3-1.6.2-.8.8-2 3-2.4 4.4-.2.9.1 1.3.6 1.6"/>
</svg>
SVG
cat > "$BRAND/logo-white.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160.6 31.7" role="img" aria-label="Optus">
  <path fill="#FFFFFF" d="M120.3 18.6c0 4.2-2.6 6.2-6.4 6.2s-6.2-2-6.2-6.2V1.7c0-.7-.1-1.1-.9-1.4-.6-.2-1.6-.4-3-.4s-2.4.2-3 .4c-.8.3-.9.7-.9 1.4v17.1c0 8.5 5.3 13 14 13 8.8 0 14.1-4.6 14.1-13V1.7c0-.7-.1-1.1-.9-1.4-.6-.2-1.6-.4-3-.4s-2.3.2-3 .4c-.8.2-.9.6-.9 1.4v16.9zM81.8 31.7c1.4 0 2.4-.2 3-.4.8-.2.9-.6.9-1.4V7.4h8.1c.8 0 1.1-.3 1.3-.9.2-.5.3-1.4.3-2.5s-.2-2.1-.3-2.5c-.2-.6-.5-.9-1.3-.9h-24c-.8 0-1.1.3-1.3.9-.2.5-.3 1.4-.3 2.5s.2 2.1.3 2.5c.2.6.5.9 1.3.9h8.1V30c0 .7.1 1.1.9 1.4.6.1 1.7.3 3 .3M17-.1C7-.1 0 6.7 0 15.9s7 16 17 16 17-6.8 17-16-7-16-17-16m0 24.9c-5.2 0-8.9-3.7-8.9-8.9C8.1 10.6 11.8 7 17 7s8.9 3.7 8.9 8.9c-.1 5.3-3.7 8.9-8.9 8.9M53.2.5H40.3c-.6 0-1 .4-1 1V30c0 .7.1 1.1.9 1.4.6.2 1.6.4 3 .4s2.4-.2 3-.4c.8-.2.9-.6.9-1.4v-7.9h6.2c8 0 12.3-4.3 12.3-10.7C65.5 4.8 61.3.5 53.2.5M53 15.6h-5.9V7.1H53c2.8 0 4.6 1.4 4.6 4.2s-1.8 4.3-4.6 4.3m80.1 12.6c4 2.5 9.1 3.7 13.7 3.7 8 0 13.7-4 13.7-10.6 0-5-3.7-7.7-10.5-8.9l-1.4-.2c-5.2-.9-6.6-1.6-6.6-3 0-1.7 1.9-2.6 5.3-2.6 2.7 0 5.3.6 8 1.8.7.3 1.1.3 1.6-.2.8-.8 2-2.9 2.4-4.4q.3-1.05-.6-1.5c-3.3-1.6-7.3-2.5-11.4-2.5-8.3 0-13.4 3.7-13.5 9.8-.1 5.5 3.6 8.2 10.3 9.2l1.6.2c5 .8 6.5 1.4 6.5 3 0 1.8-2 3-5.5 3-3.2 0-6.4-1.1-10.2-3-.7-.4-1-.3-1.6.2-.8.8-2 3-2.4 4.4-.2.9.1 1.3.6 1.6"/>
</svg>
SVG
cat > "$BRAND/logo-mark.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" role="img" aria-label="Optus">
  <circle cx="17" cy="17" r="16" fill="#00A3AD"/>
  <circle cx="17" cy="17" r="7.5" fill="none" stroke="#FFFFFF" stroke-width="4.5"/>
</svg>
SVG
cat > "$ICONS/mobile.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="15" y="5" width="18" height="38" rx="4" fill="#00A3AD"/><circle cx="24" cy="37" r="2" fill="#FFD100"/></svg>
SVG
cat > "$ICONS/home-internet.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M8 24 24 11l16 13v17H28V30h-8v11H8z" fill="#00A3AD"/><path d="M16 22a12 12 0 0 1 16 0" fill="none" stroke="#FFD100" stroke-width="4" stroke-linecap="round"/></svg>
SVG
cat > "$ICONS/phones.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="11" y="8" width="18" height="34" rx="4" fill="#00A3AD"/><rect x="22" y="4" width="15" height="29" rx="4" fill="#007A82"/><circle cx="29.5" cy="28" r="1.8" fill="#FFD100"/></svg>
SVG
cat > "$ICONS/entertainment.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="6" y="12" width="36" height="24" rx="5" fill="#00A3AD"/><path d="m21 19 10 5-10 5z" fill="#FFD100"/></svg>
SVG
cat > "$ICONS/support.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="#00A3AD"/><path d="M17 21a7 7 0 0 1 14 0c0 6-7 5-7 11" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="24" cy="37" r="2" fill="#FFD100"/></svg>
SVG
cat > "$ICONS/myoptus.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="16" r="8" fill="#00A3AD"/><path d="M10 42a14 14 0 0 1 28 0" fill="#007A82"/><circle cx="34" cy="13" r="5" fill="#FFD100"/></svg>
SVG
cat > "$ICONS/add-ons.svg" <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="10" y="10" width="28" height="28" rx="6" fill="#00A3AD"/><path d="M24 16v16M16 24h16" stroke="#FFD100" stroke-width="5" stroke-linecap="round"/></svg>
SVG
cat > "$BRAND/brand-assets.json" <<'JSON'
{
  "fetchedAt": "2026-07-22",
  "note": "Unofficial demo assets. Logos and simple icons are embedded so the demo can be rebuilt when optus.com.au is blocked. Not affiliated with Singtel Optus Pty Limited.",
  "assets": [
    { "file": "logo.svg", "source": "embedded Optus wordmark SVG (fill #00A3AD)" },
    { "file": "logo-white.svg", "source": "embedded Optus wordmark SVG (fill #FFFFFF)" },
    { "file": "logo-mark.svg", "source": "embedded derived mark for favicon-scale use" },
    { "file": "icons/*.svg", "source": "embedded demo UI icons" }
  ]
}
JSON

echo "Recreated Optus demo brand assets in $BRAND"
