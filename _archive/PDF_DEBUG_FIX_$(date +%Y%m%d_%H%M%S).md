# PDF Generation Fix - ROI Calculator Thank You Page

## Date: $(date +%Y-%m-%d' '%H:%M:%S)

## Issue Identified
Line 85 in `js/roi-calculator-thankyou.js` was supposed to trigger automatic PDF generation on the Polish thank you page, but it was failing.

## Root Cause
The function `attemptPDFGeneration()` had two problems:

1. **Timing Issue**: The function was checking for `window.jspdf` immediately, but the jsPDF library might not be fully loaded yet when the check runs
2. **Single Check Method**: Only checking `window.jspdf` (lowercase) when the library might also expose itself as `window.jsPDF` (capitalized)

## Solution Implemented
Modified the `attemptPDFGeneration()` function to:

1. **Separate checks**: First check if calculator data exists, then check for jsPDF library
2. **Multiple library detection**: Check both `window.jspdf` AND `window.jsPDF` to handle different versions/configurations
3. **Retry mechanism**: If jsPDF isn't loaded yet, wait 500ms and retry automatically

## Code Changes

### Before:
```javascript
function attemptPDFGeneration() {
  if (!calculatorData || typeof window.jspdf === 'undefined') {
    showErrorState();
    return;
  }
  
  try {
    console.log('🚀 Generating PDF...');
    generatePDFReport();
    showSuccessState();
  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    showErrorState();
  }
}
```

### After:
```javascript
function attemptPDFGeneration() {
  // Check if calculator data exists
  if (!calculatorData) {
    console.warn('⚠️ No calculator data found');
    showErrorState();
    return;
  }
  
  // Check if jsPDF is loaded - try both common ways it might be exposed
  const jspdfAvailable = (typeof window.jspdf !== 'undefined') || (typeof window.jsPDF !== 'undefined');
  
  if (!jspdfAvailable) {
    console.warn('⚠️ jsPDF library not loaded yet, retrying...');
    // Retry after a short delay
    setTimeout(() => attemptPDFGeneration(), 500);
    return;
  }
  
  try {
    console.log('🚀 Generating PDF...');
    generatePDFReport();
    showSuccessState();
  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    showErrorState();
  }
}
```

## Testing Recommendations

1. Test on Polish thank you page: `/pl/zasoby/kalkulator-roi-dziekujemy.html`
2. Test on English thank you page: `/resources/roi-calculator-thank-you.html`
3. Check browser console for:
   - ✅ '🚀 Generating PDF...' message
   - ✅ '✅ PDF generated' message
   - ⚠️  Any warning messages about retries
4. Verify PDF downloads automatically
5. Test manual download button as fallback

## Files Modified
- `/js/roi-calculator-thankyou.js` - Main fix applied here

## Backup Created
- Backup saved to: `_archive/roi-calculator-thankyou-[timestamp]_BACKUP.js`

## Notes
- The retry mechanism will attempt to load the PDF once every 500ms if the library isn't ready
- This should handle most race condition issues with script loading order
- Manual download button still works as a fallback if automatic generation fails
