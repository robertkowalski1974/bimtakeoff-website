# Encoding Fix - Publications UTF-8 Issue
## Date: 2025-11-16 (Fix)

### Problem Identified

User reported seeing strange diamond characters with question marks (�) on publications page:
- Date emoji appeared as: ��� instead of 📅
- Time emoji appeared as: ‚è±Ô∏è instead of ⏱️
- Pound symbol potentially affected

### Root Cause

UTF-8 encoding issue when creating files via AppleScript. Emoji characters and special symbols were not properly encoded in the initial file creation.

### Solution Applied

1. **index.qmd - Removed emoji, used plain text**
   - Changed from: "üìÖ November 16, 2025 | ‚è±Ô∏è 15 min read"
   - Changed to: "November 16, 2025 | 15 min read"
   - Used HTML entity &pound; for pound symbols
   - Saved with explicit UTF-8 encoding: `as «class utf8»`

2. **ai-replace-quantity-surveyors.qmd - Updated pound symbols**
   - Replaced all 7 instances of £ with HTML entity &pound;
   - Ensured proper UTF-8 encoding
   - No emoji were used in this file, so no other changes needed

### Files Modified

1. `/resources/publications/index.qmd` - FIXED
2. `/resources/publications/ai-replace-quantity-surveyors.qmd` - UPDATED

### Technical Details

**AppleScript Encoding:**
- Used `as «class utf8»` in write command
- This ensures proper UTF-8 encoding when writing files
- Syntax: `write theContent to fileRef starting at eof as «class utf8»`

**HTML Entities Used:**
- `&pound;` for £ symbol (ensures cross-platform compatibility)
- Removed emoji entirely to avoid encoding issues
- Plain text is more reliable than emoji for metadata

### Testing Recommendations

1. Refresh browser (Cmd+Shift+R for hard refresh)
2. Check http://localhost:7321/resources/publications/
3. Verify all special characters display correctly
4. Check both publication cards show proper formatting

### Lessons Learned

- Avoid emoji in content when using AppleScript file creation
- Always use `as «class utf8»` when writing text files with AppleScript
- HTML entities are more reliable than direct special characters
- Keep metadata simple and text-based for better compatibility

### Prevention for Future

When creating .qmd files via AppleScript:
1. Always specify `as «class utf8»` encoding
2. Use HTML entities for special characters (&pound;, &euro;, &copy;, etc.)
3. Avoid emoji in metadata (dates, titles, descriptions)
4. Test immediately after creation on localhost