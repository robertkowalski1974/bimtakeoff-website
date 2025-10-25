# How to Apply BIM Takeoff Brand CSS to WIX Website

## Complete Step-by-Step Guide
*Updated: October 25, 2025*

---

## 📋 What You'll Need

1. Access to your WIX account and website dashboard
2. The complete CSS file (`wix-brand-css-complete.css`)
3. About 10-15 minutes

---

## 🎯 Method 1: Add Custom CSS via WIX Dashboard (Recommended)

### Step 1: Access Your WIX Dashboard
1. Log in to your WIX account at `www.wix.com`
2. Click on **"My Sites"** in the top menu
3. Select the website you want to edit
4. Click **"Edit Site"** or **"Design Site"** (depending on your WIX version)

### Step 2: Open Custom Code Settings
1. Once in the editor, look for the **left sidebar**
2. Click on **"Settings"** (gear icon) or **"Add Apps"**
3. In the search bar, type **"Custom Code"** or **"Tracking & Analytics"**
4. Click on **"Custom Code"** in the results

**Alternative path:**
- Click **"Settings"** → **"Custom Code"** (under Advanced section)
- Or: **"Settings"** → **"Tracking & Analytics"** → **"+ New Tool"** → **"Custom Code"**

### Step 3: Add New Custom Code
1. Click the **"+ Add Custom Code"** button
2. A dialog box will appear with several fields

### Step 4: Paste Your CSS Code
1. **Code Snippet Name**: Enter a descriptive name like "BIM Takeoff Brand Styles"
2. **Add Code Here**: 
   - Open the file `wix-brand-css-complete.css`
   - Copy ALL the content (Ctrl+A, then Ctrl+C on Windows or Cmd+A, Cmd+C on Mac)
   - Paste it into the code box
3. **Wrap with tags**: Make sure to wrap the CSS in `<style>` tags:
   ```html
   <style>
   /* Paste all your CSS code here */
   </style>
   ```

### Step 5: Configure Code Placement
1. **Load Code**: Select **"Head"** (this loads CSS before page content)
2. **Add Code to Pages**: Select **"All Pages"** (to apply styling site-wide)
3. **Load Code Once**: Make sure this option is checked

### Step 6: Apply and Save
1. Click **"Apply"** button at the bottom
2. The custom code should now appear in your list
3. Click **"Publish"** in the top right corner to make changes live
4. Click **"Publish"** again to confirm

### Step 7: Test Your Website
1. Open your live website in a new browser tab
2. Check that:
   - Font changed to Inter
   - Colors match BIM Takeoff brand (Orange #FF9900, Charcoal #2C2C2C)
   - Buttons are styled correctly
   - Headers have orange underlines (H2)
   - Links are orange

---

## 🎨 Method 2: Add CSS in WIX Studio (For WIX Studio Users)

### If You're Using WIX Studio:
1. Open your site in **WIX Studio**
2. Click on **"Page"** in the left panel
3. Click on **"Settings"** icon
4. Navigate to **"Custom Code"**
5. Click **"Add Code"**
6. Paste your CSS wrapped in `<style>` tags
7. Set **Location**: "Head"
8. Set **Pages**: "All Pages"
9. Save and Publish

---

## 🔧 Method 3: Add to Specific Page (Page-Level CSS)

### If You Only Want to Style One Page:
1. In WIX Editor, click on the **page** you want to style (in the Pages menu)
2. Click **"Page Settings"** (three dots next to page name)
3. Select **"SEO"** or **"Advanced Settings"**
4. Find **"Custom Code"** or **"Page Header Code"**
5. Paste your CSS wrapped in `<style>` tags
6. Save changes
7. Publish

---

## ✅ Verification Checklist

After adding the CSS, check these elements on your live site:

### Visual Elements:
- [ ] **Font**: All text uses Inter font
- [ ] **Colors**: 
  - [ ] Orange buttons (#FF9900)
  - [ ] Charcoal header/footer (#2C2C2C)
  - [ ] Orange links
- [ ] **Headings**:
  - [ ] H2 has orange underline
  - [ ] H3 is orange color
- [ ] **Buttons**:
  - [ ] Primary buttons are orange
  - [ ] Hover effects work (darker orange)
- [ ] **Navigation**:
  - [ ] Header has charcoal background
  - [ ] Nav links are white, turn orange on hover
- [ ] **Footer**:
  - [ ] Charcoal background
  - [ ] Orange links

### Test on Multiple Devices:
- [ ] Desktop (1920px width)
- [ ] Tablet (768px width)
- [ ] Mobile (375px width)

---

## 🐛 Troubleshooting

### Problem: CSS Not Applying

**Solution 1: Clear Cache**
1. In WIX Editor, click **"Preview"**
2. In preview mode, press `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
3. This hard refreshes and clears cache

**Solution 2: Check Code Placement**
1. Make sure CSS is wrapped in `<style>` tags
2. Verify "Load Code: Head" is selected
3. Confirm "All Pages" is selected

**Solution 3: Increase CSS Specificity**
- If certain elements don't change, add more `!important` flags
- Or increase selector specificity (add parent elements)

### Problem: Some Elements Not Styled

**Cause**: WIX uses inline styles that override CSS

**Solution**: 
1. Right-click the element in WIX Editor
2. Select **"Settings"** or **"Customize Design"**
3. Manually change colors/fonts to match brand
4. Use **"Quick Edit"** to adjust styling

### Problem: Fonts Not Loading

**Solution**: 
1. Check internet connection (Google Fonts require online connection)
2. Verify the `@import` line is at the TOP of your CSS
3. Try adding font as a WIX app:
   - **"Add"** → **"App Market"** → Search "Google Fonts"
   - Install and select "Inter"

### Problem: Mobile Not Responsive

**Solution**:
1. In WIX Editor, switch to **"Mobile View"** (phone icon)
2. Manually adjust any elements that don't look right
3. WIX sometimes needs manual mobile adjustments

---

## 🔄 Updating the CSS Later

### To Edit Your Custom Code:
1. Go to **"Settings"** → **"Custom Code"**
2. Find "BIM Takeoff Brand Styles" in the list
3. Click the **"Edit"** icon (pencil)
4. Make your changes
5. Click **"Apply"**
6. Click **"Publish"** to update live site

### To Remove Custom Code:
1. Go to **"Settings"** → **"Custom Code"**
2. Find "BIM Takeoff Brand Styles"
3. Click the **"Delete"** icon (trash can)
4. Confirm deletion
5. Publish changes

---

## 💡 Pro Tips

### Tip 1: Use Class Names
When creating elements in WIX, add custom class names:
1. Select element
2. Click **"Advanced Settings"**
3. Find **"CSS Classes"**
4. Add classes like: `cta-primary`, `feature-card`, `hero-section`
5. These will automatically pick up the CSS styling

### Tip 2: Test Before Publishing
Always use **"Preview"** mode to test changes before publishing

### Tip 3: Keep a Backup
Save a copy of your CSS file offline in case you need to restore it

### Tip 4: Document Custom Classes
Keep a list of which WIX elements use which custom classes

### Tip 5: Mobile-First Approach
Design for mobile first in WIX, then adjust desktop view

---

## 📚 Common WIX Element Mappings

Here's how WIX elements map to the CSS classes:

| WIX Element | CSS Class to Use | What It Does |
|-------------|------------------|--------------|
| Button | Add class `cta-primary` | Orange button style |
| Button | Add class `cta-secondary` | Outline button |
| Text Box | Add class `hero-title` | Large hero heading |
| Container | Add class `feature-card` | Service box with orange left border |
| Container | Add class `stats-section` | Dark stats container |
| Strip | Add class `hero-section` | Full-width hero area |
| Text | Add class `faq-question` | Bold FAQ question |
| Box | Add class `trust-badge` | White certification box |

### How to Add Classes in WIX:
1. Select the element
2. Click the **"Settings"** icon (gear)
3. Go to **"Advanced"** tab
4. Find **"CSS Classes"** field
5. Type the class name (without the dot)
6. Press Enter
7. The element will automatically get the styling!

---

## 🎨 Color Reference

Keep these handy when manually styling elements:

- **Primary Orange**: `#FF9900`
- **Orange Hover**: `#E68A00`
- **Charcoal**: `#2C2C2C`
- **White**: `#FFFFFF`
- **Light Gray**: `#F0F0F0`
- **Medium Gray**: `#757575`

---

## 📞 Need Help?

If you encounter issues:
1. Check WIX Support: https://support.wix.com
2. WIX Forum: https://www.wix.com/forum
3. Review this guide's Troubleshooting section
4. Try WIX Chat Support (available 24/7)

---

## ✨ Next Steps

After applying the CSS:
1. **Review all pages** to ensure consistent styling
2. **Update images** to match brand colors
3. **Adjust any manual overrides** in WIX editor if needed
4. **Test contact forms** to ensure submit buttons work
5. **Check mobile version** thoroughly
6. **Add custom class names** to elements for better control

---

**Remember**: The CSS provides the foundation, but WIX sometimes requires manual adjustments in the editor for perfect results. Don't hesitate to combine custom CSS with WIX's built-in design tools!
