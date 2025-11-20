# ROI Calculator V2.0 - Deployment Checklist

## 🎯 Pre-Deployment Testing

### Phase 1: Local Testing
- [ ] Open terminal in project directory
- [ ] Run `quarto preview`
- [ ] Navigate to `/roi-calculator.html`
- [ ] Open browser console (F12)
- [ ] Verify no JavaScript errors

### Phase 2: Functionality Testing
- [ ] **Project Type Dropdown**
  - [ ] Click dropdown
  - [ ] Select different project types
  - [ ] Verify selection changes
  
- [ ] **Project Value Slider**
  - [ ] Move slider left/right
  - [ ] Verify display updates in real-time
  - [ ] Enter value manually in input box
  - [ ] Verify slider moves to match input
  
- [ ] **Timeline Radio Buttons**
  - [ ] Click each option
  - [ ] Verify only one selected at a time
  - [ ] Verify visual feedback (border color)
  
- [ ] **Cost Variance Slider**
  - [ ] Move slider
  - [ ] Verify percentage updates
  - [ ] Check tooltip appears on hover

- [ ] **Calculate Button**
  - [ ] Click "Calculate My Savings"
  - [ ] Verify results panel appears
  - [ ] Check animations are smooth
  - [ ] Verify all numbers display correctly

### Phase 3: Results Verification
- [ ] **Total Savings**
  - [ ] Number animates from 0 to final value
  - [ ] Currency code displayed (PLN)
  - [ ] Number formatted correctly (spaces)
  
- [ ] **Time Savings**
  - [ ] Days calculate correctly
  - [ ] Animation smooth
  
- [ ] **Accuracy Improvement**
  - [ ] Shows "±X% → ±5%"
  - [ ] X matches selected variance
  
- [ ] **ROI Percentage**
  - [ ] Shows percentage
  - [ ] Animates correctly

### Phase 4: Lead Capture Testing
- [ ] **Download Report Button**
  - [ ] Click button
  - [ ] Modal appears
  - [ ] Modal centers on screen
  
- [ ] **Lead Form Validation**
  - [ ] Try submitting empty form → Shows validation errors
  - [ ] Fill required fields only → Submits successfully
  - [ ] Check privacy checkbox required
  
- [ ] **Form Submission**
  - [ ] Fill all fields
  - [ ] Click "Download Report"
  - [ ] Check console for lead data
  - [ ] Verify thank you modal appears
  - [ ] Verify lead modal closes
  
- [ ] **Modal Close Functions**
  - [ ] Click X button → Modal closes
  - [ ] Click "Maybe Later" → Modal closes
  - [ ] Click background → Modal closes
  - [ ] Click "Close" in thank you → Modal closes

### Phase 5: Mobile Testing
- [ ] **Responsive Layout**
  - [ ] Open DevTools (F12)
  - [ ] Toggle device toolbar
  - [ ] Test on iPhone SE (375px)
  - [ ] Test on iPad (768px)
  - [ ] Verify single column on mobile
  - [ ] Verify grid on desktop
  
- [ ] **Touch Interactions**
  - [ ] Sliders respond to touch
  - [ ] Buttons have adequate tap targets
  - [ ] Modals are fully visible
  - [ ] No horizontal scrolling
  
- [ ] **Mobile Results**
  - [ ] Results panel auto-scrolls into view
  - [ ] All content visible
  - [ ] Numbers don't wrap awkwardly

### Phase 6: Browser Compatibility
- [ ] **Chrome/Edge**
  - [ ] All features work
  - [ ] No console errors
  
- [ ] **Firefox**
  - [ ] All features work
  - [ ] No console errors
  
- [ ] **Safari**
  - [ ] All features work
  - [ ] No console errors

### Phase 7: Analytics Verification
- [ ] **Google Tag Manager**
  - [ ] Open GTM Preview Mode
  - [ ] Calculate ROI
  - [ ] Verify "roi_calculated" event fires
  - [ ] Check event parameters:
    - [ ] project_value present
    - [ ] project_type present
    - [ ] estimated_savings present
    - [ ] currency present
  
- [ ] **Lead Submission Tracking**
  - [ ] Submit lead form
  - [ ] Verify "lead_submitted" event fires
  - [ ] Check event parameters correct

### Phase 8: Currency Testing (If Added Currency Picker)
- [ ] **Currency Switching**
  - [ ] Select GBP from dropdown
  - [ ] Verify label changes to "(GBP)"
  - [ ] Calculate → Numbers show in GBP
  - [ ] Select EUR → Numbers reformat
  - [ ] Select USD → Numbers reformat
  - [ ] Select AUD → Numbers reformat
  - [ ] Return to PLN → Original format

- [ ] **Calculation Accuracy**
  - [ ] Calculate with PLN → Note savings
  - [ ] Switch to GBP → Recalculate
  - [ ] Verify different result (due to PM cost)
  - [ ] Check console for currency logs

### Phase 9: Performance Testing
- [ ] **Load Time**
  - [ ] Page loads in < 2 seconds
  - [ ] No layout shifts
  - [ ] JavaScript loads properly
  
- [ ] **Smooth Animations**
  - [ ] Number animations at 60fps
  - [ ] No lag when moving sliders
  - [ ] Modal animations smooth
  - [ ] Results panel transition smooth

### Phase 10: Accessibility
- [ ] **Keyboard Navigation**
  - [ ] Tab through all form fields
  - [ ] Enter/Space activates buttons
  - [ ] Dropdowns work with keyboard
  - [ ] Modals closable with Escape
  
- [ ] **Screen Reader**
  - [ ] Labels properly associated
  - [ ] Error messages announced
  - [ ] Modal focus trapped
  - [ ] Success messages announced

---

## 🚀 Deployment Process

### Step 1: Final Code Review
```bash
# Ensure you're in project directory
cd /Users/robertkowalski/Documents/bimtakeoff-website

# Check git status
git status

# Review changes
git diff js/roi-calculator.js
```

### Step 2: Render Site
```bash
# Render the entire site
quarto render

# Check for errors in output
# Look for "ERROR" or "WARNING" messages
```

### Step 3: Commit Changes
```bash
# Stage changes
git add js/roi-calculator.js
git add _archive/roi-calculator-20251118/

# Commit with descriptive message
git commit -m "Upgrade ROI calculator to v2.0 with multi-currency support

- Add support for PLN, GBP, EUR, USD, AUD
- Currency-specific daily PM costs
- Enhanced analytics tracking with currency
- Improved PDF report generation
- Public API for external currency control
- All original functionality preserved
- Original files backed up to _archive/roi-calculator-20251118/"
```

### Step 4: Push to GitHub
```bash
# Push to main branch
git push origin main

# Verify push successful
# Check GitHub.com for commit
```

### Step 5: Verify Deployment
```bash
# Wait 1-2 minutes for GitHub Pages to rebuild

# Open production site
open https://robertkowalski1974.github.io/bimtakeoff-website/roi-calculator.html

# Or your custom domain:
open https://bimtakeoff.com/roi-calculator.html
```

### Step 6: Production Testing
- [ ] Run through ALL Phase 1-10 tests again on live site
- [ ] Test from different devices
- [ ] Test from different locations
- [ ] Check analytics in real GTM (not preview)

---

## 📊 Post-Deployment Monitoring

### Week 1: Monitor Closely
- [ ] **Day 1:**
  - [ ] Check error logs
  - [ ] Monitor GTM for events
  - [ ] Check calculator usage stats
  - [ ] Verify no user-reported issues

- [ ] **Day 3:**
  - [ ] Review analytics data
  - [ ] Check conversion rates
  - [ ] Monitor lead quality
  - [ ] Gather initial feedback

- [ ] **Day 7:**
  - [ ] Analyze usage patterns
  - [ ] Review currency preferences
  - [ ] Assess ROI calculations
  - [ ] Plan optimizations

### Month 1: Ongoing Monitoring
- [ ] **Weekly Reviews:**
  - [ ] Calculator usage by currency
  - [ ] Average project values
  - [ ] Conversion rates
  - [ ] Lead quality by currency

- [ ] **Performance Metrics:**
  - [ ] Page load time
  - [ ] JavaScript errors
  - [ ] User drop-off points
  - [ ] Mobile vs desktop usage

---

## 🔧 Troubleshooting

### If Calculator Doesn't Load
1. **Check browser console for errors**
   ```javascript
   // Should see:
   "ROI Calculator v2.0 loaded successfully"
   "Supported currencies: PLN, GBP, EUR, USD, AUD"
   ```

2. **Verify JavaScript file loaded**
   - Open DevTools → Network tab
   - Look for `roi-calculator.js`
   - Status should be `200`

3. **Check file path**
   - Verify script tag: `<script src="js/roi-calculator.js"></script>`
   - Not: `<script src="/js/roi-calculator.js"></script>` (leading slash)

### If Calculations Seem Wrong
1. **Check input values**
   ```javascript
   // In console:
   document.getElementById('project-value').value
   document.getElementById('cost-variance').value
   ```

2. **Verify currency**
   ```javascript
   window.ROICalculator.getCurrentCurrency()
   ```

3. **Check daily PM cost**
   ```javascript
   // Should match currency table in README
   ```

### If Analytics Not Tracking
1. **Verify GTM loaded**
   ```javascript
   typeof dataLayer !== 'undefined'
   // Should return: true
   ```

2. **Check events fired**
   - GTM Preview Mode
   - Trigger calculator
   - Look for events in preview panel

3. **Verify event parameters**
   ```javascript
   // Last event should include 'currency'
   ```

---

## ✅ Sign-Off

### Before Marking Complete
- [ ] All tests passed
- [ ] No console errors
- [ ] Analytics tracking verified
- [ ] Mobile fully functional
- [ ] All browsers tested
- [ ] Deployed successfully
- [ ] Production verification complete
- [ ] Documentation reviewed

### Approved By
- [ ] Developer: _________________ Date: _______
- [ ] QA: _________________ Date: _______
- [ ] Product Owner: _________________ Date: _______

---

## 🎉 Success Criteria

### The deployment is successful when:
1. ✅ Calculator loads without errors
2. ✅ All inputs work correctly
3. ✅ Calculations produce valid results
4. ✅ Lead capture functions properly
5. ✅ Analytics track events
6. ✅ Mobile experience is smooth
7. ✅ No user-reported issues
8. ✅ Performance meets standards

---

## 📈 KPIs to Track

### Immediate (Week 1)
- Calculator page views
- Calculation completions
- Lead form submissions
- Average project value
- Bounce rate

### Short-term (Month 1)
- Currency usage distribution
- Conversion rate by currency
- Average time on page
- Lead quality scores
- Return visitors

### Long-term (Quarter 1)
- Calculator → client conversion
- Revenue per currency
- ROI accuracy validation
- User satisfaction scores
- Feature adoption rate

---

## 🚨 Emergency Rollback

### If Critical Issues Arise

**Quick Rollback:**
```bash
# Restore original JavaScript
cp _archive/roi-calculator-20251118/roi-calculator-backup.js js/roi-calculator.js

# Render and deploy
quarto render
git add js/roi-calculator.js
git commit -m "Rollback ROI calculator to v1.0"
git push origin main
```

**Via Git:**
```bash
# Revert last commit
git revert HEAD

# Or restore specific file
git checkout HEAD~1 -- js/roi-calculator.js

# Push changes
git push origin main
```

---

## 📝 Deployment Log

| Date | Version | Deployed By | Status | Notes |
|------|---------|-------------|--------|-------|
| 2025-11-18 | 2.0 | | ⏳ Pending | Multi-currency support |

---

## 🎯 Next Steps After Deployment

### Optional Enhancements
1. [ ] Add currency picker (5 mins - see QUICK_START.md)
2. [ ] Customize daily PM costs based on feedback
3. [ ] Add more currencies if needed
4. [ ] Implement PDF generation backend
5. [ ] Add Pipedrive integration for leads
6. [ ] Create currency comparison feature
7. [ ] Add "Save my calculation" feature
8. [ ] Implement email report delivery

### Content Updates
1. [ ] Add case studies with currency examples
2. [ ] Create currency-specific landing pages
3. [ ] Update marketing materials
4. [ ] Add testimonials by market
5. [ ] Create regional pricing guides

---

**Checklist Version:** 1.0
**Last Updated:** November 18, 2025
**Next Review:** After first deployment

---

*Complete this checklist before deployment and keep for records. Good luck! 🚀*
