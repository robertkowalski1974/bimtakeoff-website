# Hero Section Fix - October 25, 2025

## Issue
The hero section was displaying `{.hero-subtitle}` as literal text instead of applying it as a CSS class.

## Root Cause
Quarto's inline class syntax `{.classname}` after text doesn't work reliably for complex layouts. Need to use proper div wrappers.

## Solution Applied

### Before (Incorrect):
```markdown
# 20 YEARS INTERNATIONAL EXPERIENCE<br>IN BIM 5D COST ESTIMATION.<br>NOW SERVING POLAND. {.hero-title}

From Panattoni UK to Polish Market: Precision Real-Time Cost Control<br>for Projects 30,000-120,000 m² {.hero-subtitle}
```

### After (Correct):
```markdown
::: {.hero-title}
# 20 YEARS INTERNATIONAL EXPERIENCE IN BIM 5D COST ESTIMATION. NOW SERVING POLAND.
:::

::: {.hero-subtitle}
From Panattoni UK to Polish Market: Precision Real-Time Cost Control for Projects 30,000-120,000 m²
:::
```

## CSS Updates

Added proper styling to handle both div containers and nested elements:

```css
.hero-title {
  font-family: var(--font-heading);
  font-size: 48px;
  font-weight: 700;
  color: var(--bim-white);
  line-height: 1.2;
}

.hero-title h1 {
  font-family: var(--font-heading);
  font-size: 48px;
  font-weight: 700;
  color: var(--bim-white);
  margin: 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 24px;
  color: var(--bim-light-gray);
  line-height: 1.4;
}

.hero-subtitle p {
  font-family: var(--font-body);
  font-size: 24px;
  color: var(--bim-light-gray);
  margin: 0;
  line-height: 1.4;
}
```

## What You'll See Now

✅ Clean hero section with:
- Large white title text (48px, Inter font)
- Subtitle in light gray (24px, Lora font)
- Two CTA buttons (orange primary, outlined secondary)
- No visible `{.hero-subtitle}` text
- Proper spacing and layout

## Files Modified

1. `/Users/robertkowalski/Documents/bimtakeoff-website/index.qmd` - Fixed hero section structure
2. `/Users/robertkowalski/Documents/bimtakeoff-website/css/styles.css` - Enhanced hero styling

## Test

Refresh your browser at `http://localhost:3203/` and the hero section should now display perfectly with no visible class names.

---

**Status: FIXED ✅**
