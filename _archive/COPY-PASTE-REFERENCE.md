# QUICK COPY-PASTE REFERENCE
**Just copy these two sections into your roi-calculator.qmd file**

---

## SECTION 1: NEW MODAL CODE

**Location:** Replace lines 293-356 in `/resources/roi-calculator.qmd`  
**Find:** `<!-- Lead Capture Modal -->` (around line 293)  
**Replace with:**

```
<!-- Lead Capture Modal with Pipedrive Form -->
::: {#lead-modal style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10000; align-items: center; justify-content: center;"}

::: {.modal-content style="background: white; padding: 40px; border-radius: 12px; max-width: 600px; width: 90%; margin: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); position: relative; max-height: 90vh; overflow-y: auto;"}

<button id="close-modal" style="position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 28px; cursor: pointer; color: var(--bim-medium-gray); line-height: 1; z-index: 10;">&times;</button>

<div class="modal-header" style="margin-bottom: 24px;">
<h2 style="margin: 0 0 12px 0; color: var(--bim-charcoal); font-size: 1.8rem;">Get Your Detailed ROI Report</h2>
<p style="color: var(--bim-medium-gray); margin: 0; font-size: 1rem;">We'll prepare your personalized analysis and email it to you within 5 minutes</p>
</div>

<!-- PIPEDRIVE WEB FORM EMBEDDED HERE -->
<div id="pipedrive-form-container" style="margin: 20px 0;">
<div class="pipedriveWebForms" data-pd-webforms="https://webforms.pipedrive.com/f/6qhf9PqIpqTLYNXaz5B62foo0fklkKq1LMDczVq1eaj9Nho3d2GrDLemXMjywHIJCX">
<script src="https://webforms.pipedrive.com/f/loader"></script>
</div>
</div>

<div class="modal-footer" style="margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--bim-light-gray);">
<p style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--bim-medium-gray); margin: 0;">
<svg style="flex-shrink: 0; color: #28a745;" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
</svg>
<span>Your data is secure and RODO/GDPR compliant. We'll never share your information.</span>
</p>
</div>

:::

:::
```

---

## SECTION 2: CSS CODE

**Location:** Add BEFORE `</style>` tag (at end of file, around line 476)  
**Find:** `</style>` (last line)  
**Add this BEFORE it:**

```css
/* Pipedrive Form Modal Styling */
#pipedrive-form-container {
  min-height: 400px;
}

#pipedrive-form-container iframe {
  border: none !important;
  width: 100% !important;
  min-height: 500px;
}

/* Make modal scrollable on mobile */
@media (max-width: 768px) {
  #lead-modal .modal-content {
    max-height: 95vh;
    overflow-y: auto;
    padding: 20px;
  }
  
  #pipedrive-form-container iframe {
    min-height: 600px;
  }
}

/* Ensure Pipedrive form matches our brand */
.pipedriveWebForms {
  font-family: Inter, sans-serif !important;
}

/* Loading state for form */
#pipedrive-form-container:empty::before {
  content: "Loading form...";
  display: block;
  text-align: center;
  padding: 40px;
  color: var(--bim-medium-gray);
  font-size: 1.1rem;
}
```

---

## DONE! NOW RUN:

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render
open docs/resources/roi-calculator.html
```
