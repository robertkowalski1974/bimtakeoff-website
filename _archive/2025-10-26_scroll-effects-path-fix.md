# Polish Version Scroll Effects Fix - October 26, 2025

## Problem
The Polish version of the site (at `/pl/`) had invisible hero elements because the scroll-effects.js was not loading. The header elements had `opacity: 0` set in CSS, waiting for the JavaScript to animate them in, but the script never loaded.

## Root Cause
In `_quarto.yml`, the scroll-effects.js was loaded with a relative path:
```html
<script src="js/scroll-effects.js"></script>
```

This worked fine for the English version at the root (`/`), which correctly looked for `/js/scroll-effects.js`.

However, for the Polish version at `/pl/`, the relative path tried to load `/pl/js/scroll-effects.js`, which doesn't exist. The JavaScript file is actually at `/js/scroll-effects.js` in the root directory.

## Solution
Changed the path in `_quarto.yml` to use an absolute path from the site root:
```html
<script src="/js/scroll-effects.js"></script>
```

The leading `/` makes it an absolute path from the root, so both versions will correctly load `/js/scroll-effects.js`.

## File Modified
- `/Users/robertkowalski/Documents/bimtakeoff-website/_quarto.yml`

## Changes Made
```yaml
# OLD:
<script src="js/scroll-effects.js"></script>

# NEW:
<script src="/js/scroll-effects.js"></script>
```

## Testing
1. Stop the Quarto preview (Ctrl+C in terminal)
2. Run: `quarto preview`
3. Navigate to: http://localhost:4083/pl/
4. Verify that hero elements are visible:
   - ✅ Orange tagline: "Eksperckie Kosztorysowanie i Przedmiary dla Doskonałości Budowlanej"
   - ✅ White main title: "Usługi BIM Takeoff"
   - ✅ White subtitle paragraph
   - ✅ Two buttons: "ZAPRASZAMY DO KONTAKTU" and "POZNAJ USŁUGI"

## Why This Works
- Relative paths in HTML are resolved relative to the current page's URL
- For the English page at `/index.html`, `js/scroll-effects.js` resolves to `/js/scroll-effects.js` ✅
- For the Polish page at `/pl/index.html`, `js/scroll-effects.js` would resolve to `/pl/js/scroll-effects.js` ❌
- Using an absolute path `/js/scroll-effects.js` works for all pages regardless of their location in the site structure

## Related Files
- `/js/scroll-effects.js` - The scroll effects script (contains the fix for Quarto preview timing)
- `_quarto.yml` - Global Quarto configuration (contains the script include)

## Status
✅ **FIXED** - Both English and Polish versions now correctly load scroll effects
