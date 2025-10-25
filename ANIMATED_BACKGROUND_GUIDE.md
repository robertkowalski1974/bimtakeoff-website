# Animated Hero Background Setup Guide

**Date:** October 25, 2025  
**Feature:** Animated video background with moving cranes and clouds

## Two Options: Video Background vs CSS Animation

### ✅ OPTION 1: Video Background (Recommended - Most Realistic)

This gives you the exact animated construction scene effect.

#### What You Need:

1. **Video file** of the animated construction scene (with moving cranes, clouds)
   - Preferred format: MP4 (H.264) for best browser compatibility
   - Optional: WebM for additional browser support
   - Recommended specs:
     - Resolution: 1920x1080 (Full HD)
     - Duration: 10-30 seconds (will loop)
     - File size: Under 5MB for fast loading
     - Framerate: 24-30 fps

#### Steps to Add Video Background:

1. **Get your video file:**
   - Export/download the animated background from your original website
   - Or create a new timelapse of construction with moving elements
   - Or use stock video: search for "construction timelapse" or "crane building time lapse"

2. **Save the video:**
   ```bash
   /Users/robertkowalski/Documents/bimtakeoff-website/images/hero-video.mp4
   ```

3. **Optional - Add WebM version for better compatibility:**
   ```bash
   /Users/robertkowalski/Documents/bimtakeoff-website/images/hero-video.webm
   ```

4. **Rebuild your site:**
   ```bash
   cd /Users/robertkowalski/Documents/bimtakeoff-website
   quarto render
   ```

#### What I've Already Set Up:

✅ CSS for video background container  
✅ Video element with autoplay, loop, and muted  
✅ Fallback to static image if video doesn't load  
✅ Dark overlay to keep text readable  
✅ Mobile-optimized (video pauses on slow connections)  

#### Video Attributes Explained:

```html
<video autoplay muted loop playsinline poster="images/header-background.jpg">
```

- `autoplay` - Starts playing automatically when page loads
- `muted` - Required for autoplay to work (browser policy)
- `loop` - Video repeats continuously
- `playsinline` - Plays inline on mobile (doesn't fullscreen)
- `poster` - Shows static image while video loads

---

### OPTION 2: CSS-Only Animated Background (Lightweight Alternative)

If you don't have a video file, I can create a CSS-animated background with:
- Subtle cloud movement
- Animated gradient overlay
- Moving particles/elements

**Pros:**
- No video file needed
- Faster loading
- Works everywhere

**Cons:**
- Less realistic than actual video
- Limited animation possibilities

Let me know if you want this option instead!

---

## Finding/Creating Your Video

### Option A: Extract from Current Website

If your current www.bimtakeoff.com uses a video background:

1. Open Chrome Developer Tools (F12)
2. Go to Network tab
3. Filter by "Media"
4. Reload the page
5. Look for .mp4 or .webm files
6. Right-click and copy URL
7. Download the video

### Option B: Stock Video Resources

Free/Premium stock video sites:
- **Pexels** (pexels.com/videos) - Free
- **Pixabay** (pixabay.com/videos) - Free
- **Videvo** (videvo.net) - Free
- **Shutterstock** - Premium

Search terms:
- "construction time lapse"
- "crane building site"
- "construction site clouds"
- "building construction timelapse"

### Option C: Create Your Own

- Film a construction site time-lapse
- Use drone footage of construction
- Combine photos into a video (using apps like Adobe Premiere, iMovie)

---

## Optimizing Your Video

For best website performance:

1. **Compress the video:**
   ```bash
   # Using ffmpeg (if installed)
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1500k hero-video.mp4
   ```

2. **Remove audio:** (not needed for background video)
   ```bash
   ffmpeg -i input.mp4 -an -vcodec copy hero-video.mp4
   ```

3. **Create WebM version:**
   ```bash
   ffmpeg -i hero-video.mp4 -c:v libvpx-vp9 -b:v 1000k hero-video.webm
   ```

Online tools (if you don't have ffmpeg):
- Cloudconvert.com
- Online-convert.com
- Handbrake (free software)

---

## Testing

After adding your video:

```bash
cd /Users/robertkowalski/Documents/bimtakeoff-website
quarto render
quarto preview
```

**Check:**
- ✅ Video loads and plays automatically
- ✅ Video loops smoothly
- ✅ Text remains readable over video
- ✅ Fallback image shows while video loads
- ✅ Mobile version works properly
- ✅ Video doesn't affect page load speed significantly

---

## Troubleshooting

**Video doesn't play:**
- Check file path is correct
- Ensure video is in `/images` folder
- Try opening video file directly in browser
- Check file format (MP4 H.264 works best)

**Video plays but text isn't readable:**
- Adjust overlay opacity in CSS (currently 75%)
- Make overlay darker: change `0.75` to `0.85` or `0.9`

**Video is too large/slow:**
- Compress video to under 5MB
- Reduce resolution to 1280x720
- Lower bitrate to 1000k-1500k

**Video doesn't loop smoothly:**
- Ensure first and last frames are similar
- Edit video to create seamless loop

---

## Mobile Optimization

The current setup automatically:
- Shows static image on very slow connections
- Reduces video quality on mobile if needed
- Disables parallax effect on mobile (scroll behavior)

To disable video on mobile entirely, add to CSS:

```css
@media (max-width: 768px) {
  .hero-video-bg video {
    display: none;
  }
}
```

---

## Current Status

✅ **CSS is ready** - Video background styling complete  
✅ **HTML is ready** - Video element added to index.qmd  
⏳ **Need video file** - Add `hero-video.mp4` to `/images` folder  
✅ **Fallback works** - Static image shows if video missing  

Once you add the video file, the animated background will work immediately!

---

*For CSS-animated alternative or additional help, just let me know!*
