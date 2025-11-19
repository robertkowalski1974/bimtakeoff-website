# How to Test the Thank You Page

The thank you page expects data from the calculator. If you visit it directly, you'll see the error state.

## Option 1: Test the Complete Flow (Recommended)

1. Visit the calculator: https://bimtakeoff.com/resources/roi-calculator.html
2. Fill in the calculator fields:
   - Project Type: Commercial
   - Project Value: 1000000
   - Timeline: Standard (5 weeks)
   - Current Variance: 10%
   - Currency: EUR
3. Click "Calculate Potential Savings"
4. Click "Get My Free Report"
5. Fill in the lead form:
   - Name: Test User
   - Email: test@example.com
   - Company: Test Company
   - Timeline: 3-6 months
6. Click "Submit"
7. You should be redirected to the thank you page with data
8. PDF should auto-download after 1.5 seconds

## Option 2: Manually Add Test Data to localStorage

If you want to test the thank you page directly, open browser console and run:

```javascript
// Add test calculator data to localStorage
localStorage.setItem('bimtakeoff_calculator_data', JSON.stringify({
  projectValue: 1000000,
  savings: 50000,
  roi: 5,
  currency: 'EUR',
  project_type: 'commercial',
  timeline: 'standard',
  variance: 10,
  breakdown: {
    timeSavings: 15000,
    accuracySavings: 12000,
    reworkSavings: 13000,
    changeOrderSavings: 10000,
    bimCost: 10000
  },
  timestamp: new Date().toISOString(),
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company'
}));

// Then refresh the page
location.reload();
```

## Option 3: Check Console Logs

Open browser DevTools (F12) and check the Console tab. You should see:

**If data exists:**
```
🎉 Thank you page DOMContentLoaded fired
💾 LocalStorage data: {"projectValue":1000000,...}
📊 Loading calculator data...
💾 Raw stored data: {...}
✅ Parsed calculator data: {...}
🔍 jsPDF loading check: {...}
✅ jsPDF loaded successfully from local file
⏰ Auto-generating PDF after 1.5 second delay...
```

**If no data (visiting directly):**
```
🎉 Thank you page DOMContentLoaded fired
💾 LocalStorage data: null
📊 Loading calculator data...
💾 Raw stored data: null
⚠️ No calculator data in localStorage
❌ No calculator data available to display
```

## Expected Behavior

### With Data:
- Loading spinner shows briefly
- Transitions to success screen
- Shows savings summary with your numbers
- PDF auto-downloads
- Manual download button available

### Without Data:
- Shows error screen
- Message: "Oops! Something Went Wrong"
- "We couldn't generate your report automatically"
- Link to contact page

## Troubleshooting

If the PDF still doesn't generate after following the complete flow:

1. **Check Console for Errors:**
   - Any red error messages?
   - Does jsPDF load successfully?

2. **Check localStorage:**
   ```javascript
   localStorage.getItem('bimtakeoff_calculator_data')
   ```
   - Should return JSON string with data
   - If null, the redirect didn't save data properly

3. **Check Network Tab:**
   - Is `jspdf.umd.min.js` loaded? (Status 200)
   - Is `roi-calculator-thankyou.js` loaded? (Status 200)

4. **Hard Refresh:**
   - Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
   - Clears cache and reloads everything

## Current Status

✅ All fixes deployed:
- Commit 51aae48: jsPDF local loading
- Commit fe95e5c: Element ID fixes
- Commit cc855ee: Redirect to thank you page

The system should work end-to-end when you go through the calculator → form → thank you page flow.
