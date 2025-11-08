# New Industry Pages - November 2024

## Summary
Created three new English-only industry pages following the established pattern from existing pages (commercial-development.qmd and data-centers.qmd).

## Files Created
1. `/industries/healthcare-medical.qmd` - Healthcare & Medical Facilities
2. `/industries/industrial-manufacturing.qmd` - Industrial & Manufacturing
3. `/industries/infrastructure-civil.qmd` - Infrastructure & Civil Works

## Key Features Applied

### Pattern Adherence
- ✅ Followed exact structure from existing industry pages
- ✅ NO mention of "RICS Certified" 
- ✅ NO mention of specific number of projects
- ✅ Used generic phrases like "Comprehensive experience", "Major projects delivered", "Extensive expertise"

### Content Structure (All Pages)
1. Hero section with video background
2. Industry challenges vs. BIM Takeoff solution (2-column layout)
3. Industry-specific services (6-card grid)
4. Project types (3 complexity levels)
5. Cost breakdown analysis (detailed per sqm/linear meter)
6. Estimation process (6 steps)
7. Why Choose section (6 benefits)
8. FAQs (8-9 questions)
9. CTA section with contact options

### Healthcare & Medical Facilities
**Focus:** HTM compliance, medical gas systems, infection control, clinical engineering
**Cost Range:** £2,800-8,270/sqm depending on facility type
**Timeline:** 5-10 days
**Accuracy:** ±3-5%
**Key Differentiators:**
- Medical gas systems expertise
- HTM (Health Technical Memoranda) compliance
- Infection control HVAC
- 24/7 operational requirements

### Industrial & Manufacturing
**Focus:** Heavy loads, process utilities, material handling, production flow
**Cost Range:** £1,200-4,500/sqm depending on facility type
**Timeline:** 5-10 days
**Accuracy:** ±3-5%
**Key Differentiators:**
- Heavy structural load analysis (500-1,000+ kg/sqm)
- Overhead crane systems (5-50 tonne)
- Process utilities (compressed air, process water)
- Production integration planning

### Infrastructure & Civil Works
**Focus:** Roads, bridges, utilities, earthworks, civil engineering
**Cost Range:** £800-8,000+ per linear meter
**Timeline:** 7-12 days (longer due to complexity)
**Accuracy:** ±5-8% (higher uncertainty due to ground conditions)
**Key Differentiators:**
- Earthworks optimization (cut/fill balance)
- Mass haul analysis
- Linear project expertise
- Multi-discipline coordination (civil, structural, utilities)
- Risk-based contingencies for ground conditions

## Brand Consistency
All pages maintain BIM Takeoff brand identity:
- Orange (#FF9900) accent color
- Charcoal (#2C2C2C) dark backgrounds
- Professional tone emphasizing speed, accuracy, expertise
- UK, EU & Australian market focus
- 5D BIM technology emphasis

## Navigation Integration
Pages ready for integration into main navigation menu. Consider adding to:
- Main site navigation under "Industries" dropdown
- Homepage industry showcase section
- Services pages cross-references

## Navigation Integration
✅ **COMPLETED** - Pages added to main navigation menu (_quarto.yml)
- Healthcare & Medical Facilities -> industries/healthcare-medical.qmd
- Industrial & Manufacturing -> industries/industrial-manufacturing.qmd
- Infrastructure & Civil Works -> industries/infrastructure-civil.qmd

## Next Steps
1. ✅ Add pages to main navigation menu (_quarto.yml) - DONE
2. Test all internal links
3. Render and deploy site
4. Update sitemap if automated
5. Consider creating corresponding service landing pages if needed

## Deployment Instructions

To deploy these changes to your website:

```bash
# Navigate to website directory
cd /Users/robertkowalski/Documents/bimtakeoff-website

# Render the site (generates /docs folder)
quarto render

# Review changes locally
# Open docs/index.html in browser to test

# Commit and push to GitHub
git add .
git commit -m "Add Healthcare, Industrial, and Infrastructure industry pages"
git push origin main

# GitHub Pages will automatically deploy from /docs folder
```

Alternatively, use the deployment script:

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
./deploy.sh
```

## Notes
- All pages are English-only (no Polish versions created)
- Cost ranges are indicative and include appropriate disclaimers
- Timeline estimates reflect industry-specific complexity
- FAQs address common client concerns specific to each sector
- CTA sections include multiple contact options (phone, email, form)

---
Created: November 2024
Pattern Source: commercial-development.qmd, data-centers.qmd
