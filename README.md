# BIM Takeoff - Professional Bilingual Website
## 🇬🇧 English | 🇵🇱 Polski

[![Status](https://img.shields.io/badge/Status-Ready%20to%20Deploy-brightgreen)]()
[![Version](https://img.shields.io/badge/Version-2.0%20Bilingual-blue)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

**Professional BIM 5D Cost Estimation Services**  
Complete bilingual website with English and Polish versions

---

## 🎉 Polish Version COMPLETE! ✅

**Completed:** October 25, 2025  
**Status:** Ready for deployment  
**Languages:** English + Polish

### What's New:
- ✅ Complete Polish translation of entire website
- ✅ Polish navigation menu and footer
- ✅ Language switcher (PL/EN)
- ✅ Automated deployment system
- ✅ Comprehensive documentation

---

## 🚀 Quick Deploy (3 Steps)

### 1. Make Script Executable
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
chmod +x deploy.sh
```

### 2. Deploy Both Versions
```bash
./deploy.sh "Launch Polish version"
```

### 3. Wait 2-5 Minutes
Your site will be live at:
- 🇬🇧 **English:** https://www.bimtakeoff.com/
- 🇵🇱 **Polish:** https://www.bimtakeoff.com/pl/

---

## 📁 Project Structure

```
bimtakeoff-website/
│
├── 🇬🇧 ENGLISH VERSION
│   ├── index.qmd ........................ Homepage
│   ├── coming-soon.qmd .................. Placeholder
│   └── _quarto.yml ...................... Configuration
│
├── 🇵🇱 POLISH VERSION (NEW!)
│   └── pl/
│       ├── index.qmd .................... Homepage
│       ├── coming-soon.qmd .............. Placeholder
│       ├── _quarto.yml .................. Configuration
│       └── README.md .................... Documentation
│
├── 🖼️  SHARED ASSETS
│   ├── images/ .......................... Logo, photos, video
│   ├── css/ ............................. Stylesheets
│   └── custom.scss ...................... SCSS styles
│
├── 🚀 DEPLOYMENT
│   ├── deploy.sh .............. Auto-deploy script
│   └── quick-reference.sh ............... Command reference
│
└── 📚 DOCUMENTATION
    ├── DEPLOY_NOW.md .................... Deployment guide ⭐
    ├── POLISH_VERSION_COMPLETE.md ....... Full documentation
    ├── SUMMARY.md ....................... Project summary
    └── FILE_TREE.md ..................... File structure
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
