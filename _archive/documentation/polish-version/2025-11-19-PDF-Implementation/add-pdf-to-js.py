#!/usr/bin/env python3
"""
Script to add PDF generation to roi-calculator.js
"""

import re

# Read the file
with open('/Users/robertkowalski/Documents/bimtakeoff-website/js/roi-calculator.js', 'r') as f:
    content = f.read()

# Find and replace the get report button handler
# Pattern to match the existing code
old_pattern = r"(const getReportBtn = document\.getElementById\('get-report-btn'\);.*?getReportBtn\.addEventListener\('click', function\(\) \{)(.*?)(leadModal\.style\.display = 'flex';)"

# New code to insert
new_code = r"""\1
    // ⚡ GENERATE PDF IMMEDIATELY when button is clicked!
    if (calculatedResults && typeof generatePDFReport === 'function') {
      try {
        generatePDFReport({
          name: 'Valued Client',
          email: ''
        });
        console.log('✅ PDF Report generated and downloaded');
      } catch (error) {
        console.error('❌ PDF generation failed:', error);
      }
    }
    
    \3"""

# Apply the replacement
content_new = re.sub(old_pattern, new_code, content, flags=re.DOTALL)

# Check if replacement was made
if content_new != content:
    # Write back
    with open('/Users/robertkowalski/Documents/bimtakeoff-website/js/roi-calculator.js', 'w') as f:
        f.write(content_new)
    print("✅ Successfully added PDF generation to get-report-btn handler")
else:
    print("❌ Pattern not found - manual edit required")
    print("See /Users/robertkowalski/Documents/bimtakeoff-website/_archive/2025-11-19-PDF-Implementation/add-pdf-generation.js")
