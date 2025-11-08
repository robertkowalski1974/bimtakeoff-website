# Bootstrap Icons Fix - November 8, 2025

## Issue
Bootstrap Icons were not displaying on the website. Two problems were identified:
1. The Bootstrap Icons CSS library was not loaded initially
2. The Housing Associations icon used wrong class name `bi-home-heart` instead of correct `bi-house-heart`

## Root Causes
1. **Missing Bootstrap Icons CSS**: The Bootstrap Icons CSS library was not being loaded in the site's `<head>` section. While the CSS contained styling for Bootstrap Icons and the HTML referenced icon classes, the actual icon font files were never loaded.
2. **Incorrect Icon Name**: The icon class `bi-home-heart` doesn't exist in Bootstrap Icons. The correct class is `bi-house-heart`.

## Solutions
### Solution 1: Added Bootstrap Icons Library
Added Bootstrap Icons CDN link to the `include-in-header` section of `_quarto.yml`:

```yaml
include-in-header:
  text: |
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    
    <!-- Google Tag Manager -->
    ...
```

### Solution 2: Fixed Icon Class Name
Changed icon class from `bi-home-heart` (invalid) to `bi-house-heart` (valid) in index.qmd:
```markdown
### <i class="bi bi-house-heart" style="color: var(--bim-orange); margin-right: 12px;"></i>Housing Associations
```

## Files Modified
- `_quarto.yml` - Added Bootstrap Icons CDN link in the header
- `index.qmd` - Changed `bi-home-heart` to `bi-house-heart`

## Testing
After rendering, all Bootstrap Icons should now display correctly, including:
- `bi-house-heart` (Housing Associations - now using correct icon name)
- `bi-bullseye` (Precision Built on Experience)
- `bi-lightning-charge` (Fast Turnaround)
- `bi-calculator` (Cost Estimation)
- All other icons throughout the site

## CDN Used
- **Provider:** jsDelivr
- **Version:** 1.11.3 (latest stable as of November 2025)
- **URL:** https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css

## Notes
- This fix applies to both English and Polish versions of the site
- No changes needed to individual page files
- Icons will now load automatically on all pages
- Consider updating to newer Bootstrap Icons versions as they become available
