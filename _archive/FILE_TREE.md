# 📁 Complete Project File Structure

Generated: October 25, 2025

## 🌲 Full Directory Tree

```
bimtakeoff-website/
│
├── 📄 _quarto.yml                          # Main site configuration (English)
├── 📄 index.qmd                            # English homepage
├── 📄 coming-soon.qmd                      # English placeholder page
├── 📄 custom.scss                          # Custom SCSS styles
├── 📄 .gitignore                           # Git ignore rules
├── 📄 .nojekyll                            # GitHub Pages config
│
├── 🇵🇱 pl/                                  # POLISH VERSION DIRECTORY
│   ├── 📄 _quarto.yml                      # Polish site configuration ✅ NEW
│   ├── 📄 index.qmd                        # Polish homepage ✅ NEW
│   ├── 📄 coming-soon.qmd                  # Polish placeholder ✅ NEW
│   └── 📄 README.md                        # Polish documentation ✅ NEW
│
├── 🖼️  images/                              # Image assets (shared)
│   ├── BIM TAKEOFF V2-2.jpg               # Logo
│   ├── BIM TAKEOFF V2-2.svg               # Logo SVG
│   ├── bim-technology.png                 # Technology illustration
│   ├── bim-workflow.png                   # Workflow diagram
│   ├── construction-site.png              # Construction photo
│   ├── data-analysis.png                  # Analytics illustration
│   ├── header-background.jpg              # Header background
│   ├── header-background.avif             # Header background (optimized)
│   └── hero-video.mp4                     # Hero section video
│
├── 🎨 css/                                  # Stylesheets
│   └── styles.css                         # Main stylesheet
│
├── 📚 docs/                                 # Generated HTML (GitHub Pages output)
│   ├── index.html                         # English site HTML
│   ├── coming-soon.html                   # English placeholder HTML
│   ├── robots.txt                         # SEO robots file
│   ├── sitemap.xml                        # Site map
│   ├── search.json                        # Search index
│   │
│   ├── images/                            # Copied images
│   ├── css/                               # Copied CSS
│   ├── site_libs/                         # Quarto libraries
│   │
│   └── 🇵🇱 pl/                             # Polish HTML output
│       ├── index.html                     # Polish site HTML ✅ NEW
│       └── coming-soon.html               # Polish placeholder HTML ✅ NEW
│
├── 🚀 DEPLOYMENT SCRIPTS                    # ✅ ALL NEW
│   ├── deploy-bilingual.sh                # Automated deployment script
│   ├── quick-reference.sh                 # Quick command reference
│   └── QUICK_DEPLOY_COMMANDS.sh           # Legacy deploy script
│
├── 📖 DOCUMENTATION                         # ✅ ALL NEW
│   ├── SUMMARY.md                         # This file - Project summary
│   ├── DEPLOY_NOW.md                      # Step-by-step deployment guide
│   ├── POLISH_VERSION_COMPLETE.md         # Complete bilingual documentation
│   ├── QUICK_START.md                     # Quick start guide
│   └── STATUS.md                          # Project status
│
└── 📝 OTHER DOCS                            # Existing documentation
    ├── ANIMATED_BACKGROUND_GUIDE.md
    ├── CLICKABLE_CONTACTS_GUIDE.md
    ├── COMING_SOON_SETUP_COMPLETE.md
    ├── COMPLETE_SITE_FIX.md
    ├── CONTENT_MANAGEMENT_GUIDE.md
    ├── FEATURE_CARD_FIX_OCT2025.md
    ├── FINAL_FIX_COMPLETE.md
    ├── FONT_AND_STYLING_UPDATE.md
    ├── GITHUB_PAGES_DEPLOYMENT.md
    ├── GTM_VERIFICATION.md
    ├── HERO_SECTION_FIX.md
    ├── NAVBAR_FONT_UPDATE.md
    └── TYPOGRAPHY_UPDATE_OCT2025.md
```

---

## 📊 File Statistics

### Total Files Created for Polish Version:
- **Core Files:** 4 files (index.qmd, coming-soon.qmd, _quarto.yml, README.md)
- **Documentation:** 4 files (SUMMARY.md, DEPLOY_NOW.md, POLISH_VERSION_COMPLETE.md, FILE_TREE.md)
- **Scripts:** 2 files (deploy-bilingual.sh, quick-reference.sh)
- **Total New Files:** 10 files

### File Modified:
- **_quarto.yml** (main) - Updated PL link

### Lines of Code:
- **pl/index.qmd:** ~420 lines
- **pl/coming-soon.qmd:** ~30 lines
- **pl/_quarto.yml:** ~140 lines
- **pl/README.md:** ~200 lines
- **Total Polish Content:** ~790 lines

---

## 🎯 Key Files for Editing

### To Edit Content:

**English:**
```
index.qmd                    # Main English content
coming-soon.qmd              # Placeholder pages
```

**Polish:**
```
pl/index.qmd                 # Main Polish content
pl/coming-soon.qmd           # Polish placeholder pages
```

### To Edit Configuration:

**English:**
```
_quarto.yml                  # Site config, navigation, footer
css/styles.css               # Custom styles
custom.scss                  # SCSS variables
```

**Polish:**
```
pl/_quarto.yml               # Polish site config, navigation, footer
(shares CSS/SCSS with English)
```

### To Deploy:

```
deploy-bilingual.sh          # Run this to deploy both versions
quick-reference.sh           # View quick commands
```

---

## 📍 Important Path References

### Image Paths:

**From English files:**
```markdown
![Alt text](images/image-name.png)
```

**From Polish files:**
```markdown
![Alt text](../images/image-name.png)
```

### CSS Paths:

**In _quarto.yml (English):**
```yaml
css: 
  - css/styles.css
```

**In pl/_quarto.yml (Polish):**
```yaml
css: 
  - ../css/styles.css
```

### Link Paths:

**English to Polish:**
```markdown
[PL](pl/index.qmd)
```

**Polish to English:**
```markdown
[EN](../index.qmd)
```

---

## 🔗 URL Structure

### After Deployment:

**English site:**
```
https://robertkowalski1974.github.io/bimtakeoff-website/
https://robertkowalski1974.github.io/bimtakeoff-website/coming-soon.html
```

**Polish site:**
```
https://robertkowalski1974.github.io/bimtakeoff-website/pl/
https://robertkowalski1974.github.io/bimtakeoff-website/pl/coming-soon.html
```

---

## 🚀 Quick Navigation

### To Edit Polish Content:
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website/pl
open -a "TextEdit" index.qmd
# or
code index.qmd
# or
nano index.qmd
```

### To Deploy:
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
./deploy-bilingual.sh "Your commit message"
```

### To Preview:
```bash
# English
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto preview

# Polish (new terminal)
cd /Users/robertkowalski/Documents/bimtakeoff-website/pl
quarto preview
```

---

## 📦 Output Directories

### Build Output:

```
docs/                        # English site output (GitHub Pages root)
docs/pl/                     # Polish site output
```

### Working with Git:

```bash
# All files tracked:
git status

# View changes:
git diff

# Add and commit:
git add .
git commit -m "Update website"
git push origin main
```

---

## 🎨 Asset Organization

### Images (Shared):
```
images/
├── Logos (2 files)
├── Illustrations (3 files)
├── Photos (1 file)
├── Backgrounds (2 files)
└── Videos (1 file)
Total: 9 visual assets
```

### Styles (Shared):
```
css/styles.css               # Main stylesheet (~200 lines)
custom.scss                  # SCSS variables (~50 lines)
```

---

## 📱 Responsive Design

All files are optimized for:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

---

## 🔍 Finding Files

### By Purpose:

**Content:**
- Homepage: `index.qmd` (EN), `pl/index.qmd` (PL)
- Placeholders: `coming-soon.qmd` (EN), `pl/coming-soon.qmd` (PL)

**Configuration:**
- Settings: `_quarto.yml` (EN), `pl/_quarto.yml` (PL)

**Styles:**
- CSS: `css/styles.css`
- SCSS: `custom.scss`

**Assets:**
- Images: `images/`
- Videos: `images/hero-video.mp4`

**Documentation:**
- All .md files in root directory

**Deployment:**
- Scripts: `*.sh` files in root directory

---

## ✅ Verification Checklist

Before deploying, verify these files exist:

```bash
# Check Polish files
ls -la pl/index.qmd
ls -la pl/coming-soon.qmd
ls -la pl/_quarto.yml
ls -la pl/README.md

# Check deployment scripts
ls -la deploy-bilingual.sh
ls -la quick-reference.sh

# Check documentation
ls -la DEPLOY_NOW.md
ls -la POLISH_VERSION_COMPLETE.md
ls -la SUMMARY.md
```

All should return valid file paths.

---

## 🎯 What to Deploy

When you run `deploy-bilingual.sh`, these directories will be deployed:

```
docs/                        # → English website
docs/pl/                     # → Polish website
docs/images/                 # → Shared images
docs/css/                    # → Shared styles
docs/site_libs/              # → Quarto libraries
```

---

## 📞 Support

If you need help navigating the project:
- **Email:** info@bimtakeoff.com
- **Phone:** +44 (0) 20 3239 9967

---

*File tree generated: October 25, 2025*  
*Project status: ✅ READY FOR DEPLOYMENT*
