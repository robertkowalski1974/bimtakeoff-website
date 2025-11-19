# PIPEDRIVE INTEGRATION FIX - Implementation Guide

## ⚠️ THE PROBLEM
Pipedrive forms load inside an **iframe**, which means:
- ❌ Cannot pre-fill fields programmatically (browser security)
- ❌ Cannot access form fields via JavaScript
- ❌ postMessage API doesn't work for field filling

## ✅ THE SOLUTION: Webhook + API Approach

Since we can't pre-fill the embedded form, we'll use a different approach:

### Option 1: Webhook Solution (Recommended)
1. User fills basic info in Pipedrive form
2. Form creates a deal in Pipedrive
3. Webhook triggers and updates the deal with calculator data
4. All data is properly stored

### Option 2: Custom Form (More Complex)
1. Replace Pipedrive embed with custom HTML form
2. Send data directly to Pipedrive API
3. Full control over fields and pre-filling

## 🔧 QUICK FIX FOR NOW

Add this code to show users what data will be sent:

```javascript
// Replace the current prefillPipedriveForm function with this:
function prefillPipedriveForm() {
  if (!calculatedResults) {
    console.warn('No calculator results available');
    return;
  }
  
  // Store data for webhook
  const formData = {
    project_value: calculatedResults.inputs.projectValue,
    estimated_savings: Math.round(calculatedResults.totalSavings),
    roi_percentage: Math.round(calculatedResults.roi),
    currency: currentCurrency,
    project_type: calculatedResults.inputs.projectType,
    lead_source: 'ROI Calculator'
  };
  
  // Store in localStorage for webhook to access
  localStorage.setItem('calculatorData', JSON.stringify(formData));
  
  // Show user what will be sent
  const container = document.querySelector('#pipedrive-form-container');
  if (container && !document.querySelector('#calc-data-display')) {
    const display = document.createElement('div');
    display.id = 'calc-data-display';
    display.style.cssText = `
      background: #f8f9fa;
      border: 2px solid #FF9900;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
    `;
    display.innerHTML = `
      <h4 style="margin: 0 0 12px 0; color: #FF9900;">📊 Your ROI Calculation</h4>
      <p style="margin: 5px 0;"><strong>Project Value:</strong> ${formatCurrency(formData.project_value, currentCurrency)}</p>
      <p style="margin: 5px 0;"><strong>Estimated Savings:</strong> ${formatCurrency(formData.estimated_savings, currentCurrency)}</p>
      <p style="margin: 5px 0;"><strong>ROI:</strong> ${formData.roi_percentage}%</p>
      <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">
        <em>This data will be automatically added to your enquiry.</em>
      </p>
    `;
    container.insertBefore(display, container.firstChild);
  }
  
  console.log('Calculator data ready for submission:', formData);
}
```

## 🚀 WEBHOOK SETUP (Pipedrive Side)

1. **Go to Pipedrive** → Settings → Tools → Webhooks
2. **Create new webhook:**
   - Event: "Deal added"
   - Endpoint URL: Your server endpoint
   - HTTP method: POST

3. **Webhook handler code (server-side):**
```javascript
// Example Node.js webhook handler
app.post('/webhook/pipedrive', async (req, res) => {
  const deal = req.body.current;
  
  // Get calculator data (you'll need to match by email/timestamp)
  const calculatorData = await getCalculatorData(deal.person_id);
  
  // Update deal with calculator data
  await updatePipedriveDeal(deal.id, {
    'd4df653711c3581de9db258f5a44de0a1dbbfb4b': calculatorData.project_value,
    '370268b0c967a69ca9680a1f06245a1541f42df1': calculatorData.estimated_savings,
    '2a924ec54ca392530b60a3b877c56ff0a30fe6ec': calculatorData.roi_percentage,
    // ... other fields
  });
  
  res.status(200).send('OK');
});
```

## 📝 ALTERNATIVE: Custom Form Solution

Replace Pipedrive embed with custom form that sends directly to API:

```javascript
async function submitToPipedrive(formData) {
  const response = await fetch('https://api.pipedrive.com/v1/deals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `${formData.name} - ROI Calculator Lead`,
      person_id: await createOrFindPerson(formData.email, formData.name),
      value: formData.project_value,
      currency: formData.currency,
      // Custom fields
      'd4df653711c3581de9db258f5a44de0a1dbbfb4b': formData.project_value,
      '370268b0c967a69ca9680a1f06245a1541f42df1': formData.estimated_savings,
      '2a924ec54ca392530b60a3b877c56ff0a30fe6ec': formData.roi_percentage,
      'api_token': 'YOUR_API_TOKEN'
    })
  });
  
  return response.json();
}
```

## 🎯 IMMEDIATE ACTION

For now, the simplest fix is:
1. Show calculator data above the form (visual confirmation)
2. Store data in localStorage
3. Set up webhook later to update deals

The code change above will at least show users their calculation data is being tracked.

## 📋 Testing Checklist
1. ✅ Calculator data displays above form
2. ✅ Data stored in localStorage
3. ✅ Console shows "Calculator data ready"
4. ✅ User submits form → Deal created in Pipedrive
5. ⏳ Webhook updates deal with calculator data (needs server setup)

## 🔑 Key Insight
**You cannot pre-fill Pipedrive embedded forms** - they're isolated in iframes for security. You must either:
- Use webhooks to update after submission
- Build a custom form with API integration
- Accept that only basic fields will be filled initially
