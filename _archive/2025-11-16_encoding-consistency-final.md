# Encoding Consistency Update - Publications
Date: 2025-11-16 (Final Fix)

ISSUE:
AI article was using HTML entities while rest of site uses direct UTF-8 characters.

ANALYSIS:
- BIM article: Uses direct £ symbol
- Service pages: Use direct ± symbol
- Conclusion: Site standard is direct UTF-8, NOT HTML entities

CHANGES MADE:
1. ai-replace-quantity-surveyors.qmd - Changed entities to direct characters
2. index.qmd - Changed entities to direct characters
3. Both saved with UTF-8 encoding

SITE STANDARD ESTABLISHED:
- Use direct UTF-8 characters: £ ± € 
- Save all .qmd files with UTF-8 encoding
- Avoid HTML entities unless necessary
- Avoid smart quotes/em dashes from Word

TESTING:
1. Hard refresh browser (Cmd+Shift+R)
2. Verify all special characters display correctly
3. Check for encoding artifacts

VERIFICATION COMPLETE:
- AI article matches site encoding
- Publications index matches site encoding  
- Consistency across entire website achieved