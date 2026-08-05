#!/usr/bin/env bash
# Re-fetch the CommBank brand artwork used by this demo into public/brand/.
#
# The canonical asset is https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg
# but commbank.com.au is unreachable from restricted build environments, so we pull the same
# artwork from public mirrors. See public/brand/brand-assets.json for provenance.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/brand .brand-cache

fetch() {
  echo "→ $1"
  curl -fsSL --retry 3 --max-time 30 -o "$2/$1" "$3"
}

fetch favicon.svg public/brand "https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/c/commbank.com.au.svg"
fetch diamond.svg public/brand "https://raw.githubusercontent.com/shortedapp/asx-company-images/master/companies/C/CBA/CBAalt.svg"
fetch wordmark-source.svg .brand-cache "https://raw.githubusercontent.com/dreinicke27/cdevoy-portfolio/main/src/assets/commbank.svg"

# The wordmark source is a monochrome CommBank lockup: #838383 is the diamond body and
# #383838 covers both the lower-right facet and the "CommBank" wordmark. Recolour it to the
# official palette and tighten the viewBox to the artwork bounds.
python3 - <<'PY'
from pathlib import Path

src = Path(".brand-cache/wordmark-source.svg").read_text(encoding="utf-8")


def build(wordmark: str, facet: str) -> str:
    out = []
    for line in src.splitlines():
        if line.startswith("<svg"):
            line = (
                '<svg width="171" height="53" viewBox="0 14 171 53" fill="none" '
                'xmlns="http://www.w3.org/2000/svg">'
            )
        elif 'fill="#838383"' in line:
            line = line.replace('fill="#838383"', 'fill="#fecb26"').replace(
                'stroke="#838383"', 'stroke="#fecb26"'
            )
        elif "M144.92 66.2257" in line:
            line = line.replace('fill="#383838"', f'fill="{facet}"')
        elif "M10.8084 38.087" in line:
            line = line.replace('fill="#383838"', f'fill="{wordmark}"')
        out.append(line)
    return "\n".join(out) + "\n"


Path("public/brand/logo.svg").write_text(build("#000000", "#000000"), encoding="utf-8")
# A black facet would vanish on the black footer, so the reversed lockup uses the app's
# --color-cba-yellow-dark token instead.
Path("public/brand/logo-white.svg").write_text(build("#ffffff", "#e0b000"), encoding="utf-8")
print("→ logo.svg")
print("→ logo-white.svg")
PY

rm -rf .brand-cache
echo "Done."
