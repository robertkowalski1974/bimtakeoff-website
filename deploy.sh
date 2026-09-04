#!/bin/bash
#
# BIM Takeoff Website - Deploy Script (manual fallback)
#
# The primary build/deploy path is the GitHub Actions workflow at
# .github/workflows/build-and-deploy.yml: it runs build.sh on every push to
# main and commits the rendered docs/ tree back automatically. Use this
# script only when you need to build and push by hand (e.g. Actions is
# down, or you want to inspect the build before it goes out).
#
# Renders the Polish project, then the English (root) project so the root
# post-render SEO scripts (hreflang/canonicals/sitemap/structured-data/feed)
# run once over the whole docs/ tree, including docs/pl. Then verifies the
# build output and pushes to GitHub Pages.

set -euo pipefail

current_branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$current_branch" != "main" ]; then
  echo "deploy.sh refuses to run on branch '$current_branch' - switch to main first."
  exit 1
fi

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
