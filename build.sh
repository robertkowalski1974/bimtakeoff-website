#!/bin/bash
# BIM Takeoff website - build script
# 1. Render the English (root) project -> docs/   (pl/ is excluded in _quarto.yml)
# 2. Render the Polish project           -> docs/pl/
# 3. Run the SEO post-processing scripts ONCE over the whole docs/ tree
# 4. Verify the output
set -euo pipefail
cd "$(dirname "$0")"

PY="${PYTHON:-python3}"
if ! "$PY" -c "import bs4" 2>/dev/null; then
  for cand in /usr/local/bin/python3 /usr/bin/python3 python3.12; do
    if command -v "$cand" >/dev/null 2>&1 && "$cand" -c "import bs4" 2>/dev/null; then PY="$cand"; break; fi
  done
fi
"$PY" -c "import bs4" || { echo "No python3 with beautifulsoup4 found (pip install beautifulsoup4)"; exit 1; }

echo "1/4 Rendering English site (root project)..."
quarto render
echo "2/4 Rendering Polish site (pl project)..."
(cd pl && quarto render)
echo "3/4 Running SEO post-processing..."
for s in add-hreflang add-canonicals clean-sitemap add-structured-data generate-feed; do
  "$PY" "scripts/$s.py" >/dev/null || { echo "scripts/$s.py failed"; exit 1; }
  echo "   - $s ok"
done
echo "4/4 Verifying output..."
stray=$(find docs \( -name "* [0-9].*" -o -name "* [0-9]" \) 2>/dev/null || true)
[ -z "$stray" ] || { echo "Stray Finder duplicates in docs/:"; echo "$stray"; exit 1; }
[ "$(cat docs/CNAME 2>/dev/null)" = "www.bimtakeoff.com" ] || { echo "docs/CNAME is not www.bimtakeoff.com"; exit 1; }
[ -f docs/.nojekyll ] || touch docs/.nojekyll
[ -f scripts/check-links.py ] && "$PY" scripts/check-links.py docs
echo "Build OK."
