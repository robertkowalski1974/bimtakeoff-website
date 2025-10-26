# TROUBLESHOOTING: Polish Menu Navigation Issue

**Date:** 2025-10-26  
**Status:** IN PROGRESS - Issue NOT resolved  
**Server:** Currently running on http://localhost:7491/

---

## 🔴 THE PROBLEM

When on the Polish page (`/pl/`), the menu text is correctly translated to Polish:
- ✅ "Services" → "Usługi" 
- ✅ "Cost Estimation & Budget Planning" → "Kosztorysowanie i Planowanie Budżetu"

**BUT** the links are still pointing to English pages:
- ❌ Clicking "Kosztorysowanie i Planowanie Budżetu" goes to: `/services/cost-estimation-budget-planning.html` (WRONG - English page)
- ✅ It SHOULD go to: `/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html` (Polish page)

---

## 📂 FILE STRUCTURE

```
/Users/robertkowalski/Documents/bimtakeoff-website/
├── _quarto.yml                    # Main English site config
├── pl/
│   ├── _quarto.yml                # Polish site config (UPDATED with script)
│   ├── index.qmd                  # Polish homepage source
│   └── uslugi/
│       └── kosztorysowanie-i-planowanie-budzetu.qmd  # Polish service page
├── docs/                          # Built/rendered site
│   ├── index.html                 # English homepage (built)
│   ├── services/
│   │   └── cost-estimation-budget-planning.html
│   └── pl/
│       ├── index.html             # Polish homepage (built) - HAS OLD SCRIPT!
│       └── uslugi/
│           └── kosztorysowanie-i-planowanie-budzetu.html
└── js/
    └── polish-navbar.js           # Updated JavaScript (not being used)
```

---

## 🔍 ROOT CAUSE IDENTIFIED

The Polish site uses an **inline JavaScript** embedded in `pl/_quarto.yml` in the `include-in-header` section. This inline script translates the menu text BUT does NOT change the href links.

When Quarto builds the Polish pages, it embeds this inline script into every page. The problem:
1. The **source config** (`pl/_quarto.yml`) was updated with the new script that includes `linkTranslations`
2. BUT the **built HTML files** (`docs/pl/index.html`) still contain the OLD script without `linkTranslations`
3. Quarto preview doesn't automatically rebuild when `_quarto.yml` changes - only when `.qmd` files change

---

## ✅ WHAT WE'VE TRIED

### Attempt #1: Update External JavaScript File
**Location:** `/js/polish-navbar.js`  
**Action:** Added `linkTranslations` object and `translateLinks()` function  
**Result:** ❌ FAILED - This file isn't actually loaded by the Polish pages. The pages use an inline script instead.

### Attempt #2: Update Inline Script in pl/_quarto.yml
**Location:** `/Users/robertkowalski/Documents/bimtakeoff-website/pl/_quarto.yml`  
**Section:** `format.html.include-in-header.text`  
**Action:** Added this code after the Google Tag Manager script:

```yaml
        <!-- Polish Translation Script -->
        <script>
        (function() {
            const linkTranslations = {
                '../services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
                '../coming-soon.html': 'coming-soon.html',
                '../index.html': 'index.html'
            };
            
            function translateLinks() {
                document.querySelectorAll('.navbar a[href], .dropdown-item[href]').forEach(link => {
                    const href = link.getAttribute('href');
                    if (linkTranslations[href]) {
                        link.setAttribute('href', linkTranslations[href]);
                    }
                });
            }
            
            function updatePage() {
                const phoneLinks = document.querySelectorAll('a[href="tel:+442032399967"]');
                phoneLinks.forEach(link => {
                    link.href = 'tel:+48508209313';
                    link.textContent = '+48 508 209 313';
                });
                translateLinks();
                document.documentElement.lang = 'pl';
            }
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', updatePage);
            } else {
                updatePage();
            }
            setTimeout(updatePage, 100);
        })();
        </script>
```

**Result:** ❌ FAILED - Built HTML still has old script

### Attempt #3: Manual Quarto Rebuild
**Commands Run:**
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render pl/
quarto preview
```

**Result:** ❌ FAILED - Built HTML still has old script (verified on http://localhost:7491/)

---

## 🔬 CURRENT STATE (Verified via Chrome)

### On Page: http://localhost:7491/pl/

**Menu Text:** ✅ Correct (Polish)
- Shows: "Kosztorysowanie i Planowanie Budżetu"

**Menu Links:** ❌ Wrong (English paths)
- Links to: `http://localhost:7491/services/cost-estimation-budget-planning.html`
- Should link to: `http://localhost:7491/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html`

**Script in Page:** ❌ OLD VERSION
- Checked with: `document.documentElement.innerHTML.includes('linkTranslations')`
- Result: `false` (the new script is NOT present)
- The page contains the old inline script that only translates text, not links

---

## 🔧 WHAT'S IN pl/_quarto.yml (Source Config)

The config file HAS been updated with the correct script (lines 119-158), but Quarto is not embedding it into the built HTML.

**File Location:** `/Users/robertkowalski/Documents/bimtakeoff-website/pl/_quarto.yml`

**Relevant Section:**
```yaml
format:
  html:
    include-in-header:
      text: |
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){...})</script>
        <!-- End Google Tag Manager -->
        <!-- Polish Translation Script -->
        <script>
        (function() {
            const linkTranslations = {
                '../services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
                // ... more translations
            };
            // ... rest of script
        })();
        </script>
```

---

## 🔍 WHAT'S IN docs/pl/index.html (Built Output)

The built HTML file has the OLD script (lines 66-96):

```javascript
<script>
(function() {
    const translations = {
        'Home': 'Strona Główna', 
        // ... text translations only, NO linkTranslations
    };
    function translatePage() {
        document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item').forEach(el => {
            const text = el.textContent.trim();
            if (translations[text]) el.textContent = translations[text];
        });
        // Phone number update
        // NO translateLinks() function!
        document.documentElement.lang = 'pl';
    }
    // ... event listeners
})();
</script>
```

**Missing from built HTML:**
- ❌ `linkTranslations` object
- ❌ `translateLinks()` function
- ❌ Call to `translateLinks()` in `updatePage()`

---

## ⚠️ THE MYSTERY

**Why is Quarto not using the updated _quarto.yml?**

Possible reasons:
1. **Caching issue** - Quarto may be caching the old configuration
2. **Build order issue** - The source `.qmd` files may have an older inline script embedded
3. **Quarto freeze** - The `execute.freeze: auto` setting may be preventing rebuild
4. **Multiple config files** - There may be another config file overriding this one

---

## 🎯 NEXT STEPS TO INVESTIGATE

### Step 1: Check if the .qmd source files have inline scripts
```bash
grep -n "<script>" /Users/robertkowalski/Documents/bimtakeoff-website/pl/index.qmd
```

If the `.qmd` file itself contains the old inline script, that would override the `_quarto.yml` config.

### Step 2: Force a complete rebuild with cache clearing
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
rm -rf docs/pl/              # Delete built Polish files
rm -rf _freeze/              # Clear Quarto cache
quarto render pl/            # Rebuild Polish site
```

### Step 3: Check for conflicting YAML frontmatter
Open `/Users/robertkowalski/Documents/bimtakeoff-website/pl/index.qmd` and check if there's YAML frontmatter at the top that might have an inline script defined.

### Step 4: Try a different approach - use external script
Instead of inline script in `_quarto.yml`, reference the external JavaScript file:

```yaml
format:
  html:
    include-in-header:
      text: |
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){...})</script>
        <!-- End Google Tag Manager -->
    include-after-body:
      - text: |
          <script src="../js/polish-navbar.js"></script>
```

### Step 5: Manual edit as temporary fix
As a last resort, directly edit `/Users/robertkowalski/Documents/bimtakeoff-website/docs/pl/index.html` to add the `linkTranslations` code. This is NOT a permanent solution but would verify the fix works.

---

## 📋 KEY FILES TO CHECK

1. **Source Config:** `/Users/robertkowalski/Documents/bimtakeoff-website/pl/_quarto.yml` (lines 119-158)
2. **Built Output:** `/Users/robertkowalski/Documents/bimtakeoff-website/docs/pl/index.html` (lines 66-96)
3. **Source Page:** `/Users/robertkowalski/Documents/bimtakeoff-website/pl/index.qmd` (check for inline scripts)
4. **External JS:** `/Users/robertkowalski/Documents/bimtakeoff-website/js/polish-navbar.js` (updated but not used)

---

## 🧪 HOW TO TEST THE FIX

Once changes are made, test like this:

1. Open http://localhost:XXXX/pl/ in Chrome
2. Open browser console (F12)
3. Run: `document.documentElement.innerHTML.includes('linkTranslations')`
   - Should return: `true`
4. Click Services menu
5. Run in console:
```javascript
const firstDropdownItem = document.querySelector('.dropdown-menu .dropdown-item');
console.log('Text:', firstDropdownItem.textContent.trim());
console.log('Link:', firstDropdownItem.href);
```
Expected output:
```
Text: Kosztorysowanie i Planowanie Budżetu
Link: http://localhost:XXXX/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html
```

6. Actually click the link - it should navigate to the Polish service page

---

## 🤔 ALTERNATIVE SOLUTION

If we can't get Quarto to embed the correct script, we could:

1. **Fix the links in the Quarto YAML directly** (not via JavaScript)
   - Edit `pl/_quarto.yml` to have absolute paths in the navbar menu items
   - Currently: `href: /pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html`
   - This might be getting overridden somewhere

2. **Use a separate build process**
   - Build the English and Polish sites separately
   - Use a post-build script to fix the links in the Polish HTML files

3. **Check Quarto's navbar template override**
   - Quarto might be generating the navbar from a template that ignores our YAML config
   - We might need to create a custom navbar template

---

## 📞 CONTACT INFO FOR CONTINUED SUPPORT

- Project directory: `/Users/robertkowalski/Documents/bimtakeoff-website`
- Active server typically runs on: `http://localhost:XXXX/` (port changes each time)
- Polish pages at: `/pl/` subdirectory
- Issue tracking document: This file

---

**Last Updated:** 2025-10-26 by Claude Assistant  
**Status:** ✅ SOLUTION FOUND AND APPLIED

---

## ✅ SOLUTION IMPLEMENTED

**Root Cause Found:** The `pl/index.qmd` file had an old inline script in its YAML frontmatter that was overriding the `pl/_quarto.yml` config.

**Fix Applied:**
Updated `/Users/robertkowalski/Documents/bimtakeoff-website/pl/index.qmd` (lines 37-62) to add:

1. `linkTranslations` object mapping English paths to Polish paths
2. `translateLinks()` function to update href attributes
3. Call to `translateLinks()` in the `translatePage()` function

**Next Step:**
The Quarto preview should auto-rebuild now that the `.qmd` file has changed. If not, manually stop and restart:
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto preview
```

Then test at http://localhost:XXXX/pl/ - clicking "Kosztorysowanie i Planowanie Budżetu" should now navigate to the Polish page.
