# Checklist Dobrego Przetargu - Source Files

**Created:** November 9, 2025  
**Format:** Professional PDF Lead Magnet

## Files in this folder:

### 1. Checklist_Dobrego_Przetargu.qmd
- Quarto document with embedded LaTeX styling
- For use with Quarto PDF rendering: `quarto render Checklist_Dobrego_Przetargu.qmd`
- Requires: Quarto, XeLaTeX, fontawesome5 package

### 2. Checklist_Dobrego_Przetargu.tex
- Standalone LaTeX document
- Compile with: `xelatex Checklist_Dobrego_Przetargu.tex`
- Works without fontawesome5 (uses Unicode symbols instead)

## Design Specifications

### Brand Elements Applied:
- **Colors:**
  - Primary Orange: #FF9900
  - Charcoal: #2C2C2C  
  - Light Gray: #F0F0F0
  - Medium Gray: #757575

- **Typography:**
  - Font: Inter (with DejaVu Sans fallback)
  - Headings: Bold (700) / Semi-bold (600)
  - Body: Regular (400)

- **Layout:**
  - A4 paper
  - 20mm margins all around
  - Custom colored boxes for checklist items
  - Orange header line
  - Professional footer

### Features:
- 10-point professional tender checklist
- Custom styled boxes with orange accent border
- Warning callout box
- CTA box with contact information
- Header and footer branding
- Polish language content

## Usage Notes

The PDF is designed as a lead magnet for the Polish market entry campaign. It should be:
- Hosted on landing pages
- Used in LinkedIn campaigns
- Offered as free download in exchange for contact details
- Distributed to housing cooperatives and developers

## Compilation Requirements

**On Mac with Quarto:**
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website/_archive
quarto render Checklist_Dobrego_Przetargu.qmd
```

**On Linux/Container:**
```bash
xelatex Checklist_Dobrego_Przetargu.tex
```

## Output Location

Compiled PDF should be saved to:
- Website: `/docs/resources/` (for public download)
- Marketing: Use in email campaigns and landing pages
- LinkedIn: Attach to sponsored content campaigns

---
**BIM Takeoff | UK & Australian Excellence in Construction Estimation**
