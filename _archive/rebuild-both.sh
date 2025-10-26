#!/bin/bash

echo "🔧 Rebuilding both English and Polish sites properly..."
echo ""

# Store current directory
ORIGINAL_DIR=$(pwd)

# Navigate to project root
cd "$(dirname "$0")"

echo "📍 Step 1: Building English site..."
quarto render
echo "✅ English site built to docs/"
echo ""

echo "📍 Step 2: Building Polish site (as separate website)..."
cd pl
quarto render
echo "✅ Polish site built to docs/pl/"
echo ""

# Return to original directory
cd "$ORIGINAL_DIR"

echo ""
echo "🎉 Both sites rebuilt successfully!"
echo ""
echo "To preview:"
echo "  English: quarto preview (from main directory)"
echo "  Polish:  quarto preview (from pl/ directory)"
echo ""
echo "The Polish site should now have Polish navbar and footer."
echo ""
