# Pipedrive Integration - Implementation Guide
**Date:** November 19, 2025  
**Status:** Ready to implement

## Your Pipedrive Configuration

### Custom Field API Keys (from Step 1):
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

### Pipedrive Embed Code (from Step 2):
```html
<div class="pipedriveWebForms" data-pd-webforms="https://webforms.pipedrive.com/f/6qhf9PqIpqTLYNXaz5B62foo0fklkKq1LMDczVq1eaj9Nho3d2GrDLemXMjywHIJCX">
  <script src="https://webforms.pipedrive.com/f/loader"></script>
</div>
```

---

## Files to Update

### 1. `/resources/roi-calculator.qmd`
- Replace current lead modal form with Pipedrive embed
- Keep modal structure, styling, header, footer

### 2. `/js/roi-calculator.js`
- Add Pipedrive field ID configuration
- Update `handleLeadSubmission` to pre-fill Pipedrive form
- Add Pipedrive form event listeners

---

## Implementation Steps

I'll now create the updated files for you. These will:
1. Backup current files to `_archive`
2. Create new versions with Pipedrive integration
3. Preserve all existing functionality
4. Add calculator data pre-filling

Ready to proceed?
