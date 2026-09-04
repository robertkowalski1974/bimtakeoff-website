#!/bin/bash
#
# BIM Takeoff Website - Deploy Script
# Renders the Polish project, then the English (root) project so the root
# post-render SEO scripts (hreflang/canonicals/sitemap/structured-data/feed)
# run once over the whole docs/ tree, including docs/pl. Then verifies the
# build output and pushes to GitHub Pages.

set -euo pipefail

echo "BIM Takeoff Website Deployment"
echo "==============================="
echo ""

# Steps 1-4: build both sites, run SEO scripts, verify output
./build.sh
echo ""

# Step 5: Git add, commit, push
echo "Step 5/5: Committing and pushing changes..."
git add .

commit_message="${1:-}"
if [ -z "$commit_message" ]; then
    echo "Enter commit message (or press Enter for default):"
    read -r commit_message
fi

if [ -z "$commit_message" ]; then
    commit_message="Update website - $(date '+%Y-%m-%d %H:%M:%S')"
fi

git commit -m "$commit_message"
echo "Changes committed."
echo ""

git push origin main
echo ""
echo "Deployment successful!"
echo ""
echo "Your website will be live in 2-3 minutes at:"
echo "https://www.bimtakeoff.com/"
echo "https://www.bimtakeoff.com/pl/"
echo ""
echo "Google Tag Manager (GTM-PLB9BH8W) is active"
