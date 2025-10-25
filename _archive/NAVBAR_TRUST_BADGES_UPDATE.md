# Navbar and Trust Badges Update - October 25, 2025

## Changes Made

### 1. ✅ Navbar - Removed "BIM Takeoff" Text
**File:** `css/styles.css`

**Change:** Added CSS to hide the site title text next to logo
```css
.navbar-brand .navbar-title {
  display: none !important;
}

.navbar-title {
  display: none !important;
}
```

**Result:** Only the logo image displays in navbar, no text

---

### 2. ✅ Trust Badges - Updated All 4 Badges
**File:** `index.qmd`

#### Badge 1: RICS Certification
**Before:**
- Title: "RICS Certified"
- Subtitle: "Qualified Quantity Surveyors"

**After:**
- Title: "Qualified Quantity Surveyors"
- Subtitle: "Expert QS Professionals"

#### Badge 2: ISO (No Change)
- Title: "ISO 19650"
- Subtitle: "BIM Level 2 Workflows"

#### Badge 3: Experience
**Before:**
- Title: "20 Years Experience"
- Subtitle: "UK & Australia Markets"

**After:**
- Title: "20 Years Experience"
- Subtitle: "UK, EU & Australia Markets" ✅ Added EU

#### Badge 4: Insurance
**Before:**
- Title: "Professional Indemnity"
- Subtitle: "Fully Insured"

**After:**
- Title: "Fully Insured"
- Subtitle: "Comprehensive Coverage"

---

## Summary

All requested changes completed:
- ✅ Navbar shows only logo (no "BIM Takeoff" text)
- ✅ Removed "RICS Certified" claim
- ✅ Added "EU" to markets served
- ✅ Changed "Professional Indemnity" to "Fully Insured"

## Preview Changes

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto preview
```

Check:
1. Navbar - only logo visible (no text)
2. Scroll to "Why International Developers Trust Us" section
3. Verify all 4 trust badges show new text
