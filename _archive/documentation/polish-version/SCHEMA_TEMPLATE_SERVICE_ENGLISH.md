# SERVICE SCHEMA TEMPLATE - ENGLISH

This template shows how to add Service schema to your service pages.
Copy the frontmatter section into your .qmd service files.

## Example: Cost Estimation Service Page

```yaml
---
title: "BIM 5D Cost Estimation Services | BIM Takeoff"
description: "Professional BIM 5D cost estimation for construction projects. Accurate takeoffs, budget planning, and cost control. 20+ years experience in UK, Australia, and Poland."
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "BIM 5D Cost Estimation",
          "provider": {
            "@type": "ProfessionalService",
            "name": "BIM Takeoff",
            "url": "https://robertkowalski1974.github.io/bimtakeoff-website",
            "telephone": "+44-20-3239-9967",
            "email": "info@bimtakeoff.com"
          },
          "areaServed": [
            {
              "@type": "Country",
              "name": "United Kingdom"
            },
            {
              "@type": "Country",
              "name": "Australia"
            },
            {
              "@type": "Country",
              "name": "Poland"
            }
          ],
          "description": "Professional BIM 5D cost estimation services for construction projects. We provide accurate quantity takeoffs, budget planning, and real-time cost control using Building Information Modeling technology.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceRange": "$$"
          },
          "category": "Construction Cost Consulting",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "BIM Cost Estimation Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Quantity Takeoff from BIM Models",
                  "description": "Automated extraction of quantities from 3D BIM models"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Budget Planning & Cost Estimation",
                  "description": "Detailed cost estimates and budget preparation"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Real-Time Cost Control",
                  "description": "Live cost tracking throughout project lifecycle"
                }
              }
            ]
          }
        }
        </script>
---

# Your service page content goes here...
```

## Template for Different Services

### Quantity Surveying Service

```yaml
---
title: "Professional Quantity Surveying Services | BIM Takeoff"
description: "Expert quantity surveying services for construction projects. RICS-compliant cost management, contract administration, and value engineering."
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Quantity Surveying",
          "provider": {
            "@type": "ProfessionalService",
            "name": "BIM Takeoff",
            "url": "https://robertkowalski1974.github.io/bimtakeoff-website"
          },
          "areaServed": ["GB", "AU", "PL"],
          "description": "Professional quantity surveying services including cost planning, contract administration, and value engineering for construction projects.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }
        </script>
---
```

### BIM Coordination Service

```yaml
---
title: "BIM Coordination Services | BIM Takeoff"
description: "Professional BIM coordination and clash detection services. Ensure design integrity and reduce on-site conflicts with expert BIM management."
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "BIM Coordination",
          "provider": {
            "@type": "ProfessionalService",
            "name": "BIM Takeoff"
          },
          "description": "BIM coordination, clash detection, and model management services to ensure project success.",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock"
          }
        }
        </script>
---
```

## How to Use This Template

1. **Copy the frontmatter** (everything between `---` markers)
2. **Paste at the top** of your service .qmd file
3. **Customize:**
   - `title`: Your service name + " | BIM Takeoff"
   - `description`: 150-160 characters, include primary keyword
   - `serviceType`: Specific service name
   - `description` (in JSON): Detailed service description
   - `itemListElement`: List of specific offerings (optional)

4. **Keep URLs updated:**
   - Use full URLs: `https://robertkowalski1974.github.io/bimtakeoff-website/`
   - Update when migrating to custom domain

## SEO Best Practices

### Title Tag (50-60 characters)
- Format: "[Service Name] | BIM Takeoff"
- Example: "BIM 5D Cost Estimation | BIM Takeoff"
- Include primary keyword at start

### Meta Description (150-160 characters)
- Include primary keyword
- Add location if relevant
- Include call-to-action
- Example: "Professional BIM 5D cost estimation for construction projects in UK, Australia, and Poland. Get accurate takeoffs and budget planning. Contact us today."

### Service Type Keywords
Choose the most specific, searchable term:
- ✅ "BIM 5D Cost Estimation" (specific, searchable)
- ✅ "Quantity Surveying" (professional term)
- ❌ "Services" (too generic)
- ❌ "Cost Stuff" (unprofessional)

## Testing

After adding schema to a service page:

1. **Render the site:**
   ```bash
   quarto render
   ```

2. **Test with Google:**
   - https://search.google.com/test/rich-results
   - Paste your service page URL
   - Should detect Service schema

3. **Validate JSON-LD:**
   - https://validator.schema.org/
   - Paste your service page URL
   - Should show no errors

## Examples of Good Service Descriptions

### For BIM 5D Cost Estimation:
"Professional BIM 5D cost estimation services combining 3D modeling with real-time cost and schedule data. We extract accurate quantities, create detailed cost estimates, and provide ongoing cost control throughout your construction project lifecycle."

### For Quantity Surveying:
"Comprehensive quantity surveying services from pre-contract cost planning through to final account settlement. RICS-compliant cost management, contract administration, and value engineering for construction projects of all scales."

### For Automated Takeoff:
"Automated quantity takeoff from BIM models and 2D drawings. Fast, accurate measurements extracted using advanced software, reducing manual errors and saving up to 80% of time compared to traditional methods."

## Polish Translation Note

For Polish service pages, use the Polish schema template in:
`SCHEMA_TEMPLATE_SERVICE_POLISH.md`

---

**Created:** 2025-11-01  
**For:** BIM Takeoff Bilingual Website  
**Phase:** 1, Priority 2
