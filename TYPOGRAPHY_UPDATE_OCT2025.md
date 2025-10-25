# BIM Takeoff Website Typography Update

**Date:** October 25, 2025  
**Update:** Web Typography Changed to Inter for All Text

## What Changed

The BIM Takeoff brand guidelines have been updated to optimize web typography. The website now uses **Inter** for all text (headings and body) instead of the previous combination of Inter for headings and Lora for body text.

### Before (Old)
- **Headings:** Inter (Bold/Semi-bold)
- **Body Text:** Lora (serif)

### After (New)
- **Headings:** Inter (Bold/Semi-bold)
- **Body Text:** Inter (Regular)

## Why This Change?

According to the updated BIM Takeoff Brand Guidelines (October 2025):

1. **Better Screen Rendering:** Inter is optimized for digital displays and provides superior readability on screens
2. **Single Font Family:** Reduces font loading overhead and improves page performance
3. **Modern Aesthetic:** Clean, contemporary look appropriate for web applications
4. **Consistency:** Maintains brand consistency across all web text elements

**Note:** Lora serif font is still used for print materials (PDFs, Word documents, printed collateral)

## Files Updated

### 1. `/css/styles.css`
- Updated font import to only load Inter weights
- Changed `--font-body` CSS variable from Lora to Inter
- Updated body element styling with optimized web font properties
- Added documentation header explaining typography choices

### 2. `/custom.scss` (NEW)
- Created Quarto-specific SCSS theme file
- Defined brand color variables
- Set Inter as default font family for all Quarto elements
- Configured links, buttons, code blocks, and other UI elements

### 3. `/_quarto.yml`
- Already references custom.scss (no changes needed)

## Typography Specifications

### Web (All Digital Displays)
```css
--font-heading: 'Inter', 'Segoe UI', Arial, sans-serif;
--font-body: 'Inter', 'Segoe UI', Arial, sans-serif;
```

**Font Weights:**
- Regular (400): Body text, paragraphs
- Medium (500): UI elements, labels, buttons
- Semi-bold (600): Subheadings, navigation
- Bold (700): Main headings, emphasis

**Size Range:**
- Body text: 14-16px (default: 16px)
- Line height: 1.6
- Headings: 20px - 48px depending on hierarchy

### Print/Documents (PDFs, Word, Printed Materials)
- **Headings:** Inter
- **Body Text:** Lora (elegant serif for print readability)

## Testing the Changes

To see the updated typography:

1. **Rebuild the website:**
   ```bash
   cd /Users/robertkowalski/Documents/bimtakeoff-website
   quarto render
   ```

2. **Preview locally:**
   ```bash
   quarto preview
   ```

3. **Check the following:**
   - All body text should now use Inter (cleaner, more geometric appearance)
   - Headings continue to use Inter Bold/Semi-bold
   - Navbar and navigation elements use Inter
   - Overall appearance should be more modern and consistent

## Brand Consistency

This update maintains full compliance with the BIM Takeoff Brand Guidelines:

✅ **Colors:** Orange (#FF9900), Charcoal (#2C2C2C), White (#FFFFFF)  
✅ **Typography:** Inter for all web text  
✅ **Spacing:** Consistent use of brand spacing variables  
✅ **Visual Identity:** Professional construction industry aesthetic  

## Future Considerations

- **Performance:** Single font family reduces HTTP requests and improves load times
- **Accessibility:** Inter provides excellent readability across different screen sizes and resolutions
- **Maintenance:** Easier to maintain consistent typography with one font family
- **Scalability:** Simplified font management for future page additions

## Questions or Issues?

If you notice any styling inconsistencies or have questions about the typography update, refer to:
- `/mnt/skills/user/bim-takeoff-brand-guidelines/SKILL.md` - Complete brand guidelines
- This document for web-specific implementation details

---

*This update reflects the October 2025 revision to BIM Takeoff Brand Guidelines, optimizing web typography for better user experience while maintaining brand integrity.*
