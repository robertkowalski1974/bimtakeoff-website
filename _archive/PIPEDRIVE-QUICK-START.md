# Pipedrive Integration - Quick Start (15 Minutes)

## BEFORE YOU START - Checklist

- [ ] Have Pipedrive account login credentials
- [ ] Have access to Pipedrive Settings → Web Forms
- [ ] Know your Pipedrive company domain (e.g., yourcompany.pipedrive.com)
- [ ] Have access to website files (roi-calculator.qmd and roi-calculator.js)

---

## STEP 1: Create Custom Fields in Pipedrive (5 min)

**Why:** These fields will store calculator data in Pipedrive

1. Go to: **Settings** → **Data fields** → **Deal custom fields**
2. Click **"Add custom field"** for each:

```
FIELD 1: Project Value
- Name: Project Value
- Type: Monetary
- Show in deal list: Yes

FIELD 2: Estimated Savings
- Name: Estimated Savings  
- Type: Monetary
- Show in deal list: Yes

FIELD 3: ROI Percentage
- Name: ROI Percentage
- Type: Numeric
- Show in deal list: Yes

FIELD 4: Project Type
- Name: Project Type
- Type: Single option
- Options: Housing Cooperative, Commercial Office, Warehouse/Industrial, Residential, Mixed-Use

FIELD 5: Currency
- Name: Currency
- Type: Single option
- Options: PLN, GBP, AUD, EUR

FIELD 6: Project Timeline
- Name: Project Timeline
- Type: Single option
- Options: Immediate, 1-3 months, 3-6 months, 6+ months

FIELD 7: Lead Source
- Name: Lead Source
- Type: Single option
- Options: ROI Calculator, Website, LinkedIn, Referral, Trade Show
```

**⚠️ IMPORTANT:** Write down the **API key** for each custom field (you'll see it when you click on the field). You'll need these for Step 3.

---

## STEP 2: Create Web Form in Pipedrive (5 min)

1. Go to: **Settings** → **Web Forms** → **"Create new web form"**

2. **Form Name:** "ROI Calculator Lead Capture"

3. **Select Fields to Include:**

```
☑ Name (required, person field)
☑ Email (required, person field)  
☑ Phone (optional, person field)
☑ Organization name (required, organization field)
☑ Project Timeline (custom field from Step 1)
☑ Project Type (custom field from Step 1)
☑ Project Value (custom field from Step 1)
☑ Estimated Savings (custom field from Step 1)
☑ ROI Percentage (custom field from Step 1)
☑ Currency (custom field from Step 1)
☑ Lead Source (custom field from Step 1 - set default value to "ROI Calculator")
```

4. **Customize Appearance:**
   - Primary color: #FF9900 (BIM Orange)
   - Button text: "Send Me My ROI Report"
   - Thank you message: "Thank you! We're preparing your personalized ROI report and will email it to you within 5 minutes."

5. **Settings:**
   - ☑ Create a deal automatically
   - Pipeline: Your main sales pipeline
   - Stage: First stage (e.g., "New Lead")
   - Deal title format: "ROI Calculator - [Organization name]"
   - ☑ Send notification email to: [your email]

6. **Click "Save and Get Code"**

7. **Copy the embed code** - should look like:
```html
<script src="https://webforms.pipedrive.com/f/loader"></script>
<script>
  pipedriveWebForms.load({
    formId: 'YOUR-FORM-ID-HERE',
    companyDomain: 'YOUR-COMPANY.pipedrive.com'
  });
</script>
```

---

## STEP 3: Update ROI Calculator Code (5 min)

### A. Update roi-calculator.qmd

Find the Lead Capture Modal section (around line 400-500) and replace the form inside the modal with:

```html
<!-- Lead Capture Modal -->
<div id="lead-modal" class="modal">
  <div class="modal-content">
    <span class="modal-close" onclick="document.getElementById('lead-modal').style.display='none'">&times;</span>
    
    <div class="modal-header">
      <h2>Get Your Detailed ROI Report</h2>
      <p class="modal-subtitle">Enter your details to receive a comprehensive analysis via email within 5 minutes</p>
    </div>
    
    <!-- PIPEDRIVE FORM EMBEDDED HERE -->
    <div id="pipedrive-form-container" class="pipedrive-form-wrapper">
      <!-- PASTE YOUR PIPEDRIVE EMBED CODE HERE -->
      <script src="https://webforms.pipedrive.com/f/loader"></script>
      <script>
        pipedriveWebForms.load({
          formId: 'YOUR-FORM-ID-HERE',
          companyDomain: 'YOUR-COMPANY.pipedrive.com'
        });
      </script>
    </div>
    
    <div class="modal-footer">
      <p class="privacy-note">
        <svg class="icon-lock" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
        </svg>
        Your data is secure and RODO/GDPR compliant. We'll never share your information.
      </p>
    </div>
  </div>
</div>
```

### B. Update roi-calculator.js

Add this code at the END of your roi-calculator.js file (after all other functions):

```javascript
// ============================================================================
// PIPEDRIVE INTEGRATION
// ============================================================================

// Configuration - Replace with your actual custom field IDs from Pipedrive
const PIPEDRIVE_FIELD_IDS = {
  projectValue: 'YOUR_PROJECT_VALUE_FIELD_ID',      // e.g., '1a2b3c4d5e'
  estimatedSavings: 'YOUR_ESTIMATED_SAVINGS_FIELD_ID',
  roiPercentage: 'YOUR_ROI_PERCENTAGE_FIELD_ID',
  currency: 'YOUR_CURRENCY_FIELD_ID',
  projectType: 'YOUR_PROJECT_TYPE_FIELD_ID',
  leadSource: 'YOUR_LEAD_SOURCE_FIELD_ID'
};

// Pre-fill Pipedrive form when modal opens
function prefillPipedriveForm() {
  if (!calculatedResults) {
    console.warn('No calculator results available to pre-fill form');
    return;
  }
  
  // Wait for Pipedrive form to load
  const checkPipedriveLoaded = setInterval(() => {
    if (typeof pipedriveWebForms !== 'undefined') {
      clearInterval(checkPipedriveLoaded);
      
      // Pre-fill calculator data
      const formData = {
        [PIPEDRIVE_FIELD_IDS.projectValue]: calculatedResults.inputs.projectValue,
        [PIPEDRIVE_FIELD_IDS.estimatedSavings]: Math.round(calculatedResults.totalSavings),
        [PIPEDRIVE_FIELD_IDS.roiPercentage]: Math.round(calculatedResults.roi),
        [PIPEDRIVE_FIELD_IDS.currency]: currentCurrency,
        [PIPEDRIVE_FIELD_IDS.projectType]: calculatedResults.inputs.projectType,
        [PIPEDRIVE_FIELD_IDS.leadSource]: 'ROI Calculator'
      };
      
      // Apply pre-fill values
      pipedriveWebForms.prefill(formData);
      
      console.log('Pipedrive form pre-filled with calculator data:', formData);
    }
  }, 100);
  
  // Stop checking after 5 seconds
  setTimeout(() => clearInterval(checkPipedriveLoaded), 5000);
}

// Listen for Pipedrive form submission success
document.addEventListener('pipedriveWebFormSubmit', function(event) {
  console.log('Lead submitted to Pipedrive:', event.detail);
  
  // Track conversion in Google Analytics
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'lead_submitted',
      'lead_source': 'roi_calculator',
      'project_value': calculatedResults.inputs.projectValue,
      'estimated_savings': Math.round(calculatedResults.totalSavings),
      'currency': currentCurrency,
      'project_type': calculatedResults.inputs.projectType
    });
  }
  
  // Close lead modal
  document.getElementById('lead-modal').style.display = 'none';
  
  // Show thank you modal
  document.getElementById('thankyou-modal').style.display = 'flex';
});

// Update the showLeadModal function (find existing one and replace)
function showLeadModal() {
  // Show the modal
  leadModal.style.display = 'flex';
  
  // Pre-fill form with calculator results
  prefillPipedriveForm();
  
  // Track modal open
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'lead_modal_opened',
      'calculator_completed': true,
      'project_value': calculatedResults.inputs.projectValue
    });
  }
}

console.log('Pipedrive integration loaded successfully');
```

### C. Add CSS Styling for Pipedrive Form

Add this to your custom.css or styles.css:

```css
/* Pipedrive Form Styling */
.pipedrive-form-wrapper {
  margin: 20px 0;
  padding: 0;
}

/* Override Pipedrive default styles to match your brand */
.pipedrive-form-wrapper iframe {
  border: none !important;
  width: 100% !important;
  min-height: 500px;
}

/* Ensure modal is wide enough for form */
#lead-modal .modal-content {
  max-width: 600px;
  padding: 30px;
}

/* Privacy note styling */
.privacy-note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.icon-lock {
  flex-shrink: 0;
  color: #28a745;
}

/* Modal header styling */
.modal-header {
  margin-bottom: 20px;
}

.modal-subtitle {
  color: #666;
  font-size: 14px;
  margin-top: 8px;
}
```

---

## STEP 4: Test Everything (2 min)

1. **Open your ROI calculator page**
2. **Fill in calculator inputs** and click "Calculate Savings"
3. **Click "Get My Full Report"** button
4. **Verify form displays** in modal
5. **Fill in your test data:**
   - Use your real email to test email automation
   - Use test phone number
6. **Submit form**
7. **Check:**
   - ✅ Form submitted successfully
   - ✅ Thank you modal appeared
   - ✅ New deal created in Pipedrive
   - ✅ Calculator data populated in custom fields
   - ✅ Received notification email (if configured)

---

## STEP 5: Set Up Email Automation (Optional but Recommended)

1. Go to: **Pipedrive** → **Workflow Automation** → **Create Workflow**

2. **Trigger:** "Deal created from web form: ROI Calculator Lead Capture"

3. **Action 1:** Send Email
   - Template: Create new template (see full guide for template)
   - To: {Person email}
   - Subject: "Your BIM Takeoff ROI Analysis - {Person name}"
   - Include personalized ROI data from custom fields

4. **Action 2:** Create Activity
   - Type: Call
   - Due date: Tomorrow 10:00 AM
   - Assigned to: You
   - Note: "Follow up on ROI calculator lead"

5. **Save and Activate Workflow**

---

## TROUBLESHOOTING

### Form doesn't appear in modal
- ✅ Check browser console for errors
- ✅ Verify Pipedrive embed code is correct
- ✅ Check if form ID and company domain are correct

### Calculator data doesn't pre-fill
- ✅ Check PIPEDRIVE_FIELD_IDS are correct (get from Pipedrive Settings → Data fields)
- ✅ Verify calculatedResults exists (check console.log)
- ✅ Ensure prefillPipedriveForm() is called when modal opens

### Deal created but no data in custom fields
- ✅ Field IDs must match exactly (case-sensitive)
- ✅ Check field types match (monetary for money, numeric for numbers)
- ✅ Verify fields are included in web form configuration

### Email automation not working
- ✅ Check workflow is active
- ✅ Verify trigger condition matches
- ✅ Test with manual deal creation first

---

## SUCCESS METRICS

After implementation, track these in Pipedrive:

- **Lead Volume:** Deals from "ROI Calculator" source
- **Lead Quality:** Average project value
- **Conversion Rate:** Calculator leads → Qualified opportunities
- **Response Time:** Time from submission to first contact
- **Win Rate:** Calculator leads that close

**Target:** 10+ qualified leads per month from calculator

---

## NEXT STEPS

1. ✅ Complete Steps 1-4 above
2. Create email template with ROI report content
3. Set up workflow automation
4. Monitor performance for 1 week
5. Optimize based on data

**Total Time:** 15-20 minutes for basic setup  
**Advanced Setup:** +30 minutes for email automation

Need help? Reach out! 🚀
