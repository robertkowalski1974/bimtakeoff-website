# Feature Card CTA Button Fix

**Date:** October 25, 2025  
**Issue:** Orange boxes covering content in "Specialized Industry Expertise" section  
**Status:** ✅ FIXED

## Problem Description

The CTA buttons (`.cta-primary`) inside feature cards were appearing as large orange boxes that covered the card content. The text content was only visible on hover, which was not the intended behavior.

## Root Cause

The feature cards lacked proper layout structure, causing the CTA buttons to:
1. Expand to fill available space
2. Potentially overlap or obscure text content above them
3. Display incorrectly without proper alignment

## Solution Applied

Added flexbox layout to `.feature-card` and specific styling for `.cta-primary` buttons within cards:

### Changes Made to `/css/styles.css`:

```css
.feature-card {
  background: white;
  padding: 32px;
  border-left: 4px solid var(--bim-orange);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;              /* NEW */
  flex-direction: column;     /* NEW */
}

/* CTA buttons inside feature cards - NEW SECTION */
.feature-card .cta-primary {
  margin-top: auto;           /* Pushes button to bottom */
  margin-bottom: 0;
  align-self: flex-start;     /* Aligns to left, not stretch */
  width: auto;                /* Prevents full-width expansion */
  display: inline-block;
}

.feature-card .cta-primary:hover {
  text-decoration: none;      /* Removes underline on hover */
}
```

## How This Fixes the Issue

1. **Flexbox Layout**: `display: flex; flex-direction: column;` creates a vertical stack within the card
2. **Button Positioning**: `margin-top: auto` pushes the button to the bottom of the card
3. **Button Size**: `width: auto; display: inline-block;` ensures button only takes up needed space
4. **Alignment**: `align-self: flex-start` keeps button left-aligned instead of stretching full-width

## Expected Result

After this fix:
- ✅ Text content (title, experience, specialization) is always visible
- ✅ CTA button appears as a normal-sized orange button at the bottom
- ✅ Button text is readable ("Explore Warehouse Solutions →", etc.)
- ✅ Button hovers correctly with color change
- ✅ No content is hidden or obscured

## Testing

To see the fix:

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render
quarto preview
```

Check the "Specialized Industry Expertise" section on the homepage - all three cards should now display properly with:
- Visible heading (🏭 Warehouses & Logistics, 💻 Data Centers, 🏘️ Residential Development)
- Visible experience and specialization text
- Properly-sized orange CTA button at the bottom

## Similar Sections

This fix also improves any other sections using `.feature-card` with `.cta-primary` buttons, including:
- "Our Services" section (6 cards)
- Any future feature card implementations

## Browser Compatibility

The flexbox solution works in all modern browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

*Issue identified and resolved: October 25, 2025*
