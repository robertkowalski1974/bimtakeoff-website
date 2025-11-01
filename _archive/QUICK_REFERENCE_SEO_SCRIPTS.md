# 🚀 QUICK REFERENCE - SEO Scripts Usage

## One-Line Test Command
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website && quarto render && quarto preview
```

---

## Individual Script Commands

### Run Hreflang Script
```bash
python3 scripts/add-hreflang.py
```

### Run Canonical Script
```bash
python3 scripts/add-canonicals.py
```

### Run Sitemap Cleanup
```bash
python3 scripts/clean-sitemap.py
```

---

## What to Check After Render

1. **Console Output** - Look for "✓ Successfully processed: X files"
2. **Browser DevTools** - Press F12, check `<head>` for tags
3. **Sitemap** - Open http://localhost:4200/sitemap.xml

---

## Expected Tags in Every Page

### English Pages
```html
<link rel="canonical" href="https://robertkowalski1974.github.io/bimtakeoff-website/" />
<link rel="alternate" hreflang="en-GB" href="https://robertkowalski1974.github.io/bimtakeoff-website/" />
<link rel="alternate" hreflang="pl" href="https://robertkowalski1974.github.io/bimtakeoff-website/pl/" />
<link rel="alternate" hreflang="x-default" href="https://robertkowalski1974.github.io/bimtakeoff-website/" />
```

### Polish Pages
```html
<link rel="canonical" href="https://robertkowalski1974.github.io/bimtakeoff-website/pl/" />
<link rel="alternate" hreflang="pl" href="https://robertkowalski1974.github.io/bimtakeoff-website/pl/" />
<link rel="alternate" hreflang="en-GB" href="https://robertkowalski1974.github.io/bimtakeoff-website/" />
<link rel="alternate" hreflang="x-default" href="https://robertkowalski1974.github.io/bimtakeoff-website/" />
```

---

## Validation Tools

- **Hreflang:** https://technicalseo.com/tools/hreflang/
- **Schema:** https://validator.schema.org/
- **Rich Results:** https://search.google.com/test/rich-results
- **Sitemap:** https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

## When Adding New Pages

1. Create the page in Quarto (.qmd file)
2. Add URL mapping in `scripts/add-hreflang.py`:
   ```python
   url_mappings = {
       '/new-page/': '/pl/nowa-strona/',
   }
   ```
3. Run `quarto render`
4. Check tags in browser

---

## Before Deploying

- [ ] Run `quarto render`
- [ ] Check console for errors
- [ ] Verify tags in browser DevTools
- [ ] Test sitemap URL
- [ ] Commit and push to GitHub

---

## Files Modified

- ✅ `_quarto.yml` - Post-render scripts added
- ✅ `scripts/add-hreflang.py` - Created
- ✅ `scripts/add-canonicals.py` - Created
- ✅ `scripts/clean-sitemap.py` - Created

---

## Troubleshooting

**Scripts don't run?**
```bash
chmod +x scripts/*.py
```

**Missing module bs4?**
```bash
pip3 install beautifulsoup4 lxml
```

**Need to update domain?**
Edit `BASE_URL` in all three scripts and `site-url` in `_quarto.yml`

---

**Last Updated:** 2025-01-01
**Status:** ✅ READY FOR PRODUCTION
