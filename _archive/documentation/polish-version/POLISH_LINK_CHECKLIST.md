# Polish Link Implementation Checklist
**Quick Reference Guide for Adding New Polish Pages**

When adding ANY new page to the Polish version of the website, you MUST update 3 files to ensure links work correctly.

---

## ✅ 3-Step Checklist

### Step 1: Create Polish Page with Translation Script
**File:** `/pl/[your-page-name].qmd`

```yaml
---
title: "Your Polish Title"
page-layout: full
format:
  html:
    include-in-header:
      text: |
        <script>
        (function() {
            const translations = {
                'Home': 'Strona Główna', 'Services': 'Usługi', 'Industries': 'Branże',
                'Portfolio': 'Portfolio', 'Resources': 'Zasoby', 'Contact': 'Kontakt',
                /* Add all navbar item translations */
            };
            
            const linkTranslations = {
                '/services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
                '../services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
                '/coming-soon.html': 'coming-soon.html',
                '../coming-soon.html': 'coming-soon.html',
                '/contact.html': 'kontakt.html',
                '../contact.html': 'kontakt.html',
                /* Add mappings for ALL pages */
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
                document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item').forEach(el => {
                    const text = el.textContent.trim();
                    if (translations[text]) el.textContent = translations[text];
                });
                const phoneLinks = document.querySelectorAll('a[href="tel:+442032399967"]');
                phoneLinks.forEach(link => {
                    link.href = 'tel:+48508209313';
                    link.textContent = '+48 508 209 313';
                });
                translateLinks();
                document.documentElement.lang = 'pl';
            }
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', translatePage);
            } else {
                translatePage();
            }
            setTimeout(translatePage, 100);
        })();
        </script>
---

/* Your page content here */
```

**Copy from:** `/pl/kontakt.qmd` or `/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.qmd`

---

### Step 2: Update Polish Navbar
**File:** `/pl/_quarto.yml`

Add your new page to the navbar:

```yaml
navbar:
  left:
    - text: "Your Menu Item"
      href: your-page.qmd
```

**AND** add link mapping to the global translation script:

```yaml
format:
  html:
    include-in-header:
      text: |
        <script>
        (function() {
            const linkTranslations = {
                '../services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
                '../coming-soon.html': 'coming-soon.html',
                '../index.html': 'index.html',
                '../contact.html': 'kontakt.html',
                '../your-page.html': 'your-page.html'  // ← ADD THIS
            };
```

---

### Step 3: Update Polish Index Page
**File:** `/pl/index.qmd`

**CRITICAL:** Add link mappings to the inline translation script:

```javascript
const linkTranslations = {
    '/services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
    'services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
    '../services/cost-estimation-budget-planning.html': 'uslugi/kosztorysowanie-i-planowanie-budzetu.html',
    '/coming-soon.html': 'coming-soon.html',
    'coming-soon.html': 'coming-soon.html',
    '../coming-soon.html': 'coming-soon.html',
    '/contact.html': 'kontakt.html',
    'contact.html': 'kontakt.html',
    '../contact.html': 'kontakt.html',
    '/your-page.html': 'your-page.html',           // ← ADD THESE THREE
    'your-page.html': 'your-page.html',             // ← VARIANTS
    '../your-page.html': 'your-page.html'           // ← FOR EACH PAGE
};
```

**Location:** Around line 37-60 in the `include-in-header` script

---

## 🚨 Common Mistakes

1. **Only updating Step 2** → Links redirect to English version
2. **Forgetting Step 3** → Links from homepage don't work
3. **Missing translation script in Step 1** → Navbar shows English text

---

## 📋 Quick Test

After making changes:

1. Rebuild site: `quarto render`
2. Test from Polish homepage: `http://localhost:PORT/pl/`
3. Click your new link in navbar
4. Should navigate to: `http://localhost:PORT/pl/your-page.html` ✅
5. Should NOT redirect to: `http://localhost:PORT/your-page.html` ❌

---

## 📚 Reference Examples

**Working implementations:**
- `/pl/kontakt.qmd` (Contact page)
- `/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.qmd` (Service page)
- `/pl/index.qmd` (Homepage with all link mappings)

**Documentation:**
- `2025-10-26_contact-pages-navbar-update.md`
- `2025-10-26_polish-service-page-navbar-fix.md`

---

## 🎯 Why This Is Necessary

Quarto generates English navbar by default. Polish version requires:
1. **Individual page script** (Step 1) - translates navbar on that specific page
2. **Global config script** (Step 2) - provides fallback translation
3. **Homepage script** (Step 3) - handles navigation from main Polish entry point

Missing any step breaks the link chain.

---

**Last Updated:** October 26, 2025  
**Status:** ✅ Tested and Working (Contact page implementation)
