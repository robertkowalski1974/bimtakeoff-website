#!/bin/bash

# BIM Takeoff - Complete SEO Setup Script
# ========================================
# This script runs all SEO optimization tasks in the correct order

set -e  # Exit on error

echo "🔍 BIM TAKEOFF - COMPLETE SEO SETUP"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "_quarto.yml" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

# Step 1: Generate Sitemap
echo "📄 Step 1/4: Generating sitemap.xml..."
python3 scripts/generate-sitemap.py

if [ $? -eq 0 ]; then
    echo "✅ Sitemap generated successfully!"
else
    echo "❌ Sitemap generation failed"
    exit 1
fi

echo ""

# Step 2: Build website with Quarto
echo "🏗️  Step 2/4: Building website..."
quarto render

if [ $? -eq 0 ]; then
    echo "✅ Website built successfully!"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""

# Step 3: Add hreflang tags
echo "🌐 Step 3/4: Adding hreflang tags..."
python3 scripts/add-hreflang.py

if [ $? -eq 0 ]; then
    echo "✅ Hreflang tags added!"
else
    echo "⚠️  Hreflang script completed with warnings"
fi

echo ""

# Step 4: Add canonical tags
echo "🔗 Step 4/4: Adding canonical tags..."
python3 scripts/add-canonicals.py

if [ $? -eq 0 ]; then
    echo "✅ Canonical tags added!"
else
    echo "⚠️  Canonical script completed with warnings"
fi

echo ""

# Summary
echo "===================================="
echo "✅ SEO SETUP COMPLETE!"
echo "===================================="
echo ""
echo "Completed tasks:"
echo "  ✓ Sitemap generated with all pages"
echo "  ✓ Website built with Quarto"
echo "  ✓ Hreflang tags added (EN ↔ PL)"
echo "  ✓ Canonical tags added (self-referencing)"
echo ""
echo "New pages included:"
echo "  ✓ /services/automated-quantity-takeoff/"
echo "  ✓ /pl/uslugi/automatyczny-przedmiar-obmiar/"
echo ""
echo "Next steps:"
echo "  1. Review sitemap: docs/sitemap.xml"
echo "  2. Test locally: quarto preview"
echo "  3. Deploy: ./deploy.sh"
echo "  4. Submit sitemap to Google Search Console"
echo "  5. Submit sitemap to Bing Webmaster Tools"
echo ""
echo "Sitemap URL: https://robertkowalski1974.github.io/bimtakeoff-website/sitemap.xml"
echo "===================================="
