# PIPEDRIVE INTEGRATION FIX - Debug Guide

## The Problem
Pipedrive forms load in an iframe, which prevents direct field manipulation due to CORS restrictions. The current implementation tries to pre-fill fields but can't access them.

## The Solution
We'll use a combination approach:
1. Store calculator data in JavaScript
2. Add a webhook listener that updates the deal after it's created
3. Use Pipedrive's API to update the deal with calculator data

## Quick Fix - Alternative Approach

Instead of trying to pre-fill the embedded form, we'll:
1. Capture the form submission
2. Send calculator data along with the submission
3. Use Pipedrive's deal update API

## Files to Check
- `/js/roi-calculator.js` - Main calculator logic
- `/resources/roi-calculator.qmd` - Form HTML
- Field IDs are already configured in PIPEDRIVE_FIELD_IDS object

## Testing Steps
1. Open the calculator
2. Fill in values and calculate
3. Click "Get Report"
4. Open browser console (F12)
5. Check for console messages
6. Submit form and check Pipedrive

## Current Field IDs
```javascript
const PIPEDRIVE_FIELD_IDS = {
  projectValue: 'd4df653711c3581de9db258f5a44de0a1dbbfb4b',
  estimatedSavings: '370268b0c967a69ca9680a1f06245a1541f42df1',
  roiPercentage: '2a924ec54ca392530b60a3b877c56ff0a30fe6ec',
  projectType: 'b854797af8e35bd1061276cf967487998d1ef9e2',
  currency: '145a25c52ed436f67639a1f117df7486f83c9547',
  projectTimeline: '40acbc8ba38cec5701adfb94e03788d6e766bdb1',
  leadSource: '461990a609c554173205dbf04583dd356fec3d44'
};
```
