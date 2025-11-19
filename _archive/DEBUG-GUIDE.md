# Pipedrive Pre-fill Debugging Guide

## Step 1: Check What's Happening

1. **Open your ROI calculator page** in Chrome
2. **Fill in the calculator** (any values)
3. **Click "Calculate My Savings"**
4. **Press F12** to open Developer Tools
5. **Click "Console" tab**
6. **Click "Download Full ROI Report"**

---

## Step 2: What Do You See in Console?

**Copy and paste ALL console messages here.** You should see one of these scenarios:

### Scenario A: Pre-fill Function Running
```
Preparing to pre-fill Pipedrive form with calculator data...
Calculator data prepared for Pipedrive: {...}
✅ Pipedrive form pre-filled successfully
```

### Scenario B: Form Not Found
```
Preparing to pre-fill Pipedrive form with calculator data...
(nothing else)
```

### Scenario C: Error Messages
```
Error: ...
```

### Scenario D: Nothing at All
```
(no messages about Pipedrive)
```

---

## Step 3: Run This Test

**In the Console tab, paste this command and press Enter:**

```javascript
window.testPipedriveIntegration()
```

**Copy the output here.**

---

## Step 4: Check if Pipedrive Form Loaded

**In the Console tab, paste this:**

```javascript
document.querySelector('[data-pd-webforms]')
```

**Does it say:**
- `<div class="pipedriveWebForms" ...>` ✅ Good
- `null` ❌ Form not found

---

## Step 5: Manual Check

**Click on "Elements" tab (next to Console)**

**Press Ctrl+F (Cmd+F on Mac) and search for:** `pipedriveWebForms`

**Do you see:**
```html
<div class="pipedriveWebForms" data-pd-webforms="https://webforms.pipedrive.com/f/...">
```

**And inside it, do you see an `<iframe>` tag?**

---

## Important Note

Pipedrive forms run in an iframe for security. The calculator data might not be **visible** in the form fields to you, but it **will be sent** when you submit.

**Test this:**
1. Fill in ONLY your name and email (leave everything else empty)
2. Submit the form
3. Check Pipedrive - does the deal have calculator data in custom fields?

---

## If Deal Has Data in Pipedrive But Form Looks Empty

This is **normal**! The data is being sent as hidden fields. You won't see it in the visible form, but Pipedrive receives it.

**This means it's working! ✅**

---

## Tell Me:

1. What console messages do you see?
2. What does `window.testPipedriveIntegration()` output?
3. After submitting a test lead, does Pipedrive have the calculator data in the custom fields?

**Paste all three answers here and I'll know exactly what's wrong!** 🔍
