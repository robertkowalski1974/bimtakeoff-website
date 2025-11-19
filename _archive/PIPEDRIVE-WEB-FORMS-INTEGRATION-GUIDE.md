# Pipedrive Web Forms Integration - ROI Calculator
**Best Solution for Lead Capture**

## Why Pipedrive Web Forms > Email Services

✅ **Direct CRM Integration** - Leads go straight to Pipedrive  
✅ **Automatic Deal Creation** - No manual data entry  
✅ **Workflow Automation** - Auto-send ROI report via email  
✅ **Lead Scoring** - Track calculator engagement  
✅ **Follow-up Tracking** - See who opened report  
✅ **No Third-Party Services** - No EmailJS/FormSubmit needed  
✅ **RODO Compliant** - Pipedrive handles GDPR/RODO  

---

## Implementation Strategy

There are **2 approaches** - choose based on your needs:

### **Option A: Native Pipedrive Form (Easiest)** ⭐ RECOMMENDED
- Use Pipedrive's built-in web form
- Minimal coding required
- Takes 15 minutes to set up

### **Option B: Custom Form + Pipedrive API (Advanced)**
- Keep your styled form
- Send data via API to Pipedrive
- More control, more complex

---

# OPTION A: Native Pipedrive Web Form

## Step 1: Create Web Form in Pipedrive

1. **Log into Pipedrive** → Go to **Settings** → **Web Forms**
2. Click **"Create new web form"**
3. **Configure form fields:**

```
STANDARD FIELDS:
☑ Name (required)
☑ Email (required)
☑ Phone
☑ Organization (Company name)

CUSTOM FIELDS TO ADD:
☑ Project Timeline (dropdown: Immediate, 1-3 months, 3-6 months, 6+ months)
☑ Project Type (dropdown: Housing Cooperative, Commercial, Residential, etc.)
☑ Project Value (number field - will populate from calculator)
☑ Estimated Savings (number field - from calculator)
☑ ROI Percentage (number field - from calculator)
☑ Currency (text field - PLN/GBP/AUD/EUR)
☑ Lead Source (hidden field - set to "ROI Calculator")
```

4. **Customize form appearance:**
   - Match your brand colors (BIM Orange #FF9900)
   - Add your logo
   - Custom thank you message
   - Redirect URL (optional - can redirect to thank-you page)

5. **Get embed code:**
   - Pipedrive generates JavaScript embed code
   - Copy it for next step

---

## Step 2: Embed Pipedrive Form in ROI Calculator

### Method 1: Inline Embed (Form Visible on Page)

Replace the current lead form in `roi-calculator.qmd` with:

```html
<!-- PIPEDRIVE WEB FORM -->
<div id="pipedrive-form-container">
  <!-- Your Pipedrive embed code goes here -->
  <script src="https://webforms.pipedrive.com/f/loader"></script>
</div>
```

### Method 2: Modal Popup (Keep Current UX) ⭐ BETTER

Keep your current modal design, but use Pipedrive form inside:

```html
<!-- Inside Lead Capture Modal -->
<div id="lead-modal" class="modal">
  <div class="modal-content">
    <span class="modal-close">&times;</span>
    <h2>Get Your Detailed ROI Report</h2>
    
    <!-- PIPEDRIVE FORM EMBEDDED HERE -->
    <div id="pipedrive-form-wrapper">
      <!-- Paste Pipedrive embed code -->
    </div>
  </div>
</div>
```

---

## Step 3: Pass Calculator Data to Pipedrive Form

Pipedrive forms accept pre-filled values via JavaScript. Update your `roi-calculator.js`:

```javascript
// After user clicks "Get Report" button
function showLeadModal() {
  // Show modal
  leadModal.style.display = 'flex';
  
  // Pre-fill Pipedrive form with calculator results
  if (window.pipedriveForm && calculatedResults) {
    window.pipedriveForm.prefill({
      'project_value': calculatedResults.inputs.projectValue,
      'estimated_savings': Math.round(calculatedResults.totalSavings),
      'roi_percentage': Math.round(calculatedResults.roi),
      'currency': currentCurrency,
      'lead_source': 'ROI Calculator',
      'project_type': calculatedResults.inputs.projectType
    });
  }
}
```

**Alternative: Hidden Fields Method**

If pre-fill doesn't work, use hidden fields in the Pipedrive form:

```javascript
// Listen for Pipedrive form load
document.addEventListener('pipedriveWebFormsLoaded', function() {
  // Get form element
  const form = document.querySelector('[data-pipedrive-form]');
  
  // Add hidden inputs with calculator data
  addHiddenField(form, 'project_value', calculatedResults.inputs.projectValue);
  addHiddenField(form, 'estimated_savings', Math.round(calculatedResults.totalSavings));
  addHiddenField(form, 'roi_percentage', Math.round(calculatedResults.roi));
  addHiddenField(form, 'currency', currentCurrency);
});

function addHiddenField(form, name, value) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}
```

---

## Step 4: Set Up Pipedrive Automation Workflow

**Goal:** When someone submits ROI calculator form → Auto-send personalized ROI report email

### In Pipedrive:

1. **Go to:** Settings → Workflows & Automation → Create Workflow
2. **Trigger:** "Deal created from Web Form: [Your ROI Calculator Form]"
3. **Condition:** Lead Source = "ROI Calculator"
4. **Action 1:** Create Deal
   - Deal title: "ROI Calculator Lead - [Organization name]"
   - Pipeline: "Inbound Leads"
   - Stage: "New Lead - Calculator"
   - Expected close date: Based on "Project Timeline" field
   - Deal value: Use "Project Value" from form

5. **Action 2:** Send Email
   - Template: "ROI Calculator Report" (create this - see below)
   - To: {email} (form submitter)
   - Subject: "Your BIM Takeoff ROI Analysis - {{name}}"
   - Attach: ROI Report (see email template below)

6. **Action 3:** Create Activity
   - Type: "Call"
   - Due date: Tomorrow 10:00 AM
   - Assigned to: Your sales rep
   - Note: "Follow up on ROI calculator lead"

---

## Step 5: Create Email Template in Pipedrive

**Pipedrive → Settings → Email Templates → New Template**

**Template Name:** ROI Calculator Report

**Subject Line:**
```
Your BIM Takeoff ROI Analysis - Save {{project_value}} on Your Next Project
```

**Email Body:**
```
Hi {{name}},

Thank you for using our BIM 5D ROI Calculator! Based on your project details, here's your personalized analysis:

══════════════════════════════════════════
YOUR ROI ANALYSIS SUMMARY
══════════════════════════════════════════

Project Value:        {{project_value}} {{currency}}
Estimated Savings:    {{estimated_savings}} {{currency}}
Return on Investment: {{roi_percentage}}%
Project Type:         {{project_type}}
Timeline:             {{project_timeline}}

══════════════════════════════════════════
WHAT THESE SAVINGS MEAN FOR YOU
══════════════════════════════════════════

With BIM 5D estimation, you could save approximately {{estimated_savings}} {{currency}} 
on your {{project_type}} project through:

• Faster estimation (3-10 days vs 6-8 weeks traditional)
• ±5% accuracy (vs ±15-25% traditional methods)
• Reduced design changes and RFIs
• Better procurement decisions
• Clash detection savings
• Optimized material quantities

This represents a {{roi_percentage}}% return on your investment in 
professional estimation services.

══════════════════════════════════════════
NEXT STEPS
══════════════════════════════════════════

I'd love to discuss how we can help achieve these savings on your project.

Would you be available for a 15-minute call this week?

📅 Book a time: [Your Calendly Link]
📞 Call me: +44 (0) 20 3239 9967
📧 Reply to this email

══════════════════════════════════════════
ABOUT BIM TAKEOFF
══════════════════════════════════════════

20+ Years International Experience (UK, EU, Australia)
2,000+ Projects Completed
ISO 19650 Compliant
BIM 5D Specialists

Best regards,

Robert Kowalski
Founder & Lead Estimator
BIM Takeoff

🌐 www.bimtakeoff.com
📧 info@bimtakeoff.com
☎️  +44 (0) 20 3239 9967

P.S. For Polish housing cooperatives: We specialize in helping spółdzielnie 
save 30-50% through better procurement processes.
```

---

## Step 6: Track Performance in Pipedrive

### Metrics to Monitor:

1. **Lead Volume**
   - Deals created from "ROI Calculator" web form
   - Track by week/month

2. **Lead Quality**
   - Average project value from calculator
   - Conversion rate: Calculator Lead → Qualified Opportunity
   - Average time to first contact

3. **Email Engagement**
   - Open rate on ROI report emails
   - Reply rate
   - Click-through on Calendly link

4. **Revenue Attribution**
   - Closed deals from calculator leads
   - Revenue from calculator channel
   - ROI of calculator page (revenue vs development cost)

### Pipedrive Reports to Create:

```
REPORT 1: ROI Calculator Performance
- Filter: Lead Source = "ROI Calculator"
- Metrics: Deals created, Total value, Win rate
- Time: Last 30 days

REPORT 2: Follow-up Success Rate
- Filter: Lead Source = "ROI Calculator"
- Metrics: % contacted within 24h, Call completion rate
- Goal: 100% contact within 24h

REPORT 3: Project Value Distribution
- Filter: Lead Source = "ROI Calculator"
- Chart: Histogram of Project Values
- Insight: Which project sizes convert best?

REPORT 4: Currency/Region Analysis
- Group by: Currency field
- Metrics: Count, Average deal size
- Insight: Which markets are most engaged?
```

---

# OPTION B: Custom Form + Pipedrive API

If you want to keep your beautifully styled form and send data via API:

## Requirements:

1. Pipedrive API Key (get from Settings → Personal Preferences → API)
2. Backend endpoint to handle API call (can't call Pipedrive API from browser directly)
3. More complex but more control

## Implementation:

### 1. Set Up Backend Endpoint

You'll need a serverless function (e.g., Netlify Functions, Vercel, or Cloudflare Workers):

```javascript
// netlify/functions/submit-to-pipedrive.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Get data from your form
  const formData = JSON.parse(event.body);
  
  // Pipedrive API configuration
  const PIPEDRIVE_API_KEY = process.env.PIPEDRIVE_API_KEY;
  const PIPEDRIVE_DOMAIN = 'your-company.pipedrive.com';
  
  try {
    // Step 1: Create Person
    const personResponse = await fetch(
      `https://${PIPEDRIVE_DOMAIN}/v1/persons?api_token=${PIPEDRIVE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      }
    );
    const person = await personResponse.json();
    
    // Step 2: Create Organization
    const orgResponse = await fetch(
      `https://${PIPEDRIVE_DOMAIN}/v1/organizations?api_token=${PIPEDRIVE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.company
        })
      }
    );
    const org = await orgResponse.json();
    
    // Step 3: Create Deal with Calculator Data
    const dealResponse = await fetch(
      `https://${PIPEDRIVE_DOMAIN}/v1/deals?api_token=${PIPEDRIVE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `ROI Calculator Lead - ${formData.company}`,
          person_id: person.data.id,
          org_id: org.data.id,
          value: formData.projectValue,
          currency: formData.currency,
          // Custom fields (use your field IDs from Pipedrive)
          'YOUR_CUSTOM_FIELD_ID_1': formData.estimatedSavings,
          'YOUR_CUSTOM_FIELD_ID_2': formData.roiPercentage,
          'YOUR_CUSTOM_FIELD_ID_3': 'ROI Calculator',
          // etc.
        })
      }
    );
    const deal = await dealResponse.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, dealId: deal.data.id })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### 2. Update Your Form Submission Handler

```javascript
// In roi-calculator.js
async function handleLeadSubmission(e) {
  e.preventDefault();
  
  const leadData = {
    name: document.getElementById('lead-name')?.value || '',
    company: document.getElementById('lead-company')?.value || '',
    email: document.getElementById('lead-email')?.value || '',
    phone: document.getElementById('lead-phone')?.value || '',
    timeline: document.getElementById('lead-timeline')?.value || '',
    projectValue: calculatedResults.inputs.projectValue,
    estimatedSavings: Math.round(calculatedResults.totalSavings),
    roiPercentage: Math.round(calculatedResults.roi),
    currency: currentCurrency,
    projectType: calculatedResults.inputs.projectType
  };
  
  try {
    // Send to your backend endpoint
    const response = await fetch('/.netlify/functions/submit-to-pipedrive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show thank you modal
      leadModal.style.display = 'none';
      thankyouModal.style.display = 'flex';
      
      // Track conversion
      if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
          'event': 'lead_submitted',
          'lead_source': 'roi_calculator',
          'deal_id': result.dealId
        });
      }
    } else {
      throw new Error('Submission failed');
    }
    
  } catch (error) {
    console.error('Error:', error);
    alert('Sorry, there was an error. Please try again or contact us directly at info@bimtakeoff.com');
  }
}
```

---

# RECOMMENDATION: Which Option to Choose?

## Choose **Option A (Native Pipedrive Form)** if:
- ✅ You want quickest implementation (15 minutes)
- ✅ You're okay with Pipedrive's form styling
- ✅ You don't need perfect design control
- ✅ You want zero maintenance

## Choose **Option B (Custom Form + API)** if:
- ✅ You need your exact current form design
- ✅ You have development resources for backend
- ✅ You need custom validation logic
- ✅ You want to send data to multiple systems

---

# COMPARISON WITH EMAIL SERVICES

| Feature | Pipedrive Web Forms | EmailJS | FormSubmit | Backend |
|---------|-------------------|---------|------------|---------|
| **Direct CRM** | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| **Lead Tracking** | ✅ Automatic | ❌ Manual | ❌ Manual | ⚠️ Custom |
| **Email Automation** | ✅ Built-in | ⚠️ Template | ❌ Basic | ⚠️ Custom |
| **Follow-up Reminders** | ✅ Automatic | ❌ No | ❌ No | ⚠️ Custom |
| **Setup Time** | 15 min | 30 min | 5 min | 2+ hours |
| **Cost** | Free (Pipedrive) | Free tier | Free | Dev time |
| **Maintenance** | None | None | None | Ongoing |
| **RODO Compliance** | ✅ Built-in | ⚠️ Manual | ❌ Unknown | ⚠️ Manual |

**Winner:** Pipedrive Web Forms - Best balance of features, ease, and CRM integration

---

# NEXT STEPS

1. **Today:** Log into Pipedrive → Create Web Form → Get embed code
2. **This week:** Embed form in ROI calculator modal
3. **Next week:** Set up automation workflow + email template
4. **Ongoing:** Monitor performance, optimize conversion rate

Need help with any step? Let me know! 🚀
