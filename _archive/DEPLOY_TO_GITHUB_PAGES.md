# Deploy BIM Takeoff Website to GitHub Pages

**Date:** October 25, 2025  
**Status:** Ready to Deploy

## Prerequisites ✅

- ✅ Google Tag Manager (GTM-PLB9BH8W) installed
- ✅ Website built with Quarto
- ✅ All content ready (homepage, coming soon page, etc.)

---

## Deployment Steps

### Step 1: Build the Website

Open Terminal and navigate to your website directory:

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
```

Build the website (this creates the `/docs` folder):

```bash
quarto render
```

**Expected output:**
- Creates/updates the `/docs` directory
- Compiles all `.qmd` files to HTML
- Copies all assets (images, CSS, JS)
- Includes GTM tags in all pages

---

### Step 2: Initialize Git Repository (if not already done)

Check if Git is initialized:

```bash
git status
```

**If you see "not a git repository"**, initialize it:

```bash
git init
git branch -M main
```

---

### Step 3: Create .gitignore File

Create a `.gitignore` file to exclude unnecessary files:

```bash
cat > .gitignore << 'EOF'
.quarto/
/.quarto/
*_cache/
*_files/
.DS_Store
EOF
```

---

### Step 4: Commit Your Changes

Add all files:

```bash
git add .
```

Commit with a message:

```bash
git commit -m "Initial BIM Takeoff website with GTM tracking"
```

---

### Step 5: Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name:** `bimtakeoff-website` (or your preferred name)
3. **Visibility:** Public (required for free GitHub Pages)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click **"Create repository"**

---

### Step 6: Connect Local to GitHub

Copy and run these commands:

```bash
git remote add origin https://github.com/robertkowalski1974/bimtakeoff-website.git
git push -u origin main
```

---

### Step 7: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/docs`
5. Click **Save**

**Wait 2-5 minutes** for deployment to complete.

---

### Step 8: Verify Your Website

Your site will be available at:

```
https://robertkowalski1974.github.io/bimtakeoff-website/
```

**Bookmark this URL!**

---

## Custom Domain Setup (Optional)

To use **www.bimtakeoff.com**:

### A. Add Custom Domain in GitHub

1. In GitHub Pages settings, add: `www.bimtakeoff.com`
2. Check "Enforce HTTPS"

### B. Configure DNS (at your domain registrar)

Add these DNS records:

**CNAME Record:**
```
Type: CNAME
Name: www
Value: robertkowalski1974.github.io
```

**A Records (for apex domain):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**DNS propagation takes 24-48 hours.**

---

## Update Workflow (After Initial Deployment)

Whenever you make changes:

```bash
# 1. Navigate to directory
cd /Users/robertkowalski/Documents/bimtakeoff-website

# 2. Make your edits to .qmd files

# 3. Rebuild the site
quarto render

# 4. Commit and push
git add .
git commit -m "Update: [describe your changes]"
git push origin main

# 5. Wait 2-3 minutes for GitHub Pages to rebuild
```

---

## Verify GTM After Deployment

1. Visit your deployed site
2. Open browser DevTools (F12)
3. Go to **Network** tab
4. Refresh page
5. Search for: `gtm.js` or `GTM-PLB9BH8W`
6. ✅ If you see requests to Google Tag Manager, it's working!

**Alternative:** Use [Google Tag Assistant](https://tagassistant.google.com/)

---

## Troubleshooting

### Issue: 404 Error
- **Solution:** Make sure "Source" is set to `/docs` folder, not `/root`

### Issue: Styles Not Loading
- **Solution:** Check that `site-url` in `_quarto.yml` matches your GitHub Pages URL

### Issue: GTM Not Tracking
- **Solution:** 
  - Verify GTM container is published in GTM dashboard
  - Check browser console for errors
  - Use GTM Preview mode to debug

---

## Quick Reference

**Build site:**
```bash
quarto render
```

**Deploy updates:**
```bash
git add .
git commit -m "Your message"
git push
```

**Preview locally before deploying:**
```bash
quarto preview
```

---

## Need Help?

- **Quarto Docs:** https://quarto.org/docs/publishing/github-pages.html
- **GitHub Pages:** https://docs.github.com/en/pages
- **GTM Help:** https://support.google.com/tagmanager

**Ready to deploy?** Start with Step 1! 🚀
