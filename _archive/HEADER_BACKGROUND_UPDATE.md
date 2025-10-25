# Header Background Image Update

**Date:** October 25, 2025  
**Update:** Added construction background image to hero section

## What Changed

The hero section now uses the same background image as your current www.bimtakeoff.com website - a professional construction/building image with a dark overlay.

## Required Action

**You need to download the background image manually:**

1. **Download the image:**
   - Visit: https://static.wixstatic.com/media/11062b_9e58fdb3f1e346689f6b6804f732bb67f000.jpg/v1/fill/w_1920,h_997,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/11062b_9e58fdb3f1e346689f6b6804f732bb67f000.jpg
   - Right-click and "Save Image As..."
   - Save to: `/Users/robertkowalski/Documents/bimtakeoff-website/images/header-background.jpg`

2. **Rebuild the website:**
   ```bash
   cd /Users/robertkowalski/Documents/bimtakeoff-website
   quarto render
   ```

## What the New Design Includes

### Background Image Styling
```css
background-image: linear-gradient(rgba(44, 44, 44, 0.75), rgba(64, 64, 64, 0.75)), 
                  url('../images/header-background.jpg');
```

**Features:**
- ✅ **Construction-themed background** from your current website
- ✅ **Dark overlay** (75% opacity) ensures text remains readable
- ✅ **Cover positioning** - image fills the entire hero section
- ✅ **Fixed attachment** - parallax effect on desktop (background stays while content scrolls)
- ✅ **Minimum height** - ensures proper display even with short text
- ✅ **Mobile optimization** - scroll attachment on mobile for better performance

### Visual Effect

**Desktop:**
- Large, impactful hero section with construction background
- Fixed background creates modern parallax scrolling effect
- Dark overlay maintains brand colors and text readability
- Professional, industry-specific visual

**Mobile:**
- Responsive background (scroll instead of fixed)
- Optimized height and padding
- Maintains visual impact on smaller screens

## Fallback

If the image file is not found, the hero section will display with:
- The dark gradient overlay (charcoal to dark gray)
- All text remains readable
- Brand colors maintained

## Alternative: Use a Different Background

If you prefer a different construction image:
1. Find or create your preferred image (recommended: 1920x1080 or larger)
2. Save it as `header-background.jpg` in the `/images` folder
3. Make sure it has good contrast for white text
4. Render the site

## Testing

After adding the image:

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render
quarto preview
```

**Check:**
- ✅ Background image loads properly
- ✅ Text is clearly readable over the image
- ✅ Image is appropriately positioned
- ✅ Mobile view displays correctly
- ✅ Parallax effect works on desktop (scroll the page)

## Customization Options

If you want to adjust the overlay darkness, edit `css/styles.css`:

```css
/* Lighter overlay (50% opacity) */
background-image: linear-gradient(rgba(44, 44, 44, 0.5), rgba(64, 64, 64, 0.5)), url(...);

/* Darker overlay (90% opacity) */
background-image: linear-gradient(rgba(44, 44, 44, 0.9), rgba(64, 64, 64, 0.9)), url(...);
```

## Brand Consistency

This update maintains the BIM Takeoff brand:
- ✅ Professional construction imagery
- ✅ Orange and charcoal color scheme preserved
- ✅ Clean, modern design aesthetic
- ✅ Industry-appropriate visual identity

---

*Once you download the image to the correct location, the hero section will display with the professional construction background from your current website.*
