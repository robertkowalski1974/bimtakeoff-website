# BIM Takeoff - Professional Bilingual Website
## 🇬🇧 English | 🇵🇱 Polski

**Professional BIM 5D Cost Estimation Services**
Complete bilingual website with English and Polish versions

---

## How the site is built

```
source (.qmd, css/, js/, images/)
        │
        ▼
    build.sh            renders root (EN) project + pl/ (PL) project,
        │                then runs the SEO post-processing scripts once
        │                over the whole docs/ tree
        ▼
    docs/                the rendered, deployable site (EN at /, PL at /pl/)
        │
        ▼
    GitHub Pages         source: main branch, path /docs
```

### Primary path: GitHub Actions

`.github/workflows/build-and-deploy.yml` runs `build.sh` on every push to
`main` (ignoring changes under `docs/`, `_archive/`, and `*.md` so the bot's
own commit doesn't retrigger it) and on `workflow_dispatch`. When the run is
on `main` it commits the rendered `docs/` tree back as
`github-actions[bot]` with message `Build site [skip ci]` and pushes. A
`pull_request` run builds the same way but never commits - it uploads
`docs/` as a downloadable artifact instead, so a PR can be checked before
merge. The job summary reports the sitemap URL count and the result of
`scripts/check-links.py`.

### Manual fallback

`deploy.sh` builds (`build.sh`) then commits and pushes `docs/` by hand.
Use it only when Actions is unavailable; it refuses to run on any branch
other than `main`.

```bash
./deploy.sh "Your update message"
```

### Python requirement

The SEO post-processing scripts need `beautifulsoup4` (see
`requirements.txt`):

```bash
pip install -r requirements.txt
```

`build.sh` looks for a `python3` with `beautifulsoup4` installed; set the
`PYTHON` environment variable to point at a specific interpreter if needed
(the Actions workflow sets `PYTHON: python3`).

### Adding a new EN/PL page pair

1. Add `description` to the front matter of both the English `.qmd` and its
   Polish counterpart.
2. Add the pair's rendered paths to `scripts/page-map.json`.
3. Regenerate the language switcher:
   ```bash
   python3 scripts/build-language-switcher.py
   ```
4. Commit the `.qmd` files, `scripts/page-map.json`, and the regenerated
   `js/language-switcher.js` (never `docs/` - that's rendered output).

---

## 📁 Project Structure

```
bimtakeoff-website/
│
├── build.sh .............................. Build script (EN + PL + SEO scripts)
├── deploy.sh .............................. Manual build + commit + push fallback
├── _quarto.yml ............................ Root (English) Quarto configuration
├── index.qmd, contact.qmd, ... ............ English content
│
├── pl/ .................................... Polish Quarto project
│   ├── _quarto.yml ........................ Polish configuration
│   └── index.qmd, ... ..................... Polish content
│
├── scripts/ ............................... Build helpers and SEO post-processing
│   ├── add-hreflang.py, add-canonicals.py,
│   │   clean-sitemap.py, add-structured-data.py,
│   │   generate-feed.py ................... run once by build.sh over docs/
│   ├── check-links.py ..................... internal link checker
│   ├── build-language-switcher.py ......... regenerates js/language-switcher.js
│   └── page-map.json ...................... EN <-> PL page mapping
│
├── images/, css/, js/, custom.scss ........ Shared assets
│
└── docs/ ................................... Rendered output (GitHub Pages source, do not hand-edit)
```

---

## 📖 Documentation

### Quick Start:
- **[DEPLOY_NOW.md](DEPLOY_NOW.md)** - Start here! Step-by-step deployment

### Comprehensive Guides:
- **[POLISH_VERSION_COMPLETE.md](POLISH_VERSION_COMPLETE.md)** - Complete bilingual documentation
- **[SUMMARY.md](SUMMARY.md)** - Project summary and statistics
- **[FILE_TREE.md](FILE_TREE.md)** - Detailed file structure
- **[pl/README.md](pl/README.md)** - Polish version specifics

### Quick Reference:
```bash
./quick-reference.sh    # View all commands
```

---

## 🎯 What's Included

### Polish Version Features:
- ✅ **Complete Translation** - 3,500+ words professionally translated
- ✅ **10 Major Sections** - Hero, About, Services, Industries, FAQ, CTA, etc.
- ✅ **12 Services** - All service offerings translated
- ✅ **8 Industry Sectors** - Warehouses, Data Centers, Healthcare, etc.
- ✅ **6 FAQ Items** - Common questions answered
- ✅ **Navigation Menu** - Full Polish menu with 20+ items
- ✅ **Language Switcher** - PL/EN toggle in both versions

### Design & Features:
- ✅ **Responsive Design** - Mobile, tablet, desktop optimized
- ✅ **Video Hero** - Animated background video
- ✅ **Brand Colors** - Orange (#FF9900) & Charcoal (#2C2C2C)
- ✅ **Bootstrap Icons** - Professional icon set
- ✅ **SEO Optimized** - Meta tags, descriptions, sitemap
- ✅ **Google Analytics** - GTM integrated (GTM-PLB9BH8W)

---

## 🛠️ Common Tasks

### Edit Content:
```bash
# Edit Polish homepage
code pl/index.qmd

# Edit English homepage
code index.qmd
```

### Preview Locally:
```bash
# Preview English
quarto preview

# Preview Polish (new terminal)
cd pl && quarto preview
```

### Deploy Updates:
```bash
# After editing, deploy:
./deploy.sh "Your update message"
```

### Build Without Deploying:
```bash
# Build English
quarto render

# Build Polish
cd pl && quarto render && cd ..
```

---

## 📊 Key Statistics

| Metric | Value |
|--------|-------|
| Languages | 2 (English, Polish) |
| Pages | 4 (2 per language) |
| Services Listed | 12 |
| Industry Sectors | 8 |
| FAQ Items | 6 |
| Images | 9 |
| Total Words (PL) | 3,500+ |
| Lines of Code (PL) | 790+ |
| Documentation Files | 7 |

---

## 🌐 Live URLs

After deployment (2-5 minutes):

- **🇬🇧 English:** https://www.bimtakeoff.com/
- **🇵🇱 Polish:** https://www.bimtakeoff.com/pl/

---

## 🎨 Brand Guidelines

### Colors:
- **Primary:** #FF9900 (BIM Orange)
- **Secondary:** #2C2C2C (Charcoal)
- **Background:** #FFFFFF (White)
- **Light Gray:** #F0F0F0

### Typography:
- **Font Family:** Inter, sans-serif
- **Headings:** 700 weight
- **Body:** 400 weight
- **Buttons:** 600 weight

---

## 🔧 Technical Details

### Built With:
- **Quarto** - Static site generator
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **Google Tag Manager** - Analytics

### Hosting:
- **GitHub Pages** - Free hosting
- **Custom Domain** - bimtakeoff.com (configurable)

### Requirements:
- Quarto installed
- Git installed
- Text editor (VS Code, Sublime, etc.)

---

## 🆘 Need Help?

### Quick Answers:
1. **How do I deploy?**  
   Run `./deploy.sh "Your message"`

2. **How do I edit content?**  
   Edit `pl/index.qmd` for Polish, `index.qmd` for English

3. **How do I preview?**  
   Run `quarto preview` in respective directory

4. **Where are the images?**  
   All images in `images/` folder (shared between languages)

5. **How do I add a new page?**  
   Create new `.qmd` file, add to `_quarto.yml` navigation

### Detailed Help:
See **[DEPLOY_NOW.md](DEPLOY_NOW.md)** for comprehensive guide

### Contact:
- **Email:** info@bimtakeoff.com
- **Phone:** +44 (0) 20 3239 9967
- **GitHub:** robertkowalski1974/bimtakeoff-website

---

## 🔮 Next Steps

### Immediate:
1. ✅ Deploy the website (see above)
2. ✅ Verify both versions load correctly
3. ✅ Test language switcher
4. ✅ Check mobile responsiveness

### Future Enhancements:
- [ ] Create dedicated service pages
- [ ] Add contact form
- [ ] Build portfolio section with case studies
- [ ] Add blog/news section
- [ ] Implement live chat
- [ ] Create downloadable resources
- [ ] Add client testimonials
- [ ] Build ROI calculator tool

---

## 📜 License

© 2025 BIM Takeoff. All rights reserved.  
Proprietary software - Unauthorized copying or distribution prohibited.

---

## 🎉 Credits

**Website Development:** BIM Takeoff Development Team  
**Content & Translation:** BIM Takeoff  
**Deployment:** October 25, 2025  
**Version:** 2.0 - Bilingual Edition

---

## 🚀 Ready to Launch!

Your complete bilingual website is ready for deployment.

**To deploy now:**
```bash
./deploy.sh "Launch bilingual BIM Takeoff website"
```

**Questions?** Read **[DEPLOY_NOW.md](DEPLOY_NOW.md)**

---

*Last Updated: October 25, 2025*  
*Status: ✅ READY FOR PRODUCTION*
