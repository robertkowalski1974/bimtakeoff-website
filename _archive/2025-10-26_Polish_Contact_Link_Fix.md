# Polish Contact Link Fix
**Date:** October 26, 2025
**Issue:** Contact link on Polish site (http://localhost:5306/pl/) was pointing to English version instead of Polish version

## Problem
The "Kontakt" link in the Polish navigation was pointing to `/contact.html` instead of `kontakt.html`.

## Root Cause
The centralized JavaScript translation file (`/js/polish-navbar.js`) had two issues:
1. Missing Contact link translations in the `linkTranslations` object
2. The `translateLinks()` function wasn't handling absolute URLs (e.g., `http://localhost:5306/contact.html`)

## Solution
Updated `/js/polish-navbar.js` with:

### 1. Added Contact Link Translations
```javascript
const linkTranslations = {
    '../services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
    '../contact.html': 'kontakt.html',  // ← NEW
    '../coming-soon.html': 'coming-soon.html',
    '../index.html': 'index.html',
    './contact.html': 'kontakt.html',   // ← NEW
    './coming-soon.html': 'coming-soon.html',
    './index.html': 'index.html',
    '/contact.html': 'kontakt.html'     // ← NEW
};
```

### 2. Updated translateLinks() Function
Added URL parsing to handle absolute URLs:
```javascript
function translateLinks() {
    const navLinks = document.querySelectorAll('.navbar a[href], .dropdown-item[href]');
    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        
        // Handle absolute URLs by extracting the pathname
        if (href && href.includes('://')) {
            try {
                const url = new URL(href);
                href = url.pathname;
            } catch (e) {
                // If URL parsing fails, continue with original href
            }
        }
        
        // Check if we have a translation for this path
        if (linkTranslations[href]) {
            link.setAttribute('href', linkTranslations[href]);
        }
    });
}
```

## Testing
✅ Verified that clicking "Kontakt" on http://localhost:5306/pl/ now correctly navigates to http://localhost:5306/pl/kontakt.html

## Notes
- The fix maintains the centralized translation approach in `/js/polish-navbar.js`
- The Polish `_quarto.yml` also has an inline translation script, but the centralized one takes precedence
- All archive documentation files are stored in `_archive` folder to keep main folder clean
