# 🎬 Animation & Interaction Guide

## Quick Reference for All Animations

---

## 1. Hero Section Animations

### On Page Load
```
Badge (ISO Certified)
├─ Delay: 200ms
├─ Effect: Fade in + Slide up
└─ Duration: 700ms

Main Title
├─ Delay: 400ms
├─ Effect: Fade in + Slide up
└─ Duration: 700ms

Subtitle
├─ Delay: 600ms
├─ Effect: Fade in + Slide up
└─ Duration: 700ms

Description
├─ Delay: 800ms
├─ Effect: Fade in + Slide up
└─ Duration: 700ms

Feature Pills
├─ Delay: 1000ms
├─ Effect: Fade in + Slide up
└─ Duration: 700ms

CTA Buttons
├─ Delay: 1200ms
├─ Effect: Fade in + Slide up
└─ Duration: 700ms
```

### Continuous Animations
- **Floating Particles**: 20 elements, 15s loop, random positions
- **Scroll Indicator**: Bounce animation, 2s loop
- **Badge Pulse**: Dot pulses continuously
- **Background Parallax**: Moves at 0.5x scroll speed
- **Mouse Parallax**: Content shifts based on cursor position

### Carousel
- **Auto-Advance**: Every 6 seconds
- **Transition**: 1000ms cross-fade
- **Manual Control**: Previous/Next buttons
- **Play/Pause**: Toggle auto-play
- **Indicators**: Smooth width transition (300ms)

---

## 2. Statistics Section

### Trigger: Intersection Observer (30% visibility)

```
Stats Counter Animation (Per Number):
├─ Duration: 2500ms
├─ Steps: 80 increments
├─ Effect: Count from 0 to target
└─ Easing: Linear increments

Icon Container:
├─ Base State: Static with shadow
├─ Hover: Rotate 12deg + Scale 110%
└─ Duration: 500ms

Decorative Ring:
├─ Base State: 4px white border, 20% opacity
├─ Hover: Scale 125%
└─ Duration: 500ms

Glow Effect:
├─ Base State: Opacity 0
├─ Hover: Opacity 20% + blur 3xl
└─ Duration: 500ms
```

### 4 Stat Cards
1. **Industries**: Blue gradient glow
2. **Years**: Amber gradient glow
3. **Countries**: Green gradient glow
4. **Projects**: Purple gradient glow

---

## 3. Why Choose Us Cards

### 6 Feature Cards, Each With

```
Card Container:
├─ Base: White bg, secondary border
├─ Hover: Primary border + shadow-2xl + lift -8px
└─ Duration: 500ms

Icon:
├─ Base: Gradient background in rounded square
├─ Hover: Scale 110% + Rotate 6deg
└─ Duration: 500ms

Glow Effect:
├─ Base: Opacity 0
├─ Hover: Opacity 10% + blur-2xl
└─ Duration: 500ms

Title:
├─ Base: Secondary-900
├─ Hover: Primary-600
└─ Duration: 300ms

Decorative Corner:
├─ Base: Opacity 0
├─ Hover: Opacity 100%
└─ Duration: 500ms
```

---

## 4. Product Showcase Cards

### 4 Product Cards in Dark Section

```
Card Container:
├─ Base: Secondary-800/50 with border
├─ Hover: Border primary + shadow glow + lift -12px
└─ Duration: 500ms

Gradient Header Icon:
├─ Base: 8xl icon, 20% opacity
├─ Hover: 30% opacity + scale 125% + rotate 12deg
└─ Duration: 700ms

Decorative Circles (2 per card):
├─ Base: White/5 opacity
├─ Hover: Scale 150%
└─ Duration: 700ms

Title:
├─ Base: White
├─ Hover: Primary-400
└─ Duration: 300ms

CTA Arrow:
├─ Base: Static
├─ Hover: Translate X 8px
└─ Duration: 300ms

Full Card Glow:
├─ Base: Opacity 0
├─ Hover: Opacity 10%
└─ Duration: 500ms
```

---

## 5. Industries Grid Cards

### 6 Industry Cards

```
Card Container:
├─ Base: h-96 with gradient background
├─ Hover: Shadow-2xl + lift -8px
└─ Duration: 500ms

Overlay Gradient:
├─ Base: Secondary-900 gradient
├─ Hover: Primary-900 gradient
└─ Duration: 500ms

Icon Container:
├─ Base: White/10 with blur
├─ Hover: Scale 110% + rotate 12deg + primary-500 bg
└─ Duration: 500ms

Title:
├─ Base: White
├─ Hover: Primary-300
└─ Duration: 300ms

CTA Text:
├─ Base: Static
├─ Hover: Translate X 8px
└─ Duration: 300ms

Decorative Corner:
├─ Base: Opacity 0
├─ Hover: Opacity 100%
└─ Duration: 300ms
```

---

## 6. Testimonials Carousel

### Auto-Rotation
```
Testimonial Transition:
├─ Interval: 5000ms (5 seconds)
├─ Effect: Cross-fade
├─ Duration: 700ms
└─ 3 testimonials in rotation
```

### Manual Control
```
Dot Indicators:
├─ Active: w-16 h-4, primary-500
├─ Inactive: w-4 h-4, white/30
├─ Hover: white/50
└─ Transition: 300ms
```

---

## 7. CTA Section

### Background Animation
```
Floating Blur Circles (2):
├─ Animation: Pulse
├─ Duration: Infinite
├─ Delays: 0s, 1s
└─ Effect: Opacity pulse
```

### Button Animations
```
Primary CTA (White):
├─ Base: White bg, shadow-2xl
├─ Hover: Secondary-50 bg + shadow glow
├─ Icon Rotate: 12deg
└─ Duration: 300ms

Secondary CTA (Glass):
├─ Base: White/5 with blur
├─ Hover: White bg + primary-700 text
├─ Icon Scale: 110%
└─ Duration: 300ms
```

---

## 8. Certifications Banner

### 5 Certification Cards

```
Each Card:
├─ Base: Flex items with icon
├─ Hover: Scale 110%
└─ Duration: 300ms

Icon Container:
├─ Base: Gradient bg, rounded
├─ Hover: Rotate 6deg
└─ Duration: 300ms
```

---

## Global Interaction Patterns

### Link Hover Pattern
```css
Standard Link:
├─ Base: Underline offset
├─ Hover: Color change
└─ Duration: 200ms

Button Link:
├─ Base: Background + shadow
├─ Hover: Darker bg + larger shadow
└─ Duration: 300ms

Card Link:
├─ Base: Border + shadow
├─ Hover: Transform + border color
└─ Duration: 500ms
```

### Scroll Behaviors
```
Parallax Elements:
├─ Background Images: 0.5x scroll speed
├─ Floating Particles: Independent float animation
└─ Scroll Indicator: Visible until scroll

Intersection Animations:
├─ Stats Counter: Triggers at 30% visibility
├─ Future Sections: Can add more observers
└─ Run Once: Observer disconnects after trigger
```

---

## Performance Optimizations

### GPU-Accelerated Properties
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, backdrop-filter)

### Avoided (CPU-Heavy)
- ❌ `width`/`height` animations
- ❌ `margin`/`padding` animations
- ❌ `box-shadow` on animation (only on state change)

### Best Practices Applied
- ✅ `will-change` implied by transforms
- ✅ Debounced scroll listeners
- ✅ Intersection observers for visibility
- ✅ Cleanup in useEffect returns
- ✅ Conditional rendering for inactive slides

---

## Timing Functions Reference

```css
ease-in-out: Smooth start and end (default for most)
ease-out: Quick start, slow end (slide-in animations)
linear: Constant speed (counter animations)
cubic-bezier: Custom curves (future enhancements)
```

### Applied Durations
- **Instant**: 200ms (color changes)
- **Quick**: 300ms (hover effects)
- **Standard**: 500ms (card interactions)
- **Slow**: 700ms (hero content reveals)
- **Very Slow**: 1000ms (carousel transitions)
- **Animated**: 2500ms (counter animation)
- **Loop**: 5000ms (testimonials), 6000ms (hero)

---

## Testing Checklist

### Animation Testing
- [ ] Hero loads with staggered animations
- [ ] Carousel auto-advances every 6 seconds
- [ ] Stats counter triggers on scroll
- [ ] All hover effects work on cards
- [ ] Testimonials auto-rotate
- [ ] Scroll indicator bounces
- [ ] Floating particles visible
- [ ] Mouse parallax responds to cursor
- [ ] All transitions are smooth (60fps)

### Interaction Testing
- [ ] Hero prev/next buttons work
- [ ] Play/pause toggles carousel
- [ ] Dot indicators change slides
- [ ] All links navigate correctly
- [ ] Testimonial dots change active testimonial
- [ ] Hover states don't flicker
- [ ] Focus states visible for keyboard navigation

### Responsive Testing
- [ ] Mobile: 2-column stats grid
- [ ] Tablet: Adjusted product grid
- [ ] Desktop: Full effects enabled
- [ ] Scroll indicator hidden on mobile
- [ ] All text readable at all sizes
- [ ] Buttons tapable on touchscreens

---

## Browser DevTools Tips

### Chrome DevTools
```
Performance Tab:
- Record page load
- Check for 60fps animations
- Look for layout thrashing

Elements Tab:
- Inspect hover states
- Check computed styles
- Verify z-index stacking

Console:
- Check for errors
- Monitor state changes
```

### Firefox DevTools
```
Inspector:
- Animation timeline view
- Box model visualization

Performance:
- Flame charts for optimization
```

---

## Customization Guide

### To Change Animation Speeds
```jsx
// In Home_New.jsx
const timer = setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % slides.length);
}, 6000); // ← Change this number (milliseconds)
```

### To Add New Floating Particles
```jsx
{[...Array(20)].map((_, i) => ( // ← Change array length
  // Particle code
))}
```

### To Modify Transition Delays
```jsx
style={{ transitionDelay: '400ms' }} // ← Adjust timing
```

---

## Common Issues & Solutions

### Issue: Animations feel choppy
**Solution**: Check browser hardware acceleration is enabled

### Issue: Stats don't animate
**Solution**: Ensure element has id="stats-section"

### Issue: Hover effects don't work on mobile
**Solution**: Expected behavior (touch devices don't have hover)

### Issue: Carousel doesn't auto-play
**Solution**: Check isPlaying state, verify useEffect runs

---

*Animation Guide Complete*
*All timings, effects, and interactions documented*
