# Google Tag Manager - Installation Verification

**Date:** October 25, 2025  
**GTM Container ID:** GTM-PLB9BH8W

## ✅ Installation Status: VERIFIED

### 1. Head Section (Script)
**Location:** `_quarto.yml` → `include-in-header`

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PLB9BH8W');</script>
<!-- End Google Tag Manager -->
```

✅ **Correct** - JavaScript tag loads in `<head>`

### 2. Body Section (Noscript)
**Location:** `_quarto.yml` → `include-after-body`

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PLB9BH8W"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

✅ **Correct** - Fallback iframe loads in `<body>`

## What GTM Will Track

Once deployed, your GTM container can track:
- ✅ Page views
- ✅ Button clicks (CTAs)
- ✅ Link clicks
- ✅ Form submissions
- ✅ Scroll depth
- ✅ Video engagement
- ✅ Custom events (configured in GTM dashboard)

## Next Step: Deploy to GitHub Pages

Your Google Tag Manager is ready. Now let's deploy your website!
