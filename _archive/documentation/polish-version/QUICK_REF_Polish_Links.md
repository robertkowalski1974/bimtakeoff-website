# 🚨 QUICK REFERENCE: Adding Links to Polish Site

## The ONE Critical Rule

**ALWAYS use ABSOLUTE PATHS starting with `/pl/` for target paths:**

```javascript
// In linkTranslations object of /js/polish-navbar.js:
'../new-page.html': '/pl/nowa-strona.html',  // ✅ Absolute path
'./new-page.html': '/pl/nowa-strona.html',   // ✅ Absolute path
'/new-page.html': '/pl/nowa-strona.html'     // ✅ Absolute path
```

## Why Absolute Paths?

**Relative paths break in subdirectories:**
- ❌ `'../page.html': 'strona.html'` → Works from `/pl/` but breaks from `/pl/uslugi/`
- ✅ `'../page.html': '/pl/strona.html'` → Works from ALL directories!

**Absolute paths (starting with `/`) resolve from site root, regardless of current directory.**

## What NOT To Do

```javascript
// ❌ WRONG - These will break in subdirectories:
'../new-page.html': 'nowa-strona.html',
'./new-page.html': 'nowa-strona.html',
'/new-page.html': 'nowa-strona.html'
```

## Testing (30 seconds)

1. Go to `http://localhost:5306/pl/` → Click link → Should work ✅
2. Go to `http://localhost:5306/pl/uslugi/...` → Click same link → Should still work ✅

**If link breaks in subdirectory → You used relative path instead of absolute!**

## Examples

### Example 1: New "Blog" Page
```javascript
// English: /blog.html → Polish: /pl/blog.html
'../blog.html': '/pl/blog.html',       // ✅ Absolute
'./blog.html': '/pl/blog.html',        // ✅ Absolute
'/blog.html': '/pl/blog.html'          // ✅ Absolute
```

### Example 2: New Service in Subdirectory
```javascript
// English: /services/fire-safety.html → Polish: /pl/uslugi/bezpieczenstwo-pozarowe.html
'../services/fire-safety.html': '/pl/uslugi/bezpieczenstwo-pozarowe.html',  // ✅ Absolute
'./services/fire-safety.html': '/pl/uslugi/bezpieczenstwo-pozarowe.html',   // ✅ Absolute
'/services/fire-safety.html': '/pl/uslugi/bezpieczenstwo-pozarowe.html'     // ✅ Absolute
```

## File to Edit

- **Only one file:** `/js/polish-navbar.js`
- **Section:** `linkTranslations` object (around line 60)

## Emergency Fix

Link broken in subdirectory?

1. **Check if using relative path:** If target doesn't start with `/pl/` → That's the problem!
2. **Change to absolute path:** Add `/pl/` at the start
3. **Test from both:** Main page AND subdirectory

## Remember

🔴 **Relative path** `'../page.html': 'strona.html'` = Breaks in subdirectories
🟢 **Absolute path** `'../page.html': '/pl/strona.html'` = Works everywhere

## Full Documentation

See: `_archive/2025-10-26_Polish_Links_Doubled_Path_Fix.md`
