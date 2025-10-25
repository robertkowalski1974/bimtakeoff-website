# 🚀 Quick Start - Deploy to GitHub Pages

## What's Been Set Up For You

✅ **Quarto configured** for GitHub Pages (output-dir: docs)
✅ **.gitignore** created
✅ **.nojekyll** file added
✅ **Deployment script** ready

## Fast Track (5 Minutes)

### 1️⃣ Build Your Site
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render
```

### 2️⃣ Initialize Git (First Time Only)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 3️⃣ Create GitHub Repository
1. Go to https://github.com/new
2. Name: `bimtakeoff-website`
3. Public repository
4. **Don't** add README, .gitignore, or license
5. Click "Create repository"

### 4️⃣ Connect & Push
Replace `YOUR-USERNAME` with your GitHub username:
```bash
git remote add origin https://github.com/YOUR-USERNAME/bimtakeoff-website.git
git branch -M main
git push -u origin main
```

### 5️⃣ Enable GitHub Pages
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: Branch `main`, Folder `/docs`
4. Save

### 6️⃣ Done! 🎉
Your site will be live at:
`https://YOUR-USERNAME.github.io/bimtakeoff-website/`

---

## Using the Deploy Script (After First Setup)

Make the script executable (first time only):
```bash
chmod +x deploy.sh
```

Then, whenever you make changes:
```bash
./deploy.sh
```

The script will:
- Build your site
- Add changes to git
- Commit with your message
- Push to GitHub
- Deploy automatically!

---

## Manual Updates (Alternative)

```bash
# 1. Build
quarto render

# 2. Commit
git add .
git commit -m "Update: your message here"

# 3. Push
git push
```

---

## Custom Domain Setup (www.bimtakeoff.com)

### In GitHub (After site is deployed):
1. Settings → Pages → Custom domain
2. Enter: `www.bimtakeoff.com`
3. Save

### In Your DNS Provider (Cloudflare/GoDaddy/etc):
Add a CNAME record:
- **Name**: `www`
- **Target**: `YOUR-USERNAME.github.io`
- **TTL**: Automatic

Wait 24-48 hours for DNS propagation.

---

## Files Created

- `_quarto.yml` - Updated output-dir to `docs`
- `.gitignore` - Ignores temporary files
- `.nojekyll` - Prevents Jekyll processing
- `deploy.sh` - Automated deployment script
- `GITHUB_PAGES_DEPLOYMENT.md` - Full documentation

---

## Troubleshooting

**Site not loading?**
- Wait 5 minutes after enabling GitHub Pages
- Check Settings → Pages for deployment status
- Ensure `/docs` folder exists and is pushed

**Images missing?**
- Run `quarto render` to rebuild
- Ensure images are in `/images/` folder
- Check image paths are relative

**Need help?**
- Read full guide: `GITHUB_PAGES_DEPLOYMENT.md`
- GitHub Pages docs: https://docs.github.com/en/pages

---

**Ready? Start with Step 1 above! 🚀**
