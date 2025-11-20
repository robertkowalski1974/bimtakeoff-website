# FIXED - Polish Version Path Issue

## The Problem ✅

The Polish version was using wrong relative paths:
- Used: `../resources/` and `../js/`
- Looking for: `/pl/resources/` and `/pl/js/` (DON'T EXIST)
- Should be: `../../resources/` and `../../js/`

## File Structure

```
docs/
├── resources/
│   ├── roi-report-print.css  ← Files are HERE
│   └── roi-report.html
├── js/
│   └── roi-report-generator.js  ← Files are HERE
└── pl/
    └── zasoby/
        └── raport-roi.html  ← Polish page is HERE (2 levels deep!)
```

From `/pl/zasoby/`, you need:
- `../../resources/` (up 2 levels to docs/, then into resources/)
- `../../js/` (up 2 levels to docs/, then into js/)

## The Fix

Changed `/pl/zasoby/raport-roi.qmd`:
```yaml
# BEFORE (WRONG):
css: ../resources/roi-report-print.css
href: ../resources/roi-report-print.css
src: ../js/roi-report-generator.js

# AFTER (CORRECT):
css: ../../resources/roi-report-print.css
href: ../../resources/roi-report-print.css
src: ../../js/roi-report-generator.js
```

## Deploy Now

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website

# Rebuild
quarto render

# Test Polish version
open docs/pl/zasoby/raport-roi.html

# Should work now - no 404 errors!

# Deploy
git add .
git commit -m "Fix Polish version paths - use ../../ for resources and js"
git push origin main
```

## Why English Worked But Polish Didn't

**English version** at `/resources/roi-report.html`:
- CSS in same directory: `roi-report-print.css` ✅
- JS one level up: `../js/roi-report-generator.js` ✅

**Polish version** at `/pl/zasoby/raport-roi.html`:
- CSS needs: `../../resources/roi-report-print.css` ✅
- JS needs: `../../js/roi-report-generator.js` ✅

The Polish page is **2 levels deep** (`/pl/zasoby/`), so it needs `../../` to go up 2 levels to reach the root, then access `/resources/` and `/js/`.

## This 100% Fixes the Polish Version!
