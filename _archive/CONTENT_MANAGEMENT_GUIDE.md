# Content Management Guide

**Created:** October 25, 2025  
**Purpose:** Easier homepage content management

## Overview

I've extracted all your homepage text content into a separate markdown file for easy editing. This makes content management much simpler - you can focus on the words without worrying about the code structure.

## Content File Location

```
/Users/robertkowalski/Documents/bimtakeoff-website/content/homepage-content.md
```

## How to Update Content

### ✅ EASY WAY: Edit the Content File

1. **Open the content file:**
   ```bash
   open /Users/robertkowalski/Documents/bimtakeoff-website/content/homepage-content.md
   ```

2. **Edit any text** you want to change:
   - Hero title and subtitle
   - Service descriptions
   - Industry expertise details
   - FAQ answers
   - Contact information
   - Any other text content

3. **Copy updated sections** to `index.qmd` when ready

### Example Workflow

**Scenario:** You want to update the hero subtitle

1. Open `content/homepage-content.md`
2. Find the "Hero Section" → "Subtitle"
3. Edit the text:
   ```markdown
   ### Subtitle
   NEW TEXT HERE: From Panattoni UK to Polish Market...
   ```
4. Save the file
5. Copy the new text to `index.qmd` in the appropriate location
6. Rebuild: `quarto render`

## Content File Structure

The content file is organized by page sections:

```
# Homepage Content
├── Hero Section (title, subtitle)
├── Why Choose Section
├── Stats Section
├── Services Section
├── Specialized Industry Expertise
├── Trust Section
├── Process Section
├── Pilot Project Callout
├── Portfolio Section
├── FAQ Section
└── Final CTA Section
```

Each section has clear headings so you can easily find what you need to edit.

## Benefits of This Approach

✅ **Easier to read** - No HTML or Quarto syntax in the content file  
✅ **Easier to edit** - Focus on words, not code  
✅ **Version control** - Track content changes separately  
✅ **Collaboration** - Non-technical team members can edit content  
✅ **Backup** - Single source of truth for all homepage text  
✅ **Reusability** - Same content can be used for other materials  

## Advanced: Automatic Content Include (Optional)

If you want Quarto to automatically pull content from the MD file, you can use includes. However, this requires restructuring. For now, the manual copy-paste approach is simpler and gives you more control.

### Future Enhancement Option

In the future, you could:
1. Split content into smaller include files (hero.md, services.md, etc.)
2. Use Quarto's `{{< include >}}` syntax
3. Have fully modular content management

Let me know if you want to set this up!

## Content Translation Workflow

Since you have Polish (PL) and English (EN) versions, you can create:

```
/content/
├── homepage-content-EN.md  (English version)
└── homepage-content-PL.md  (Polish version)
```

This makes it easy to:
1. Keep both language versions synchronized
2. See differences between EN and PL content
3. Manage translations

## Quick Reference

### To Update Content:
1. Edit `/content/homepage-content.md`
2. Copy changes to `index.qmd`
3. Run `quarto render`

### To Add New Section:
1. Add section to `homepage-content.md`
2. Copy structure to `index.qmd`
3. Add CSS styling if needed

### To View Content:
```bash
cat /Users/robertkowalski/Documents/bimtakeoff-website/content/homepage-content.md
```

### To Edit Content:
```bash
# Use your favorite editor:
open /Users/robertkowalski/Documents/bimtakeoff-website/content/homepage-content.md

# Or use VS Code:
code /Users/robertkowalski/Documents/bimtakeoff-website/content/homepage-content.md

# Or use nano:
nano /Users/robertkowalski/Documents/bimtakeoff-website/content/homepage-content.md
```

## Tips for Content Editing

### ✅ DO:
- Keep text clear and concise
- Use **bold** for emphasis
- Update contact information regularly
- Keep stats current (project numbers, years of experience)
- Test all changes by rebuilding the site

### ❌ DON'T:
- Add HTML code to the content file (keep it clean)
- Delete section headers (they help you navigate)
- Forget to update both EN and PL versions
- Make changes directly to `index.qmd` without updating the content file

## Content Backup

Since this file contains all your homepage text:

1. **Backup regularly:**
   ```bash
   cp content/homepage-content.md content/homepage-content-backup-$(date +%Y%m%d).md
   ```

2. **Version control with git:**
   ```bash
   git add content/homepage-content.md
   git commit -m "Updated homepage content"
   ```

## Current Status

✅ **Content extracted** - All homepage text in separate file  
✅ **Organized by section** - Easy to navigate  
✅ **Ready to edit** - No code syntax to worry about  
📝 **Manual sync** - Copy changes from content file to index.qmd  
🔮 **Future** - Can automate with includes if needed  

---

**Bottom Line:** Edit `/content/homepage-content.md` whenever you need to change text. It's your single source of truth for homepage content!
