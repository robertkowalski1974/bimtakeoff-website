# Polish Navbar Fix - Complete Solution

## The Problem
When clicking the "PL" button on your bilingual Quarto website, the page content translates to Polish correctly, but the navbar and footer remain in English. This happens because Quarto's project-level configuration takes precedence, causing the Polish pages to inherit the English navbar configuration from the main `_quarto.yml` file.

## Root Cause
The issue occurs because:
1. Both English and Polish sites share the same Quarto project context
2. The main project's `_quarto.yml` configuration overrides the Polish `pl/_quarto.yml`
3. Quarto doesn't properly isolate subproject configurations when building

## The Solution

### Option 1: Quick Fix Script (Recommended)
I've created `fix-polish-navbar.sh` that:
1. Cleans previous builds
2. Builds the Polish site as a completely separate project
3. Ensures Polish navbar configuration is applied
4. Moves the correctly built Polish site to `docs/pl/`
5. Rebuilds the English site

**To use:**
```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
./fix-polish-navbar.sh
```

### Option 2: Updated Deployment Script
I've also created `deploy-bilingual-fixed.sh` that:
1. Builds both language versions correctly
2. Fixes path issues between language versions
3. Verifies the Polish navbar is present
4. Optionally deploys to GitHub

**To use:**
```bash
# Just build (for testing)
./deploy-bilingual-fixed.sh

# Build and deploy to GitHub
./deploy-bilingual-fixed.sh --deploy
```

## What Changed

### 1. Polish Configuration (`pl/_quarto.yml`)
Added `lang: pl` to the format section to explicitly set the language:
```yaml
format:
  html:
    lang: pl  # This ensures Polish language is set
```

### 2. Build Process
The key change is building the Polish site in isolation:
```bash
cd pl
QUARTO_PROJECT_DIR=. quarto render
```
This ensures the Polish `_quarto.yml` is used instead of being overridden.

### 3. Verification
The scripts now verify that Polish navbar terms are present:
- "Strona Główna" (instead of "Home")
- "Usługi" (instead of "Services") 
- "Branże" (instead of "Industries")

## Testing Instructions

1. **Build the sites:**
   ```bash
   ./fix-polish-navbar.sh
   ```

2. **Start local server:**
   ```bash
   python3 -m http.server 8000 --directory docs
   ```

3. **Test both versions:**
   - English: http://localhost:8000/
   - Polish: http://localhost:8000/pl/

4. **Verify:**
   - On Polish page, navbar should show: "Strona Główna", "Usługi", "Branże", etc.
   - Footer should be in Polish
   - Language switcher should work correctly

## Deploying to GitHub Pages

Once you've verified the fix works locally:

```bash
git add .
git commit -m "Fix Polish navbar and footer translation issue"
git push origin main
```

Or use the deployment script:
```bash
./deploy-bilingual-fixed.sh --deploy
```

## Alternative Solutions (if needed)

### JavaScript-based Solution
If the build process continues to have issues, we could implement a JavaScript solution that dynamically translates the navbar based on the current URL:

```javascript
// Add to Polish pages
if (window.location.pathname.includes('/pl/')) {
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        // Translate menu items
        const translations = {
            'Home': 'Strona Główna',
            'Services': 'Usługi',
            'Industries': 'Branże',
            // ... etc
        };
        // Apply translations
    });
}
```

### Separate Repository Solution
As a last resort, the Polish site could be maintained as a completely separate repository and deployed to a subdomain.

## Summary

The fix involves:
1. Building the Polish site as an isolated project
2. Ensuring Polish configuration is properly applied
3. Correctly organizing the output in the `docs/` folder
4. Verifying the navbar displays Polish text

The provided scripts automate this process and should resolve the navbar translation issue completely.
