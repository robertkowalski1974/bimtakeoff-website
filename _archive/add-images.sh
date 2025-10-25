#!/bin/bash
# Add images to homepage - Run after downloading images to /images/ folder

echo "Adding image sections to index.qmd..."

# Check if images exist
if [ ! -f "/Users/robertkowalski/Documents/bimtakeoff-website/images/bim-technology.jpg" ]; then
    echo "⚠️  Warning: bim-technology.jpg not found in images folder"
fi

if [ ! -f "/Users/robertkowalski/Documents/bimtakeoff-website/images/bim-workflow.jpg" ]; then
    echo "⚠️  Warning: bim-workflow.jpg not found in images folder"
fi

if [ ! -f "/Users/robertkowalski/Documents/bimtakeoff-website/images/construction-site.jpg" ]; then
    echo "⚠️  Warning: construction-site.jpg not found in images folder"
fi

echo ""
echo "✅ Script complete! Check the IMAGE_PLACEMENT_GUIDE.md for manual insertion instructions."
echo ""
echo "The guide shows exactly where to add each image section in index.qmd"
