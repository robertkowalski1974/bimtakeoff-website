# LinkedIn Conversion Tracking Implementation
**Date:** November 2025
**Conversion ID:** 24859401
**Partner ID:** 8743217

## Changes Made

### 1. Polish Contact Page (/pl/kontakt.qmd)
Added LinkedIn conversion tracking to all contact links:
- Phone number: +48 508 209 313
- Email: info@bimtakeoff.com
- Both in contact cards and CTA buttons

### 2. JavaScript Tracking File (/js/linkedin-tracking.js)
Created universal tracking script that:
- Automatically adds tracking to all email links (info@bimtakeoff.com)
- Tracks Polish phone clicks (+48 508 209 313)
- Tracks UK phone clicks (+44 20 3239 9967) in footer
- Works across entire website including footer

### 3. Configuration Update (_quarto.yml)
Added linkedin-tracking.js to website configuration for automatic loading on all pages

## How It Works
When visitors click any phone or email link:
1. LinkedIn tracks the conversion with ID 24859401
2. This data appears in LinkedIn Campaign Manager
3. LinkedIn optimizes ads for people likely to click contact links

## Testing
To verify tracking works:
1. Click any phone/email link on the website
2. Check LinkedIn Campaign Manager after 20-30 minutes
3. Conversions should appear in your campaign reports

## Files Modified
- /pl/kontakt.qmd - Added onclick tracking
- /js/linkedin-tracking.js - New tracking script
- /_quarto.yml - Included tracking script

## Original Files Backed Up To:
- _archive/kontakt_original_[timestamp].qmd
- _archive/_quarto_backup_[timestamp].yml

## LinkedIn Campaign Setup
- Audience: 5,500 Polish construction decision-makers
- Budget: £24/day for 10 days
- Conversion Type: Event-specific (Manual setup)
- Tracking Method: Phone and email clicks
