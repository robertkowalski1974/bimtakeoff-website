#!/bin/bash

# BIM Takeoff Website - Quick Deploy Script
# This script builds and deploys your website to GitHub Pages

set -e  # Exit on error

echo "🚀 BIM Takeoff Website Deployment"
echo "=================================="
echo ""

# Step 1: Build the website
echo "📦 Step 1/3: Building website with Quarto..."
quarto render

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

echo ""

# Step 2: Git add and commit
echo "📝 Step 2/3: Committing changes..."
git add .

# Get commit message from user
echo "Enter commit message (or press Enter for default):"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update website - $(date '+%Y-%m-%d %H:%M:%S')"
fi

git commit -m "$commit_message"

echo "✅ Changes committed!"
echo ""

# Step 3: Push to GitHub
echo "🚢 Step 3/3: Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "Your website will be live in 2-3 minutes at:"
    echo "https://robertkowalski1974.github.io/bimtakeoff-website/"
    echo ""
    echo "✅ Google Tag Manager (GTM-PLB9BH8W) is active"
else
    echo "❌ Push failed. Please check your GitHub connection."
    exit 1
fi
