# PDF Quality Fix Plan
**Date:** November 19, 2025
**Issue:** Inconsistent and poor quality PDF outputs between EN and PL versions

## Identified Problems

### 1. **Typography & Encoding**
- Polish characters not rendering properly (ó → o[, ł issues, ą problems)
- Font loading/embedding issues
- Inconsistent font weights between versions
- Solution: Need to ensure proper UTF-8 encoding and font embedding in jsPDF

### 2. **Layout & Spacing**
- Tables cramped in Polish version (Polish text 20-30% longer)
- Inconsistent margins between versions
- Chart/graph sizing differs
- White space distribution uneven
- Solution: Need responsive layout calculations based on text length

### 3. **Visual Consistency**
- Color consistency issues
- Box shadows/borders vary
- Visual hierarchy not matching
- Solution: Standardize all color values and styling

### 4. **Text Overflow**
- Polish text overflows in fixed-width boxes
- Button/CTA sizing inconsistent
- Header spacing varies
- Solution: Dynamic sizing based on content

### 5. **Professional Quality**
- Overall appearance unprofessional
- Not matching brand guidelines
- Inconsistent with website quality
- Solution: Complete redesign with proper branding

## Fix Strategy

### Phase 1: Font & Encoding (CRITICAL)
1. Add proper font embedding for Polish characters
2. Test all special characters
3. Ensure UTF-8 encoding throughout

### Phase 2: Layout System
1. Create responsive layout engine
2. Calculate dynamic spacing based on text length
3. Ensure consistent margins across all pages

### Phase 3: Visual Polish
1. Standardize all colors (use hex values from brand guidelines)
2. Fix all box shadows and borders
3. Ensure consistent visual hierarchy

### Phase 4: Testing
1. Test both EN and PL versions side-by-side
2. Verify all calculations
3. Check all special characters
4. Ensure professional appearance

## Implementation Files
- `/js/roi-calculator-thankyou.js` - Main PDF generation
- Backup before changes: `_archive/roi-calculator-thankyou-before-quality-fix-20251119.js`
