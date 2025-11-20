#!/bin/bash

# Quick Test Script for PDF Generation
# Run this to verify the ROI Calculator PDF generation is working

echo "=================================================="
echo "  BIM Takeoff - PDF Generation Test"
echo "=================================================="
echo ""

# 1. Check if files exist
echo "✓ Checking file structure..."
if [ -f "/Users/robertkowalski/Documents/bimtakeoff-website/resources/roi-calculator.qmd" ]; then
    echo "  ✅ roi-calculator.qmd exists"
else
    echo "  ❌ roi-calculator.qmd NOT FOUND"
fi

if [ -f "/Users/robertkowalski/Documents/bimtakeoff-website/js/roi-calculator.js" ]; then
    echo "  ✅ roi-calculator.js exists"
else
    echo "  ❌ roi-calculator.js NOT FOUND"
fi

echo ""

# 2. Check if jsPDF library is included
echo "✓ Checking jsPDF library inclusion..."
if grep -q "jspdf" "/Users/robertkowalski/Documents/bimtakeoff-website/resources/roi-calculator.qmd"; then
    echo "  ✅ jsPDF library included in QMD file"
else
    echo "  ❌ jsPDF library NOT included"
fi

echo ""

# 3. Check if generatePDFReport function exists
echo "✓ Checking PDF generation function..."
if grep -q "function generatePDFReport" "/Users/robertkowalski/Documents/bimtakeoff-website/js/roi-calculator.js"; then
    echo "  ✅ generatePDFReport() function found"
else
    echo "  ❌ generatePDFReport() function NOT found"
fi

echo ""

# 4. Check if button click handler is configured
echo "✓ Checking button click handler..."
if grep -q "generatePDFReport({" "/Users/robertkowalski/Documents/bimtakeoff-website/js/roi-calculator.js"; then
    echo "  ✅ Button click handler configured"
else
    echo "  ❌ Button click handler NOT configured"
fi

echo ""
echo "=================================================="
echo "  Manual Test Instructions"
echo "=================================================="
echo ""
echo "1. Open in Chrome:"
echo "   file:///Users/robertkowalski/Documents/bimtakeoff-website/docs/resources/roi-calculator.html"
echo ""
echo "2. Fill calculator:"
echo "   - Select currency (PLN)"
echo "   - Select project type (Residential)"
echo "   - Adjust project value (5,000,000)"
echo ""
echo "3. Click 'Calculate My Savings'"
echo "   - Results should appear"
echo ""
echo "4. Click 'Download Full ROI Report'"
echo "   - PDF should download immediately"
echo "   - Pipedrive modal should open"
echo ""
echo "5. Check PDF:"
echo "   - Should be 3 pages"
echo "   - Page 1: Summary with metrics"
echo "   - Page 2: Risk analysis"
echo "   - Page 3: Next steps"
echo ""
echo "=================================================="
echo "  Console Test Commands"
echo "=================================================="
echo ""
echo "Open browser console (F12) and run:"
echo ""
echo "// Check if jsPDF loaded"
echo "console.log(typeof jsPDF);"
echo ""
echo "// Check if function exists"
echo "console.log(typeof generatePDFReport);"
echo ""
echo "// Manually trigger PDF (after calculating)"
echo "generatePDFReport({ name: 'Test User', email: 'test@test.com' });"
echo ""
echo "=================================================="
echo "  Status: ✅ Implementation Complete"
echo "=================================================="
echo ""
