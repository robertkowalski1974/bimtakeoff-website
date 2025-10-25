# Making Contact Information Clickable

**Date:** October 25, 2025  
**Status:** ✅ Email addresses now clickable

## What I've Updated

### 1. Footer Email (in `_quarto.yml`)

**Before:**
```
hello@bimtakeoff.com
```

**After:**
```
[hello@bimtakeoff.com](mailto:hello@bimtakeoff.com)
```

### 2. Main Page Email (in `index.qmd`)

**Before:**
```
**Contact:** info@bimtakeoff.com | +44 (0) 20 3239 9967
```

**After:**
```
**Contact:** [info@bimtakeoff.com](mailto:info@bimtakeoff.com) | +44 (0) 20 3239 9967
```

## How It Works

The markdown syntax for clickable links:
```markdown
[Display Text](URL)
```

For email addresses, use the `mailto:` protocol:
```markdown
[email@example.com](mailto:email@example.com)
```

When clicked, this opens the user's default email client with a new message to that address.

## Making Phone Numbers Clickable

You can also make phone numbers clickable using the `tel:` protocol:

**Example:**
```markdown
[+44 (0) 20 3239 9967](tel:+442032399967)
```

**Note:** Remove spaces and parentheses in the `tel:` URL, but keep them in the display text for readability.

### To Update Your Phone Numbers:

**In `_quarto.yml` footer:**
```yaml
right: |
  **Contact**<br>
  [hello@bimtakeoff.com](mailto:hello@bimtakeoff.com)<br>
  [+44 (0) 20 XXXX XXXX](tel:+44020XXXXXXXX)
```

**In `index.qmd` final section:**
```markdown
**Contact:** [info@bimtakeoff.com](mailto:info@bimtakeoff.com) | [+44 (0) 20 3239 9967](tel:+442032399967)
```

## Test It

After rebuilding your site:

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render
```

**Check:**
- ✅ Hover over email - cursor should change to pointer
- ✅ Email text should appear in orange (link color)
- ✅ Click email - opens email client
- ✅ If you add phone links - click opens phone dialer on mobile

## Benefits

### Email Links (`mailto:`)
- ✅ Opens email client automatically
- ✅ Pre-fills recipient address
- ✅ Easier for users to contact you
- ✅ Professional appearance

### Phone Links (`tel:`)
- ✅ Especially useful on mobile devices
- ✅ Click to call directly
- ✅ No need to copy/paste number
- ✅ Better user experience

## Advanced: Pre-fill Email Subject

You can also pre-fill the email subject line:

```markdown
[Contact Us](mailto:info@bimtakeoff.com?subject=Website%20Inquiry)
```

When clicked, opens email with:
- **To:** info@bimtakeoff.com
- **Subject:** Website Inquiry

**URL encoding:**
- Spaces become `%20`
- Multiple parameters separated by `&`

**Example with subject and body:**
```markdown
[Email Us](mailto:info@bimtakeoff.com?subject=Project%20Inquiry&body=Hello%20BIM%20Takeoff,%0A%0AI%20would%20like%20to%20discuss...)
```

## Quick Reference

### Email Link:
```markdown
[email@example.com](mailto:email@example.com)
```

### Phone Link:
```markdown
[+44 20 1234 5678](tel:+442012345678)
```

### Email with Subject:
```markdown
[Contact](mailto:email@example.com?subject=Inquiry)
```

### Multiple Parameters:
```markdown
[Contact](mailto:email@example.com?subject=Inquiry&cc=other@example.com)
```

---

**Current Status:**
- ✅ Footer email: Clickable
- ✅ Main page email: Clickable
- ⏳ Phone numbers: Can be made clickable (optional)

Rebuild your site to see the changes!
