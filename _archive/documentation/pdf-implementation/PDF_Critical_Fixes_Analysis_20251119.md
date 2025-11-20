# Critical PDF Fixes - Minimal Changes for Maximum Impact

## Issue Analysis
Looking at your PDFs, the main problems are:
1. Polish characters not displaying (but jsPDF DOES support them by default)
2. Inconsistent table layouts
3. Colors may not be exact brand colors

## Root Cause
The Polish character issue (ó→o[) suggests the text is being corrupted BEFORE it reaches jsPDF, likely during:
- localStorage storage/retrieval
- String concatenation
- Template literals

## Quick Fix Strategy

### Fix 1: Ensure UTF-8 Throughout
Add this at the top of generatePDFReport():
```javascript
// Force UTF-8 encoding
doc.setLanguage("pl"); // Tell jsPDF we're using Polish
```

### Fix 2: Use Proper String Handling
Replace direct string concatenation with proper encoding:
```javascript
// INSTEAD OF:
doc.text('Całkowita Wartość Projektu: ' + formattedValue, 25, yPos);

// USE:
const text = `Całkowita Wartość Projektu: ${formattedValue}`;
doc.text(text, 25, yPos);
```

### Fix 3: Consistent Spacing
Define at top:
```javascript
const SPACING = {
  page: { top: 35, left: 20, right: 190, bottom: 280 },
  section: 15,
  subsection: 10,
  line: 6,
  paragraph: 8
};
```

### Fix 4: Exact Brand Colors
```javascript
const BRAND = {
  orange: [255, 153, 0],     // #FF9900
  green: [16, 185, 129],      // #10B981
  gray: [107, 114, 128],      // #6B7280
  darkGray: [44, 44, 44]      // #2C2C2C
};
```

## Test Polish Characters
Add this test at the start:
```javascript
console.log('Testing Polish characters: ą ć ę ł ń ó ś ź ż');
const testText = 'Test: ą ć ę ł ń ó ś ź ż Ą Ć Ę Ł Ń Ó Ś Ź Ż';
doc.text(testText, 20, 50);
```

## Recommendation
Rather than rewriting the entire file, let's:
1. Add proper encoding declaration
2. Fix string handling in Polish functions
3. Standardize colors
4. Adjust spacing constants

This will fix 90% of issues with 10% of the code changes.

Would you like me to:
A) Create targeted patches for just the problem areas
B) Provide a complete rewrite with all improvements
C) Focus on just the Polish character encoding issue first
