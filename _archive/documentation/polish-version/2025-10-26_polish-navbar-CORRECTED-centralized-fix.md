# Polish Navbar Link Translation Fix - CORRECTED APPROACH

**Date:** October 26, 2025  
**Issue:** Polish navbar showing translated text but links redirecting to English pages  
**Status:** ✅ RESOLVED - Centralized Solution

---

## The Problem

When navigating the Polish website (http://localhost:5097/pl/):
- ✅ Navbar text was correctly translated to Polish (e.g., "Kontakt", "Kosztorysowanie i Planowanie Budżetu")
- ❌ BUT clicking the links redirected to English pages:
  - "Kontakt" → `/contact.html` (should go to `/pl/kontakt.html`)
  - "Kosztorysowanie i Planowanie Budżetu" → `/services/cost-estimation-budget-planning.html` (should go to `/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html`)

---

## Root Cause

The `/pl/_quarto.yml` file was **missing the `linkTranslations` object** in the Polish translation script. It only had the Google Tag Manager script but no navbar link translation functionality.

---

## ✅ CORRECT Solution: Single Centralized Location

**File Updated:** `/pl/_quarto.yml` (lines 118-204)

Added complete translation script with `linkTranslations` to the `format.html.include-in-header` section:

```yaml
format:
  html:
    include-in-header:
      text: |
        <!-- Google Tag Manager -->
        <script>...</script>
        <!-- End Google Tag Manager -->
        
        <!-- Polish Translation Script -->
        <script>
        (function() {
            const translations = {
                'Home': 'Strona Główna',
                'Services': 'Usługi',
                'Contact': 'Kontakt',
                // ... (all navbar text translations)
            };
            
            const linkTranslations = {
                // 3 variants per link to catch all Quarto path formats:
                '/contact.html': 'kontakt.html',
                'contact.html': 'kontakt.html',
                '../contact.html': 'kontakt.html',
                
                '/services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
                'services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
                '../services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
                
                // ... (all other link mappings)
            };
            
            function translateLinks() {
                document.querySelectorAll('.navbar a[href], .dropdown-item[href]').forEach(link => {
                    let href = link.getAttribute('href');
                    if (href && href.includes('://')) {
                        try {
                            const url = new URL(href);
                            href = url.pathname;
                        } catch (e) {}
                    }
                    if (linkTranslations[href]) {
                        link.setAttribute('href', linkTranslations[href]);
                    }
                });
            }
            
            function translatePage() {
                // Translate navbar text
                document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item').forEach(el => {
                    const text = el.textContent.trim();
                    if (translations[text]) el.textContent = translations[text];
                });
                
                // Update phone numbers
                const phoneLinks = document.querySelectorAll('a[href="tel:+442032399967"]');
                phoneLinks.forEach(link => {
                    link.href = 'tel:+48508209313';
                    link.textContent = '+48 508 209 313';
                });
                
                // Translate links
                translateLinks();
                
                // Set language
                document.documentElement.lang = 'pl';
            }
            
            // Run on page load
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', translatePage);
            } else {
                translatePage();
            }
            setTimeout(translatePage, 100);
        })();
        </script>
```

---

## Why This Approach is Better

### ❌ WRONG: Duplicate Scripts in Individual Files
- Makes updates difficult (must change multiple files)
- Easy to miss files when updating
- Can cause inconsistencies
- Increases maintenance burden

### ✅ RIGHT: Single Centralized Script in _quarto.yml
- **One place to manage** all translations
- **Automatic application** to all pages in `/pl/` directory
- **Easy updates** - change once, applies everywhere
- **Consistent behavior** across all Polish pages

---

## The 3-Variant Rule

Each link MUST have 3 variants in `linkTranslations` because Quarto generates different path formats:

```javascript
'/contact.html': 'kontakt.html',      // Absolute path from root
'contact.html': 'kontakt.html',       // Relative (same dir)
'../contact.html': 'kontakt.html'     // Relative (parent dir)
```

Missing any variant = broken links! 🚨

---

## Files Modified

1. **✅ `/pl/_quarto.yml`** - Added translation script (CORRECT LOCATION)
2. **✅ `/pl/kontakt.qmd`** - Removed duplicate script
3. **✅ `/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.qmd`** - Removed duplicate script

---

## Testing Steps

After rebuilding:

1. Navigate to **http://localhost:PORT/pl/**
2. Test navbar links:
   - Click **"Kontakt"** → should go to `/pl/kontakt.html` ✅
   - Click **"Usługi" → "Kosztorysowanie i Planowanie Budżetu"** → should go to `/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html` ✅
   - All links should stay within Polish section ✅

3. Verify the script is present:
   - Open browser console (F12)
   - Run: `document.documentElement.innerHTML.includes('linkTranslations')`
   - Should return: `true`

---

## Future Polish Pages

When adding NEW Polish pages:

1. ✅ Just create the `.qmd` file - the translation script from `_quarto.yml` applies automatically!
2. ✅ If needed, add new link mappings to `/pl/_quarto.yml` (centralized location)
3. ✅ Update navbar in `/pl/_quarto.yml` if adding menu items
4. ✅ Rebuild: `quarto render pl/`

**DO NOT** add translation scripts to individual `.qmd` files!

---

## Related Documentation

- `PL_Link_Checklist_-_ALWAYS_CHECK` (in Project Knowledge)
- `TROUBLESHOOTING__Polish_Menu_Navigation_Issue` (in Project Knowledge)

---

**Key Lesson:** Always use centralized configuration in `_quarto.yml` for site-wide features. Individual page overrides should only be used for page-specific customizations, not for site-wide functionality like navbar translation!
