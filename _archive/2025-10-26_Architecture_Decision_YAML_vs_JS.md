# Polish Site Architecture - JS vs YAML Approach
**Date:** October 26, 2025

---

## Current Situation Analysis

### What's Happening Now:

1. **Polish `_quarto.yml`** generates navbar with:
   - ✅ Polish text already defined
   - ✅ Polish links already defined
   - ✅ Correct structure

2. **Inline translation script** in Polish `_quarto.yml`:
   - ❌ Outdated (has buggy relative paths)
   - ❌ Redundant (trying to translate already-Polish content)
   - ❌ Adds complexity

3. **Centralized `/js/polish-navbar.js`**:
   - ✅ Fixed with absolute paths
   - ❌ Redundant on Polish pages (content already Polish)
   - ✅ Useful ONLY if we use single English `_quarto.yml` for both languages

---

## Architectural Decision Needed

### Option 1: Pure YAML Approach (RECOMMENDED ✅)

**How it works:**
- English site uses `/quarto.yml`
- Polish site uses `/pl/_quarto.yml`
- Each defines its own navbar in its own language
- **NO translation scripts needed**

**Advantages:**
- ✅ Simpler - each language is self-contained
- ✅ Faster - no JS processing needed
- ✅ Cleaner - single source of truth per language
- ✅ Easier to maintain - edit YAML, not JS
- ✅ No risk of translation bugs

**Disadvantages:**
- ⚠️ Must update navbar in 2 places when adding pages
- ⚠️ Could get out of sync

**Implementation:**
```yaml
# /pl/_quarto.yml
navbar:
  left:
    - text: "Strona Główna"
      href: index.qmd
    - text: "Kontakt"
      href: kontakt.qmd
```

---

### Option 2: JS Translation Approach (Current buggy state ❌)

**How it works:**
- Single `/quarto.yml` in English
- Polish pages inherit English navbar
- JS translates English → Polish on page load

**Advantages:**
- ✅ Single navbar definition
- ✅ Can't get out of sync

**Disadvantages:**
- ❌ More complex
- ❌ Slower (JS processing)
- ❌ We already have Polish `_quarto.yml` anyway!
- ❌ Translation bugs (as we discovered)
- ❌ Requires maintaining JS translations

**Why we don't need this:**
We already have a Polish `_quarto.yml` with Polish content!

---

## Recommended Action

### Clean Up Current Implementation:

**1. Remove inline translation script from `/pl/_quarto.yml`:**

Remove this entire block from `include-in-header`:
```yaml
<!-- Polish Translation Script -->
<script>
(function() {
    const translations = {...};
    // ... entire inline script
})();
</script>
```

**2. Remove centralized script reference for Polish pages:**

In `/pl/_quarto.yml`, remove from `include-after-body`:
```yaml
<script src="../js/polish-navbar.js"></script>
```

**3. Keep `/js/polish-navbar.js` for reference only:**
- Archive it for future use if needed
- Not loaded on Polish pages

**4. Ensure all links in `/pl/_quarto.yml` use proper paths:**
- Home: `index.qmd` 
- Contact: `kontakt.qmd`
- Services: absolute paths or .qmd files
- Ensure Quarto generates correct relative paths

---

## Benefits of Clean Approach

### Before (Messy):
```
Polish page loads
 ↓
Has Polish navbar from _quarto.yml ✅
 ↓
Inline script runs → tries to translate (redundant) ❌
 ↓
Centralized script runs → tries to translate (redundant) ❌
 ↓
Multiple points of failure ❌
```

### After (Clean):
```
Polish page loads
 ↓
Has Polish navbar from _quarto.yml ✅
 ↓
DONE! ✅
```

---

## Updated File Structure

### English Site:
- **Config:** `/_quarto.yml` (English content)
- **Scripts:** None needed for navbar
- **Pages:** English .qmd files

### Polish Site:
- **Config:** `/pl/_quarto.yml` (Polish content)
- **Scripts:** None needed for navbar
- **Pages:** Polish .qmd files

---

## Maintenance Workflow

When adding a new page:

**1. Add to English `_quarto.yml`:**
```yaml
- text: "New Page"
  href: new-page.qmd
```

**2. Add to Polish `/pl/_quarto.yml`:**
```yaml
- text: "Nowa Strona"
  href: nowa-strona.qmd
```

**3. Create both page files:**
- `/new-page.qmd` (English content)
- `/pl/nowa-strona.qmd` (Polish content)

That's it! No JS updates needed.

---

## Migration Steps

### Immediate Actions:

1. ✅ **KEEP** Polish `_quarto.yml` with all navbar definitions
2. ❌ **REMOVE** inline translation script from Polish `_quarto.yml`
3. ❌ **REMOVE** centralized script reference for Polish pages
4. ✅ **VERIFY** all links in Polish `_quarto.yml` are correct
5. 📁 **ARCHIVE** `/js/polish-navbar.js` (don't delete, might need for future)

### Testing Checklist:

- [ ] Polish site loads correctly
- [ ] All navbar links work from main page
- [ ] All navbar links work from subdirectories
- [ ] No JS errors in console
- [ ] Navbar text is in Polish
- [ ] Phone number shows Polish number

---

## Special Cases

### Language Switcher:
Keep in both configs:
```yaml
# English _quarto.yml
right:
  - text: "EN"
    href: /
  - text: "PL"
    href: /pl/

# Polish _quarto.yml
right:
  - text: "PL"
    href: /pl/
  - text: "EN"
    href: /
```

### Footer:
Define separately in each `_quarto.yml` with appropriate language and phone number.

---

## Conclusion

**Recommendation: Use Pure YAML Approach**

✅ Remove translation scripts from Polish site
✅ Keep Polish `_quarto.yml` as single source of truth
✅ Simpler, faster, cleaner architecture

The `/js/polish-navbar.js` script we fixed was solving a problem that shouldn't exist - Polish pages should just be Polish from the start, not English pages translated to Polish.

---

**Decision Required:** Approve clean-up and proceed with removing redundant scripts?
