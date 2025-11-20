# STEP 3: Update Website Files - Simple Guide

**Time:** 10 minutes  
**Difficulty:** Easy (copy-paste)

---

## ✅ STEP 3A: Update JavaScript File (5 min)

### What to do:

1. **Open this file:**
   ```
   /Users/robertkowalski/Documents/bimtakeoff-website/js/roi-calculator.js
   ```

2. **Scroll to the VERY END of the file** (after all existing code)

3. **Copy ALL the code from this file:**
   ```
   /Users/robertkowalski/Documents/bimtakeoff-website/_archive/PIPEDRIVE-INTEGRATION-ADDON.js
   ```

4. **Paste it at the END** of roi-calculator.js

5. **Save the file**

---

## ✅ STEP 3B: Update ROI Calculator Page (5 min)

### What to do:

1. **Open this file:**
   ```
   /Users/robertkowalski/Documents/bimtakeoff-website/resources/roi-calculator.qmd
   ```

2. **Find this section** (around line 350-450):
   ```html
   <!-- Lead Capture Modal -->
   ```

3. **Replace the ENTIRE modal section** with the new code from:
   ```
   /Users/robertkowalski/Documents/bimtakeoff-website/_archive/PIPEDRIVE-MODAL-UPDATE.md
   ```
   
   **Specifically:**
   - Find: `<!-- Lead Capture Modal -->`
   - Delete everything until you reach the next `<!-- Thank You Modal -->` section
   - Paste the new modal code from PIPEDRIVE-MODAL-UPDATE.md

4. **Scroll to the BOTTOM of roi-calculator.qmd**

5. **Find the `<style>` section** (last section of the file)

6. **Add the Pipedrive CSS** from PIPEDRIVE-MODAL-UPDATE.md (inside the existing `<style>` tags)

7. **Save the file**

---

## ✅ STEP 3C: Rebuild Website

###Run these commands in Terminal:

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render
```

---

## ✅ STEP 3D: Test Locally

### Open the local preview:

```bash
# If you have a local server running:
open docs/resources/roi-calculator.html

# OR start a new preview:
quarto preview
```

### Test checklist:

1. ☐ Page loads without errors
2. ☐ Fill in calculator inputs
3. ☐ Click "Calculate My Savings"
4. ☐ Results appear correctly
5. ☐ Click "Download Full ROI Report"
6. ☐ Modal opens with Pipedrive form
7. ☐ Calculator data is visible in console (F12 → Console)
8. ☐ Fill in Pipedrive form (use test data)
9. ☐ Submit form
10. ☐ Thank you modal appears
11. ☐ Check Pipedrive - new deal should be created!

---

## 🐛 Troubleshooting

### Form doesn't appear in modal

**Check:**
- Browser console for errors (F12 → Console)
- Pipedrive embed code is correct
- No ad blocker blocking Pipedrive

**Fix:**
- Clear browser cache
- Try different browser
- Check Pipedrive form is "Active" in settings

### Calculator data doesn't fill in

**Check:**
- Console shows "Pipedrive integration loaded"
- Calculator results exist before opening modal

**Fix:**
- Make sure you added PIPEDRIVE-INTEGRATION-ADDON.js to roi-calculator.js
- Check field IDs match exactly

### Deal created but no calculator data

**Check:**
- Field IDs in JavaScript match Pipedrive
- Form submission completed successfully

**Fix:**
- Double-check API keys from Step 1
- Test with simple data first

---

## 🎯 Success Criteria

After completing Step 3, you should have:

✅ Pipedrive form embedded in ROI calculator modal  
✅ Calculator data pre-filling into Pipedrive fields  
✅ Form submissions creating deals in Pipedrive  
✅ All calculator data captured (project value, savings, ROI, etc.)  
✅ Thank you message appearing after submission  
✅ Google Analytics tracking working  

---

## 📝 Quick Commands Reference

```bash
# Navigate to website folder
cd /Users/robertkowalski/Documents/bimtakeoff-website

# Rebuild website
quarto render

# Preview locally
quarto preview

# Push to GitHub (after testing)
git add .
git commit -m "Add Pipedrive integration to ROI calculator"
git push origin main
```

---

## ⏭️ NEXT STEPS

After testing works:

1. **Push to GitHub** (website will auto-deploy)
2. **Set up email automation** in Pipedrive (Step 4)
3. **Monitor first leads**
4. **Optimize based on data**

---

## 🆘 Need Help?

If you get stuck:

1. **Check browser console** (F12) for error messages
2. **Review the backup files** in `_archive/`
3. **Test with window.testPipedriveIntegration()** in browser console
4. **Check Pipedrive form** is active and published

---

**Ready?** Start with Step 3A (update JavaScript file) and work through each step carefully!

**Current Status:** 🟡 Step 3 - Update Website Files  
**Next Status:** 🟢 Step 4 - Set Up Email Automation

Let me know when you've completed Step 3 and we'll test together! 🚀
