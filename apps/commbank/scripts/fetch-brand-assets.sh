#!/usr/bin/env bash
# Re-fetch the CommBank brand artwork used by this demo into public/brand/.
#
# The canonical asset is https://www.commbank.com.au/content/dam/commbank/commBank-logo.svg
# but commbank.com.au is unreachable from restricted build environments, so we pull the same
# artwork from public mirrors. See public/brand/brand-assets.json for provenance.
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p public/brand

fetch() {
  echo "→ $1"
  curl -fsSL --retry 3 --max-time 30 -o "public/brand/$1" "$2"
}

fetch logo.svg "https://raw.githubusercontent.com/cissa-unimelb/cissa_website/master/static/assets/images/sponsors/commbank.svg"
fetch favicon.svg "https://raw.githubusercontent.com/2factorauth/twofactorauth/master/img/c/commbank.com.au.svg"
fetch diamond.svg "https://raw.githubusercontent.com/shortedapp/asx-company-images/master/companies/C/CBA/CBAalt.svg"

# logo-white.svg is logo.svg with the wordmark recoloured for the black footer.
python3 - <<'PY'
from pathlib import Path

src = Path("public/brand/logo.svg")
markup = src.read_text(encoding="utf-8")
# The wordmark is the first <path>, which inherits the default black fill.
white = markup.replace('<path d="M621', '<path fill="#ffffff" d="M621', 1)
Path("public/brand/logo-white.svg").write_text(white, encoding="utf-8")
print("→ logo-white.svg (derived from logo.svg)")
PY

echo "Done."
