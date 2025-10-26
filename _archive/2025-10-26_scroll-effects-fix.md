# Polish Hero Visibility Fix - October 26, 2025

## Problem Identified
The Polish homepage hero section (title, subtitle, buttons) was invisible due to:
1. CSS setting `opacity: 0` for hero elements on pages without `.loaded` class on body
2. The `scroll-effects.js` file's `window.addEventListener('load', ...)` was not firing properly in Quarto preview mode
3. The script was loading AFTER the page `load` event had already fired

## Solution Applied

### Modified File
`/js/scroll-effects.js`

### Changes Made
Updated the `initLoadAnimation()` function to:
1. Check if `document.readyState === 'complete'` (page already loaded)
2. If already loaded: immediately animate hero elements with 100ms delay
3. If not loaded: wait for the `load` event as before

### Code Changed
```javascript
// OLD CODE:
function initLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        // ... animate hero elements
    });
}

// NEW CODE:
function initLoadAnimation() {
    const animateHero = () => {
        document.body.classList.add('loaded');
        // ... animate hero elements
    };
    
    // Check if page is already loaded (for Quarto preview mode)
    if (document.readyState === 'complete') {
        setTimeout(animateHero, 100);
    } else {
        window.addEventListener('load', animateHero);
    }
}
```

## Why This Works
- Quarto's preview server sometimes loads scripts after the page is fully rendered
- The `load` event fires once and can be missed if script loads late
- Checking `document.readyState` ensures animation runs regardless of timing
- This fix works for both normal page loads AND Quarto preview mode

## To Apply Fix
1. Stop the Quarto preview server (Ctrl+C)
2. Run: `quarto render` (or `quarto preview` to restart)
3. Refresh browser at http://localhost:7905/pl/

## Verification
After rebuild, the Polish homepage should show:
- ✅ Orange tagline: "Eksperckie Kosztorysowanie i Przedmiary dla Doskonałości Budowlanej"
- ✅ White main title: "Usługi BIM Takeoff"
- ✅ White subtitle paragraph
- ✅ Two buttons: "ZAPRASZAMY DO KONTAKTU" and "POZNAJ USŁUGI"

All elements should fade in smoothly on page load.

## Technical Notes
- This fix affects BOTH English and Polish sites
- No configuration changes needed
- JavaScript file is shared between language versions
- Fix handles edge cases in Quarto's live preview mode
