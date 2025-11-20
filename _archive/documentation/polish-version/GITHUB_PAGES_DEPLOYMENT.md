# GitHub Pages Deployment Guide

## Prerequisites
✅ Quarto configured for GitHub Pages (output-dir: docs)
✅ .gitignore file created
✅ .nojekyll file created

## Step-by-Step Deployment

### 1. Build Your Site

First, render your Quarto site to generate the `docs` folder:

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render
```

This will create a `/docs` folder with your complete website.

### 2. Initialize Git Repository (if not already done)

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
git init
git add .
git commit -m "Initial commit - BIM Takeoff website"
```

### 3. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `bimtakeoff-website` (or any name you prefer)
3. Description: "Professional BIM Takeoff Website"
4. **Public** (required for free GitHub Pages)
5. **Don't** initialize with README, .gitignore, or license
6. Click "Create repository"

### 4. Connect Local Repository to GitHub

Replace `YOUR-USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/bimtakeoff-website.git
git branch -M main
git push -u origin main
```

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Branch: Select `main`
   - Folder: Select `/docs`
5. Click **Save**

### 6. Wait for Deployment (2-5 minutes)

GitHub will automatically deploy your site. You'll see a message:
"Your site is published at `https://YOUR-USERNAME.github.io/bimtakeoff-website/`"

### 7. Custom Domain (Optional)

If you want to use `www.bimtakeoff.com`:

1. In GitHub Pages settings, add custom domain: `www.bimtakeoff.com`
2. In your domain registrar (Cloudflare, GoDaddy, etc.):
   - Add a CNAME record pointing to: `YOUR-USERNAME.github.io`
3. Wait for DNS propagation (can take up to 48 hours)

## Updating Your Website

Whenever you make changes:

```bash
# 1. Make your changes to .qmd files
# 2. Rebuild the site
quarto render

# 3. Commit and push
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Pages will automatically redeploy (takes 1-2 minutes).

## Troubleshooting

### Site Not Loading
- Check GitHub Actions tab for build errors
- Ensure `/docs` folder is committed and pushed
- Verify GitHub Pages is enabled in Settings

### Images Not Showing
- Ensure all images are in `/images` folder
- Check that image paths are relative (e.g., `images/logo.png` not `/images/logo.png`)
- Rebuild with `quarto render` and push again

### CSS Not Applied
- Ensure `/css/styles.css` is in the `/docs` folder after render
- Check browser console for 404 errors
- Clear browser cache (Cmd+Shift+R)

### 404 Page Not Found
- Ensure you're accessing the correct URL
- For repository: `https://YOUR-USERNAME.github.io/bimtakeoff-website/`
- For custom domain: `https://www.bimtakeoff.com`

## Useful Commands

```bash
# Check git status
git status

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Force push (use carefully!)
git push --force
```

## Benefits of GitHub Pages

✅ **Free hosting** for public repositories
✅ **Automatic deployments** when you push
✅ **Custom domains** supported
✅ **HTTPS** by default
✅ **Fast CDN** delivery worldwide

## Next Steps

1. ✅ Build your site: `quarto render`
2. ✅ Initialize git: `git init`
3. ✅ Create GitHub repository
4. ✅ Push your code
5. ✅ Enable GitHub Pages
6. ✅ Visit your live site!

## Your Current Configuration

- **Output Directory**: `docs` (GitHub Pages compatible)
- **Site URL**: https://www.bimtakeoff.com (will update after custom domain)
- **.gitignore**: Configured to exclude temporary files
- **.nojekyll**: Prevents Jekyll processing

---

**Ready to deploy?** Start with Step 1 above!

For questions or issues, check GitHub's documentation:
https://docs.github.com/en/pages
