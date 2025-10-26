# Polish Service Page Navbar Translation Fix - October 26, 2025

## Problem
The Polish service page at `/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html` displayed the navbar in English instead of Polish. The main Polish index page (`/pl/index.qmd`) had the translation script, but the service page was missing it.

## Root Cause
The translation script that converts the navbar from English to Polish was only included in the main Polish index page's YAML frontmatter. Service pages in the `/pl/uslugi/` directory didn't have this script, so they showed the default English navbar from the global Quarto configuration.

## Solution
Added the complete Polish navbar translation script to the YAML frontmatter of the service page.

## Changes Made

### File Modified
`/Users/robertkowalski/Documents/bimtakeoff-website/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.qmd`

### Added Section
Added `format.html.include-in-header` section with the translation script that:
1. **Translates navbar text** from English to Polish (e.g., "Home" → "Strona Główna", "Services" → "Usługi")
2. **Updates phone numbers** from UK (+44) to Polish (+48) numbers
3. **Fixes navigation links** to point to Polish versions of pages
4. **Sets language attribute** to 'pl' for proper HTML semantics

## Translation Script Features
- Translates all menu items (Home, Services, Industries, etc.)
- Translates dropdown menu items (all service names, industry names, resource links)
- Updates phone number links and display text
- Corrects relative links for the `/pl/uslugi/` subdirectory structure
- Runs on page load and with a 100ms delay for dynamic content

## Testing
1. Stop Quarto preview (Ctrl+C)
2. Run: `quarto preview`
3. Navigate to: http://localhost:4083/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.html
4. Verify navbar shows Polish text:
   - ✅ "Strona Główna" instead of "Home"
   - ✅ "Usługi" instead of "Services"
   - ✅ "Branże" instead of "Industries"
   - ✅ All dropdown items in Polish
   - ✅ Phone number shows +48 508 209 313

## Future Service Pages
Any new service pages created in `/pl/uslugi/` will need the same translation script added to their YAML frontmatter. Consider:
1. Creating a template file for Polish service pages
2. Using Quarto's `_metadata.yml` in the `/pl/uslugi/` directory to apply this globally
3. Documenting the requirement in a development guide

## Related Files
- `/pl/index.qmd` - Main Polish page with translation script (reference)
- `/pl/uslugi/kosztorysowanie-i-planowanie-budzetu.qmd` - Fixed service page
- `/_quarto.yml` - Global configuration with English navbar

## Status
✅ **FIXED** - Polish service page now displays Polish navbar correctly
