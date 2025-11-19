# Quick Start Guide: Adding Currency Picker to ROI Calculator

## 🎯 Goal
Add a currency dropdown selector at the top of the ROI calculator form so users can choose their preferred currency before calculating savings.

---

## ✅ What's Already Done
- ✅ JavaScript is fully currency-ready
- ✅ All calculations work with multiple currencies
- ✅ Formatting handles PLN, GBP, EUR, USD, AUD
- ✅ Original files backed up to `_archive/roi-calculator-20251118/`

---

## 🚀 Quick Implementation (5 Minutes)

### Step 1: Open the ROI Calculator Page
```bash
# Open in your text editor
code roi-calculator.qmd
# or
open roi-calculator.qmd
```

### Step 2: Find the Form Section
Look for this line (around line 35):
```html
<form id="roi-form">
```

### Step 3: Add Currency Picker
**PASTE THIS** right after `<form id="roi-form">` and before the Project Type dropdown:

```html
<!-- Currency Selector -->
<div class="form-group" style="margin-bottom: 24px;">
  <label for="currency-selector" style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--bim-charcoal);">
    💱 Currency
  </label>
  <select id="currency-selector" class="form-control" style="width: 100%; padding: 12px; border: 2px solid var(--bim-light-gray); border-radius: 4px; font-size: 16px; background: white;">
    <option value="PLN">🇵🇱 Polish Złoty (PLN)</option>
    <option value="GBP">🇬🇧 British Pound (GBP)</option>
    <option value="EUR">🇪🇺 Euro (EUR)</option>
    <option value="USD">🇺🇸 US Dollar (USD)</option>
    <option value="AUD">🇦🇺 Australian Dollar (AUD)</option>
  </select>
</div>
```

### Step 4: Update Project Value Label
Find this line (around line 54):
```html
Project Value (PLN)
```

Replace with:
```html
Project Value <span class="currency-label">(PLN)</span>
```

This allows the JavaScript to update the currency code dynamically.

### Step 5: Save and Test
```bash
# Render the site
quarto render

# Or preview
quarto preview
```

---

## 🧪 Testing Your Implementation

### 1. Open the Calculator Page
Navigate to your local preview or deployed site's ROI calculator.

### 2. Test Currency Switching
1. ✅ Open browser console (F12)
2. ✅ Select different currencies from dropdown
3. ✅ Watch the "(PLN)" label change to "(GBP)", "(EUR)", etc.
4. ✅ Move the project value slider
5. ✅ Verify numbers format correctly:
   - PLN: `5 000 000`
   - GBP: `5,000,000`
   - EUR: `5.000.000`

### 3. Test Calculations
1. ✅ Select a currency
2. ✅ Click "Calculate My Savings"
3. ✅ Verify results show in selected currency
4. ✅ Switch currency and recalculate
5. ✅ Verify numbers change appropriately

### 4. Test Lead Capture
1. ✅ Click "Download Full ROI Report"
2. ✅ Fill form and submit
3. ✅ Check browser console for lead data
4. ✅ Verify currency is included in captured data

---

## 📍 Visual Result

### Before:
```
┌─────────────────────────────────┐
│ Your Project Details             │
├─────────────────────────────────┤
│ Project Type                     │
│ [Residential ▼]                 │
│                                  │
│ Project Value (PLN)              │
│ [====●=========]                 │
└─────────────────────────────────┘
```

### After:
```
┌─────────────────────────────────┐
│ Your Project Details             │
├─────────────────────────────────┤
│ 💱 Currency                      │ ← NEW!
│ [🇵🇱 Polish Złoty (PLN) ▼]      │ ← NEW!
│                                  │
│ Project Type                     │
│ [Residential ▼]                 │
│                                  │
│ Project Value (PLN)  ← Updates! │
│ [====●=========]                 │
└─────────────────────────────────┘
```

---

## 🎨 Customization Options

### Option 1: Different Default Currency
In `js/roi-calculator.js`, line 39:
```javascript
let currentCurrency = 'PLN'; // Change to 'GBP', 'EUR', etc.
```

### Option 2: Fewer Currency Options
Just remove unwanted `<option>` lines from the dropdown.

### Option 3: Different Display Format
In the dropdown HTML, customize the text:
```html
<!-- Original -->
<option value="PLN">🇵🇱 Polish Złoty (PLN)</option>

<!-- Simplified -->
<option value="PLN">PLN - Polish Złoty</option>

<!-- Code Only -->
<option value="PLN">PLN</option>
```

### Option 4: Add Currency Description Tooltip
```html
<label for="currency-selector" style="display: block; font-weight: 600; margin-bottom: 8px; color: var(--bim-charcoal);">
  💱 Currency
  <i class="bi bi-info-circle" style="color: var(--bim-medium-gray); font-size: 0.9rem; cursor: help;" title="Select your preferred currency for cost estimates"></i>
</label>
```

---

## 🔧 Advanced: Auto-Detect User Currency

### Option: Detect Based on Browser Locale
Add this JavaScript to automatically select user's currency:

```html
<!-- Add to bottom of roi-calculator.qmd, before closing script tag -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Auto-detect user's locale
  const userLocale = navigator.language || navigator.userLanguage;
  
  // Map locales to currencies
  const localeMap = {
    'pl': 'PLN',
    'en-GB': 'GBP',
    'en-AU': 'AUD',
    'en-US': 'USD',
    'de': 'EUR',
    'fr': 'EUR',
    'es': 'EUR',
    'it': 'EUR'
  };
  
  // Get detected currency
  const detected = localeMap[userLocale] || localeMap[userLocale.split('-')[0]] || 'PLN';
  
  // Set selector if it exists
  const selector = document.getElementById('currency-selector');
  if (selector && selector.querySelector(`option[value="${detected}"]`)) {
    selector.value = detected;
    window.ROICalculator.setCurrency(detected);
  }
});
</script>
```

---

## 🐛 Troubleshooting

### Issue: Currency doesn't change when I select it
**Solution:**
1. Open browser console (F12)
2. Look for JavaScript errors
3. Verify the dropdown has `id="currency-selector"`
4. Check that `js/roi-calculator.js` is loading

### Issue: Numbers look weird (e.g., "5.000.000,00")
**Solution:** This is correct for some locales (EUR uses periods). If you want consistent formatting:
```javascript
// In CURRENCIES object, standardize locale:
EUR: {
  ...
  locale: 'en-US', // Use US formatting for all
}
```

### Issue: Currency label doesn't update
**Solution:** Make sure you changed:
```html
Project Value (PLN)
```
To:
```html
Project Value <span class="currency-label">(PLN)</span>
```

---

## 📊 Analytics Tracking

The calculator automatically tracks currency in Google Tag Manager:

```javascript
{
  'event': 'roi_calculated',
  'project_value': 5000000,
  'project_type': 'residential',
  'estimated_savings': 375000,
  'currency': 'GBP'  // ← Automatically included
}
```

Use this to analyze:
- Which currencies are most popular
- Average project values by currency
- ROI calculations by region

---

## 🚢 Deployment

### Local Testing
```bash
quarto preview
# Open http://localhost:XXXX/roi-calculator.html
```

### Deploy to GitHub Pages
```bash
quarto render
git add .
git commit -m "Add currency picker to ROI calculator"
git push origin main
```

Site will update in 1-2 minutes.

---

## 📝 Checklist

Before marking this as complete:

- [ ] Currency dropdown added to form
- [ ] Dropdown has correct `id="currency-selector"`
- [ ] All 5 currencies present (or customized)
- [ ] Project Value label updated with `<span class="currency-label">`
- [ ] Page renders without errors
- [ ] Currency switching works in browser
- [ ] Calculations produce different results per currency
- [ ] Numbers format correctly for each locale
- [ ] Lead capture includes currency
- [ ] Changes committed to git
- [ ] Site deployed

---

## 🎉 You're Done!

Your ROI calculator now supports multiple currencies. Users can:
- ✅ Choose their preferred currency
- ✅ See calculations in their local currency
- ✅ Get accurate ROI based on regional costs
- ✅ Download reports in their selected currency

---

## 📞 Need Help?

**Console Commands to Test:**
```javascript
// Check if calculator is loaded
window.ROICalculator

// Switch currency programmatically
window.ROICalculator.setCurrency('GBP')

// See supported currencies
window.ROICalculator.getSupportedCurrencies()

// Get current currency
window.ROICalculator.getCurrentCurrency()
```

---

**Implementation Time:** ~5 minutes
**Difficulty:** ⭐☆☆☆☆ (Very Easy)
**Impact:** 🚀🚀🚀🚀🚀 (Very High)

*This guide assumes you've already completed the JavaScript upgrade (which is done!).*
