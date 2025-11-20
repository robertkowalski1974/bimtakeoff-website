# BIM Takeoff Website - Quick Deploy Commands
# GitHub Username: robertkowalski1974
# Copy and paste these commands into Terminal

## STEP 1: Navigate to directory
cd /Users/robertkowalski/Documents/bimtakeoff-website

## STEP 2: Build the website
quarto render

## STEP 3: Initialize Git (if needed)
git init
git branch -M main

## STEP 4: Create .gitignore
cat > .gitignore << 'EOF'
.quarto/
/.quarto/
*_cache/
*_files/
.DS_Store
EOF

## STEP 5: Add and commit files
git add .
git commit -m "Initial BIM Takeoff website with GTM tracking"

## STEP 6: Connect to GitHub and push
git remote add origin https://github.com/robertkowalski1974/bimtakeoff-website.git
git push -u origin main

## STEP 7: Enable GitHub Pages (Manual - do in browser)
# 1. Go to: https://github.com/robertkowalski1974/bimtakeoff-website/settings/pages
# 2. Source: main branch
# 3. Folder: /docs
# 4. Click Save

## Your website will be live at:
## https://robertkowalski1974.github.io/bimtakeoff-website/

## FUTURE UPDATES: Just run
# quarto render
# git add .
# git commit -m "Update: describe your changes"
# git push origin main
