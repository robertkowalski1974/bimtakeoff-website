# Content Management Setup - Summary

**Date:** October 25, 2025  
**Status:** ✅ Content extracted to separate MD files

## What I've Created

### 1. Content Directory
```
/Users/robertkowalski/Documents/bimtakeoff-website/content/
```

### 2. Homepage Content File (English)
```
/Users/robertkowalski/Documents/bimtakeoff-website/content/homepage-content.md
```

**Contains:**
- All homepage text content extracted from index.qmd
- Organized by section (Hero, Services, FAQ, etc.)
- Clean markdown format - no code or HTML
- Easy to read and edit

### 3. Management Guide
```
/Users/robertkowalski/Documents/bimtakeoff-website/CONTENT_MANAGEMENT_GUIDE.md
```

**Explains:**
- How to edit content
- Workflow for updates
- Tips and best practices
- Future automation options

## How to Use This System

### Step-by-Step Workflow:

1. **Edit content:**
   ```bash
   open content/homepage-content.md
   ```

2. **Make your changes** to any text in the file

3. **Copy updated text** to the corresponding section in `index.qmd`

4. **Rebuild the site:**
   ```bash
   cd /Users/robertkowalski/Documents/bimtakeoff-website
   quarto render
   ```

## Benefits

✅ **Easier editing** - No code syntax to worry about  
✅ **Better organization** - All content in one place  
✅ **Version control** - Track content changes separately  
✅ **Collaboration** - Non-technical people can edit  
✅ **Backup** - Single source of truth for text  

## File Structure

```
bimtakeoff-website/
├── content/
│   └── homepage-content.md         ← Edit this for content changes
├── index.qmd                        ← Copy changes here
├── css/
│   └── styles.css                   ← Styling (don't edit for content)
├── CONTENT_MANAGEMENT_GUIDE.md      ← How-to guide
└── ...
```

## Next Steps - Optional Polish Version

I can also create:
```
/content/homepage-content-PL.md
```

This would contain the Polish translation of all content, making it easy to:
- Keep both languages synchronized
- See what needs translation
- Manage bilingual content

Would you like me to create the Polish content file as well?

## Quick Reference Commands

```bash
# Edit English content
open content/homepage-content.md

# View content
cat content/homepage-content.md

# Rebuild site after changes
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render

# Preview site
quarto preview
```

## Example Edit Flow

**Scenario:** Update company phone number

1. Open `content/homepage-content.md`
2. Find "Contact" section at the bottom
3. Change: `+44 (0) 20 XXXX XXXX` to new number
4. Save file
5. Copy new number to `index.qmd` (search for same number)
6. Run `quarto render`
7. Done! ✅

---

**Bottom Line:** You now have a clean, separate content file that's much easier to manage than editing the QMD file directly!
