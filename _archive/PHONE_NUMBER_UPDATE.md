# Polish Phone Number Update - October 2025

## What Was Changed

Updated the Polish footer phone number from UK to Polish contact:
- **Old**: +44 (0) 20 3239 9967 (UK)
- **New**: +48 508 209 313 (Poland)

## Files Modified

### 1. `_navbar-translation-enhanced.html`
- Added phone number translation to the `translations` dictionary
- Enhanced `translateFooter()` function to specifically handle `<a href="tel:...">` links
- Now translates both the visible phone number text AND the tel: link href

### Changes Made:
```javascript
// Added to translations dictionary:
'+44 (0) 20 3239 9967': '+48 508 209 313'

// Enhanced translateFooter() function:
// - Specifically handles tel: links
// - Updates both text content and href attribute
// - Ensures clickable phone numbers work correctly
```

## How It Works

When a user visits Polish pages (`/pl/`):

1. Script detects Polish page by URL path
2. Finds all phone links: `<a href="tel:+442032399967">+44 (0) 20 3239 9967</a>`
3. Translates visible text: `+44 (0) 20 3239 9967` → `+48 508 209 313`
4. Updates href attribute: `tel:+442032399967` → `tel:+48508209313`
5. Phone link now correctly dials Polish number when clicked

## Testing

To test the update:

```bash
# 1. Render the site
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render

# 2. Start preview
quarto preview

# 3. In browser:
#    - Navigate to English page (/)
#    - Click "PL" button
#    - Scroll to footer
#    - Verify phone shows: +48 508 209 313
#    - Click phone link to verify it dials correct number
```

## Verification Checklist

- [ ] Polish page footer shows: **+48 508 209 313**
- [ ] English page footer still shows: **+44 (0) 20 3239 9967**
- [ ] Phone link is clickable on Polish page
- [ ] Clicking phone link attempts to dial: +48508209313
- [ ] No JavaScript errors in console (F12)
- [ ] Console shows: `[BilingualNav] Translated phone link: ...`

## Browser Console Check

When on a Polish page (with localhost/debug mode), console should show:

```
[BilingualNav] Translating footer...
[BilingualNav] Translated phone link: "+44 (0) 20 3239 9967" -> "+48 508 209 313"
```

## Deployment

Once tested locally and verified:

```bash
git add _navbar-translation-enhanced.html
git commit -m "Update Polish footer phone number to +48 508 209 313"
git push origin main
```

The change will be live at:
https://robertkowalski1974.github.io/bimtakeoff-website/pl/

## Technical Details

### Phone Link Translation Logic

```javascript
// Find all tel: links in footer
const phoneLinks = footer.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link => {
    const text = link.textContent.trim();
    if (translations[text]) {
        // Update visible text
        link.textContent = translations[text];
        
        // Update href (remove spaces for tel: protocol)
        const newHref = 'tel:' + translations[text].replace(/\s/g, '');
        link.setAttribute('href', newHref);
    }
});
```

### Why Enhance translateFooter()?

The previous version only translated text nodes, which would update the visible phone number but leave the `href="tel:..."` attribute with the old UK number. The enhanced version:

1. **Specifically targets phone links** before general text translation
2. **Updates both text and href** to ensure functionality
3. **Removes spaces from tel: href** (tel:+48508209313 works better than tel:+48 508 209 313)

## Notes

- Polish `pl/_quarto.yml` already had the correct phone number in its footer configuration
- However, since we use root `_quarto.yml` for all pages with `quarto preview`, the JavaScript translation is necessary
- The enhancement ensures both display and functionality are correct

---

**Date**: October 25, 2025  
**Change Type**: Phone number localization  
**Status**: ✅ Complete - Ready for Testing
