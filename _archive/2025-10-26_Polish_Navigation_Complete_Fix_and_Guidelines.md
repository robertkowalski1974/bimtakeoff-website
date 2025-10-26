# Polish Navigation Link Translation - Complete Fix & Guidelines
**Date:** October 26, 2025
**Issue:** Multiple navigation links on Polish site pointing to English versions

---

## Problems Fixed

### 1. Strona Główna (Home) Link
- **Was pointing to:** `http://localhost:5306/` (English root)
- **Now points to:** `index.html` → `http://localhost:5306/pl/index.html` ✅

### 2. Usługi (Services) Dropdown Links
- **Was pointing to:** English versions without `/pl/` prefix
  - `/services/cost-estimation-budget-planning.html`
  - `/coming-soon.html`
- **Now points to:** Polish versions within `/pl/` directory
  - `uslugi/kosztorysowanie-i-planowanie-budzetu.html` ✅
  - `coming-soon.html` ✅

### 3. Kontakt (Contact) Link
- **Was pointing to:** `/contact.html`
- **Now points to:** `kontakt.html` ✅

---

## Root Cause Analysis

The centralized JavaScript translation file (`/js/polish-navbar.js`) had two critical issues:

1. **Incomplete Link Mappings**: Missing translations for many navigation paths
2. **URL Path Variations Not Handled**: Quarto generates links in different formats:
   - Relative parent: `../page.html`
   - Relative current: `./page.html`
   - Absolute: `/page.html`
   - Full URL: `http://localhost:5306/page.html`

The script only handled some variations, causing links to bypass translation.

---

## Solution Implemented

### Updated `/js/polish-navbar.js`

```javascript
// Define link translations (English path -> Polish path)
// IMPORTANT: When adding new pages, ALWAYS add ALL variations of the path:
// - Relative: ../page.html
// - Current dir: ./page.html  
// - Absolute: /page.html
// - Full URL will be handled automatically by translateLinks() function
const linkTranslations = {
    // HOME/INDEX
    '../index.html': 'index.html',
    './index.html': 'index.html',
    '/index.html': 'index.html',
    '/': 'index.html',
    
    // CONTACT
    '../contact.html': 'kontakt.html',
    './contact.html': 'kontakt.html',
    '/contact.html': 'kontakt.html',
    
    // SERVICES - Main service page (Cost Estimation)
    '../services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
    './services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
    '/services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
    
    // COMING SOON (for all other services, industries, resources, portfolio)
    '../coming-soon.html': 'coming-soon.html',
    './coming-soon.html': 'coming-soon.html',
    '/coming-soon.html': 'coming-soon.html'
};
```

### Enhanced `translateLinks()` Function

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

---

## 🚨 MANDATORY GUIDELINES TO PREVENT FUTURE ISSUES

### Rule #1: Add ALL Path Variations for Every Link

When adding ANY new page to the website, you MUST add translations for ALL possible path formats:

```javascript
// Example: Adding a new "About" page
// English: /about.html
// Polish: /pl/o-nas.html

// You MUST add these 3+ entries to linkTranslations:
'../about.html': 'o-nas.html',      // Relative from parent directory
'./about.html': 'o-nas.html',       // Relative from current directory
'/about.html': 'o-nas.html',        // Absolute path
```

**Why?** Quarto generates links in different formats depending on page location. Missing ANY variation will cause broken links.

---

### Rule #2: Test ALL Links After Any Change

**MANDATORY Testing Checklist:**

1. ✅ Navigate to `http://localhost:5306/pl/`
2. ✅ Click every main navbar item (Home, Services, Industries, etc.)
3. ✅ Click every dropdown item under Services
4. ✅ Click every dropdown item under Industries
5. ✅ Click every dropdown item under Resources
6. ✅ Verify each link stays within `/pl/` directory
7. ✅ Verify NO links navigate to English versions

**Testing Script:**
```javascript
// Run in browser console on http://localhost:5306/pl/
const allLinks = Array.from(document.querySelectorAll('.navbar a[href]'));
const brokenLinks = allLinks.filter(link => {
  const href = link.getAttribute('href');
  const fullUrl = link.href;
  
  // Check if link goes outside /pl/ directory (except language switcher)
  return !link.textContent.includes('EN') && 
         !fullUrl.includes('/pl/') && 
         href !== 'index.html' && 
         !href.startsWith('tel:') && 
         !href.startsWith('mailto:');
});

console.log('Broken Links Found:', brokenLinks.length);
brokenLinks.forEach(link => {
  console.log('❌', link.textContent.trim(), '→', link.getAttribute('href'));
});
```

---

### Rule #3: Document All New Page Translations

When creating a new page, update this documentation with:
- English page path
- Polish page path
- All path variations added to `linkTranslations`

**Example:**
```
NEW PAGE ADDED: Blog
- English: /blog.html
- Polish: /pl/blog.html
- Translations added:
  '../blog.html': 'blog.html'
  './blog.html': 'blog.html'
  '/blog.html': 'blog.html'
```

---

### Rule #4: Always Use the Centralized Translation System

**DO NOT:**
- ❌ Add inline translation scripts in individual `.qmd` files
- ❌ Duplicate translation logic across multiple files
- ❌ Edit links manually in generated HTML

**DO:**
- ✅ Use `/js/polish-navbar.js` for ALL translation logic
- ✅ Update `linkTranslations` object for new pages
- ✅ Keep translation logic in ONE place

---

### Rule #5: Understand How Quarto Generates Links

Quarto generates links differently based on:
- **Page location in directory structure**
- **Link destination relative to current page**
- **Build configuration in `_quarto.yml`**

**Key Insight:** The SAME link (e.g., to Contact page) may be rendered as:
- `../contact.html` (from a subdirectory page)
- `./contact.html` (from a same-level page)
- `/contact.html` (absolute path)
- `http://localhost:5306/contact.html` (full URL after page load)

**Solution:** Our `translateLinks()` function handles full URLs by extracting pathname. You must handle all relative variations in `linkTranslations`.

---

## Quick Reference: Current Link Mappings

### Main Navigation
- **Home:** `index.html` (stays in `/pl/`)
- **Contact:** `kontakt.html` (stays in `/pl/`)

### Services Dropdown
- **Kosztorysowanie:** `uslugi/kosztorysowanie-i-planowanie-budzetu.html`
- **All others:** `coming-soon.html`

### Industries, Resources, Portfolio
- **All items:** `coming-soon.html`

---

## Verification Results

✅ **Strona Główna** → `http://localhost:5306/pl/index.html`
✅ **Kontakt** → `http://localhost:5306/pl/kontakt.html`
✅ **Kosztorysowanie** → `http://localhost:5306/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html`
✅ **Other Services** → `http://localhost:5306/pl/coming-soon.html`

---

## File Locations

- **Translation Script:** `/js/polish-navbar.js`
- **English Config:** `/_quarto.yml`
- **Polish Config:** `/pl/_quarto.yml`
- **This Documentation:** `/_archive/2025-10-26_Polish_Navigation_Complete_Fix_and_Guidelines.md`

---

## Emergency Fix Procedure

If you discover broken links on the Polish site:

1. **Identify the broken link:**
   ```javascript
   // In browser console
   console.log('Href:', brokenLink.getAttribute('href'));
   console.log('Full URL:', brokenLink.href);
   ```

2. **Add all path variations to `linkTranslations` in `/js/polish-navbar.js`:**
   ```javascript
   '../broken-page.html': 'fixed-page.html',
   './broken-page.html': 'fixed-page.html',
   '/broken-page.html': 'fixed-page.html'
   ```

3. **Test immediately:**
   - Reload `http://localhost:5306/pl/`
   - Verify link now works correctly

4. **Document the fix** in this file

---

## Related Issues Fixed
- 2025-10-26: Contact link pointing to English version
- 2025-10-26: Services dropdown links pointing to English versions
- 2025-10-26: Home link pointing to English root

---

## Prevention Checklist for Developers

Before deploying ANY changes to the website:

- [ ] All new pages added to `linkTranslations` with 3+ path variations
- [ ] Tested all navbar links on Polish site
- [ ] No links navigate outside `/pl/` directory (except language switcher and external links)
- [ ] Translation script still loads correctly
- [ ] Console shows no JavaScript errors
- [ ] Documentation updated with any new pages

**Remember:** One missing path variation = Broken user experience!

---

**Last Updated:** October 26, 2025
**Next Review:** When adding any new pages to the website
