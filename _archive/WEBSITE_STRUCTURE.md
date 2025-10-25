# BILINGUAL WEBSITE STRUCTURE

```
bimtakeoff-website/
│
├── _quarto.yml                          # Main config (English navbar/footer)
│   └── Uses: _navbar-translation-enhanced.html for Polish translation
│
├── _navbar-translation-enhanced.html    # ✨ NEW: Enhanced translation script
│   ├── Detects Polish pages (/pl/)
│   ├── Translates navbar items
│   ├── Translates footer text
│   └── Debug mode for development
│
├── index.qmd                            # English homepage
├── coming-soon.qmd                      # English pages
│
├── pl/                                  # Polish content directory
│   ├── _quarto.yml                      # Polish config (for reference only)
│   ├── index.qmd                        # Polish homepage
│   └── coming-soon.qmd                  # Polish pages
│
├── docs/                                # Generated output
│   ├── index.html                       # English pages
│   └── pl/
│       └── index.html                   # Polish pages (with translation script)
│
├── test-bilingual.sh                    # ✨ NEW: Automated test script
├── BILINGUAL_FIX_COMPLETE.md           # ✨ NEW: Full documentation
├── IMPLEMENTATION_SUMMARY.md            # ✨ NEW: Quick summary
└── quick-reference.sh                   # ✨ NEW: Command reference
```

## How It Works

```
User navigates to /pl/
         ↓
Enhanced script loads (_navbar-translation-enhanced.html)
         ↓
Detects path contains '/pl/'
         ↓
Applies translations from dictionary
         ↓
Navbar: "Home" → "Strona Główna"
Footer: "All rights reserved" → "Wszelkie prawa zastrzeżone"
         ↓
MutationObserver watches for changes
         ↓
Polish page displays correctly! ✅
```

## Translation Flow

```
Page Load
    ↓
┌─────────────────────┐
│ Is Polish page?     │
│ (path contains /pl/)│
└──────┬──────────────┘
       │
    Yes│
       ↓
┌─────────────────────────────┐
│ Translate Elements:         │
│ • .menu-text items          │
│ • .dropdown-text items      │
│ • Footer text nodes         │
└──────┬──────────────────────┘
       │
       ↓
┌─────────────────────────────┐
│ Set document.lang = 'pl'    │
└──────┬──────────────────────┘
       │
       ↓
┌─────────────────────────────┐
│ Watch for DOM changes       │
│ (MutationObserver)          │
└─────────────────────────────┘
```

## Key Features

✅ **Single Configuration**: Root _quarto.yml for all pages
✅ **Client-Side Translation**: JavaScript handles Polish navbar/footer
✅ **Works with Preview**: quarto preview from root directory
✅ **Debug Mode**: Console logging on localhost
✅ **Auto-Detection**: Detects Polish pages by URL path
✅ **Dynamic Content**: MutationObserver handles updates

## Testing Workflow

```
1. Run test-bilingual.sh
   ↓
2. Cleans old builds
   ↓
3. Renders entire site (quarto render)
   ↓
4. Verifies Polish files exist
   ↓
5. Checks script inclusion
   ↓
6. Provides test instructions
   ↓
7. Start: quarto preview
   ↓
8. Test in browser
   ↓
9. Deploy to GitHub if OK
```
