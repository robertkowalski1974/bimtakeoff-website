# PIPEDRIVE AUTOMATION - Complete Setup Guide

## ✅ SOLUTION: Automated Email Report Delivery

When someone submits the form → Pipedrive automatically sends personalized ROI report email

## STEP 1: Create Email Template (5 min)

1. **Go to Pipedrive** → Settings → Email Templates
2. Click **"+ Email template"**
3. **Name:** "ROI Calculator Report - Automated"
4. **Copy the HTML** from `PIPEDRIVE-EMAIL-TEMPLATE.html`
5. **Important:** Update these placeholders with your actual field IDs:
   ```
   {{ deal.370268b0c967a69ca9680a1f06245a1541f42df1 }} - Estimated Savings
   {{ deal.2a924ec54ca392530b60a3b877c56ff0a30fe6ec }} - ROI Percentage
   {{ deal.b854797af8e35bd1061276cf967487998d1ef9e2 }} - Project Type
   ```
6. **Save template**

## STEP 2: Create Automation Workflow (10 min)

1. **Go to** Settings → Workflow Automation
2. Click **"Create workflow"**
3. **Name:** "Send ROI Report to New Leads"

### Trigger:
- **When:** Deal created
- **Filter:** Lead Source = "ROI Calculator"

### Actions:
1. **Wait:** 2 minutes (let data sync)
2. **Send email:**
   - To: Deal contact person
   - Template: "ROI Calculator Report - Automated"
   - From: Your email
   - Reply-to: Your email

3. **Create activity:**
   - Type: Call
   - Subject: "Follow up on ROI report"
   - Due: In 2 days
   - Assigned to: You

4. **Update deal stage:** 
   - Move to: "Report Sent"

## STEP 3: Test the Flow (5 min)

1. Fill your calculator with test data
2. Submit the form
3. Check Pipedrive - new deal created?
4. Wait 2 minutes
5. Check email - report received?

## WHAT THE USER GETS

**Immediately:** 
- Visual confirmation on website (calculator data displayed)

**Within 2 minutes:**
- Professional HTML email with their calculations
- Links to resources
- Call-to-action for consultation

**You get:**
- Deal in CRM with all data
- Activity reminder to follow up
- Full tracking of engagement

---

# ALTERNATIVE OPTIONS

## Option 2: Instant Thank You Page (No Email)

Create a dynamic thank you page that shows their report immediately:

```javascript
// Add to roi-calculator.js after form submission
function showInstantReport() {
  const reportHTML = `
    <div class="report-container">
      <h2>Your ROI Report</h2>
      <div class="metrics">
        <p>Project Value: ${formatCurrency(formData.project_value)}</p>
        <p>Estimated Savings: ${formatCurrency(formData.estimated_savings)}</p>
        <p>ROI: ${formData.roi_percentage}%</p>
      </div>
      <button onclick="window.print()">Print Report</button>
      <button onclick="downloadReport()">Download PDF</button>
    </div>
  `;
  
  // Replace form with report
  document.getElementById('lead-modal').innerHTML = reportHTML;
}
```

## Option 3: Zapier Integration (If Pipedrive automation not enough)

1. **Trigger:** New Deal in Pipedrive
2. **Filter:** Lead Source = ROI Calculator
3. **Action 1:** Create PDF (using Documint or PDFMonkey)
4. **Action 2:** Send Email (using Gmail or SendGrid)
5. **Action 3:** Upload PDF to Deal

**Cost:** $20/month for Zapier starter

---

# RECOMMENDED IMPLEMENTATION

**Today (20 min):**
1. ✅ Set up email template in Pipedrive
2. ✅ Create automation workflow
3. ✅ Test with real form submission

**Tomorrow (optional):**
- Add PDF attachment using Zapier
- Create dedicated landing page for report
- Set up A/B testing for email subject lines

**This Week:**
- Monitor open rates
- Track consultation bookings
- Optimize follow-up timing

---

# TRACKING SUCCESS

**Metrics to Watch:**
- Email open rate (target: >40%)
- Link click rate (target: >15%)
- Reply rate (target: >5%)
- Consultation booking rate (target: >10%)

**In Pipedrive Reports:**
- Create report: "ROI Calculator Leads"
- Filter: Lead Source = "ROI Calculator"
- Track: Created → Report Sent → Consultation → Won

---

# TROUBLESHOOTING

**Email not sending?**
- Check automation is "Active"
- Verify email template has all fields
- Check deal has contact email

**Wrong data in email?**
- Verify custom field IDs match
- Check calculator stores data correctly
- Test with console.log in browser

**Low open rates?**
- Test subject line: "Your savings report: [Amount] PLN potential"
- Send from personal email, not noreply@
- Follow up with SMS/WhatsApp

---

# THE RESULT

✅ Fully automated report delivery
✅ Professional presentation
✅ Zero manual work
✅ Complete tracking
✅ Costs nothing extra

**Your funnel now:**
1. User calculates ROI
2. Sees their data confirmed
3. Submits simple form
4. Gets professional report in 2 min
5. You get follow-up reminder
6. Deal progresses automatically

This solves your report delivery problem completely! 🎯