# FAQPAGE SCHEMA TEMPLATE - ENGLISH

This template shows how to add FAQPage schema to case studies and project pages.
FAQPage schema helps your pages appear in Google's rich results with expandable Q&A sections.

## Why Use FAQPage Schema for Case Studies?

Case studies naturally contain questions and answers:
- "What was the project scope?"
- "What challenges were faced?"
- "What were the results?"
- "How much time/money was saved?"

Google loves this structured format and can display it prominently in search results!

## Example: Case Study with FAQPage Schema

```yaml
---
title: "Case Study: £2.5M Warehouse Cost Optimization | BIM Takeoff"
description: "How we saved a logistics company £250K through BIM 5D cost estimation on their 50,000 sq ft warehouse project in Manchester. 8-week delivery, 10% under budget."
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What was the project scope?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A 50,000 square foot logistics warehouse in Manchester with advanced MEP systems, including automated sorting and climate control. The project had a tight 8-week timeline and £2.5M budget."
              }
            },
            {
              "@type": "Question",
              "name": "What challenges did the project face?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The main challenges were: (1) Extremely tight timeline of 8 weeks, (2) Complex MEP coordination with 5 different contractors, (3) Fluctuating material costs during COVID-19 supply chain disruptions, and (4) Need for real-time cost updates to maintain investor confidence."
              }
            },
            {
              "@type": "Question",
              "name": "How did BIM Takeoff help?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We implemented BIM 5D cost estimation providing: automated quantity takeoffs from the 3D model, real-time cost tracking integrated with the project schedule, clash detection saving 3 weeks of rework, and daily cost reports for stakeholders. This resulted in £250,000 savings (10% under budget) and on-time delivery."
              }
            },
            {
              "@type": "Question",
              "name": "What were the measurable results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The project delivered: £250,000 cost savings (10% under budget), 3 weeks saved through clash detection, zero change orders due to accurate preliminary estimates, 100% on-time delivery despite tight schedule, and 95% client satisfaction score."
              }
            },
            {
              "@type": "Question",
              "name": "What technologies were used?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We utilized Autodesk Revit for 3D modeling, Navisworks for clash detection, CostX for quantity takeoff, and custom Excel integrations for real-time cost reporting. All systems were integrated through common data environment (CDE) for seamless collaboration."
              }
            }
          ]
        }
        </script>
---

# Case Study: £2.5M Warehouse Cost Optimization

[Your case study content with the Q&A naturally integrated...]

## Project Overview
A 50,000 square foot logistics warehouse in Manchester...

## The Challenge
The main challenges were...

## Our Solution
We implemented BIM 5D cost estimation...

## Results Achieved
- £250,000 cost savings
- 3 weeks saved
- On-time delivery

```

## Generic FAQPage Template

```yaml
---
title: "[Project Name] Case Study | BIM Takeoff"
description: "How we [achieved result] for [client type] on their [project type]. [Key metric]. [Key benefit]."
format:
  html:
    include-in-header:
      text: |
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Question 1 about the project?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Detailed answer to question 1. Include specific metrics, timelines, and outcomes."
              }
            },
            {
              "@type": "Question",
              "name": "Question 2 about challenges?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Answer explaining the challenges faced and how they were overcome."
              }
            },
            {
              "@type": "Question",
              "name": "Question 3 about results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Answer with measurable results: cost savings, time saved, quality improvements."
              }
            }
          ]
        }
        </script>
---
```

## Best Questions for Case Studies

### Essential Questions (Include at least 3-4):

1. **Project Scope**
   - "What was the project scope?"
   - "What type of building was involved?"
   - "Where was the project located?"

2. **Challenges**
   - "What challenges did the project face?"
   - "What were the main risks?"
   - "What obstacles needed to be overcome?"

3. **Solution**
   - "How did BIM Takeoff help?"
   - "What services were provided?"
   - "What approach was taken?"

4. **Results (CRITICAL - Always include)**
   - "What were the measurable results?"
   - "How much was saved?"
   - "What ROI was achieved?"

5. **Technology (Optional)**
   - "What technologies were used?"
   - "How was BIM implemented?"
   - "What software was utilized?"

6. **Timeline**
   - "How long did the project take?"
   - "Was the project on schedule?"
   - "What was the delivery time?"

## Writing Great Answers

### DO:
✅ Include specific numbers and metrics
✅ Use concrete examples
✅ Explain the "how" not just the "what"
✅ Keep answers 50-200 words
✅ Write in clear, professional language
✅ Include measurable outcomes

### DON'T:
❌ Be vague ("We helped them save money")
❌ Use jargon without explanation
❌ Write essays (keep answers focused)
❌ Forget to quantify results
❌ Make it too promotional

## Example Good vs Bad Answers

### Question: "What were the measurable results?"

**❌ BAD:**
"The project was very successful and the client was happy with our work. We delivered great value."

**✅ GOOD:**
"The project delivered: £250,000 cost savings (10% under budget), 3 weeks saved through clash detection, zero change orders due to accurate preliminary estimates, 100% on-time delivery despite tight schedule, and 95% client satisfaction score."

## SEO Benefits of FAQPage Schema

1. **Rich Results in Google**
   - Expandable Q&A sections in search results
   - Takes up more screen space
   - Higher click-through rates

2. **Voice Search Optimization**
   - Perfect for "how", "what", "why" queries
   - Structured format matches voice searches

3. **Featured Snippets**
   - Increased chance of appearing in position zero
   - Directly answers user questions

4. **Local SEO**
   - "BIM services in Manchester" + your case study = perfect match
   - Location + service + results = SEO gold

## Testing FAQPage Schema

1. **Validate structure:**
   ```bash
   quarto render
   ```

2. **Test with Google:**
   - https://search.google.com/test/rich-results
   - Paste your case study URL
   - Should detect FAQPage schema

3. **Check in Search Console:**
   - After deployment, check Search Console > Enhancements
   - Look for "FAQs" section
   - Monitor impressions and clicks

## Combining with Other Schema Types

You can combine FAQPage with other schema types!

```yaml
---
title: "Case Study Title"
format:
  html:
    include-in-header:
      text: |
        <!-- Service Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "BIM 5D Cost Estimation"
          ...
        }
        </script>
        
        <!-- FAQPage Schema -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [...]
        }
        </script>
---
```

## Content Structure Tips

Integrate the Q&A naturally into your case study:

```markdown
## Project Overview
[Answer to "What was the project scope?"]

## The Challenge
[Answer to "What challenges did the project face?"]

## Our Approach
[Answer to "How did BIM Takeoff help?"]

## Results Achieved
[Answer to "What were the measurable results?"]
```

This way, the schema reflects your actual content, and readers get value from both the structured data and the narrative!

## Polish Version

For Polish case studies, use:
`SCHEMA_TEMPLATE_FAQPAGE_POLISH.md`

---

**Created:** 2025-11-01  
**For:** BIM Takeoff Case Studies  
**Phase:** 1, Priority 2  
**Schema Type:** FAQPage for Rich Results
