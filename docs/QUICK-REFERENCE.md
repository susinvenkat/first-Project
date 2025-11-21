# Quick Reference - Design System Cheat Sheet

**Susin Group Website - Global Design Standards**

---

## 🎨 Colors

```css
--primary-color: #c41e3a;       /* Susin Red */
--secondary-color: #1a2942;     /* Dark Navy */

--text-primary: #1a1a1a;        /* Main text */
--text-secondary: #4a5568;      /* Supporting */
--text-tertiary: #718096;       /* Muted */

--gray-50 to --gray-900         /* 10 shades */
```

---

## ✍️ Typography

```css
/* Font Sizes */
--text-xs: 0.75rem    (12px)
--text-sm: 0.875rem   (14px)
--text-base: 1rem     (16px)
--text-lg: 1.125rem   (18px)
--text-xl: 1.25rem    (20px)
--text-2xl: 1.5rem    (24px)
--text-3xl: 1.875rem  (30px)
--text-4xl: 2.25rem   (36px)
--text-5xl: 3rem      (48px)
--text-6xl: 3.75rem   (60px)

/* Weights */
--font-light: 300
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
--font-extrabold: 800
```

---

## 📐 Spacing (8px Grid)

```css
--space-0: 0
--space-1: 0.25rem   (4px)
--space-2: 0.5rem    (8px)
--space-3: 0.75rem   (12px)
--space-4: 1rem      (16px)
--space-5: 1.25rem   (20px)
--space-6: 1.5rem    (24px)
--space-8: 2rem      (32px)
--space-10: 2.5rem   (40px)
--space-12: 3rem     (48px)
--space-16: 4rem     (64px)
--space-20: 5rem     (80px)
--space-24: 6rem     (96px)
--space-32: 8rem     (128px)
```

---

## 🎭 Shadows

```css
--shadow-xs: 0 1px 2px rgba(0,0,0,0.05)
--shadow-sm: 0 1px 3px rgba(0,0,0,0.08)
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px rgba(0,0,0,0.12)
--shadow-2xl: 0 25px 50px rgba(0,0,0,0.15)

/* Colored */
--shadow-primary: 0 10px 30px rgba(196,30,58,0.15)
```

---

## 🔘 Border Radius

```css
--radius-sm: 0.25rem   (4px)
--radius-md: 0.375rem  (6px)
--radius-lg: 0.5rem    (8px)
--radius-xl: 0.75rem   (12px)
--radius-2xl: 1rem     (16px)
--radius-3xl: 1.5rem   (24px)
--radius-full: 9999px  (pill)
```

---

## ⚡ Transitions

```css
--transition-fast: 0.15s cubic-bezier(0.4,0,0.2,1)
--transition-base: 0.3s cubic-bezier(0.4,0,0.2,1)
--transition-slow: 0.5s cubic-bezier(0.4,0,0.2,1)
```

---

## 🔲 Buttons

```html
<!-- Variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>

<!-- Sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-xl">XLarge</button>

<!-- States -->
<button class="btn btn-primary" disabled>Disabled</button>
<button class="btn btn-primary btn-full">Full Width</button>
```

---

## 📦 Cards

```html
<!-- Product Card -->
<div class="product-card">
    <div class="product-icon"><i class="fas fa-cog"></i></div>
    <h3>Title</h3>
    <p>Description</p>
</div>

<!-- Service Card -->
<div class="service-card">
    <div class="service-icon"><i class="fas fa-tools"></i></div>
    <h4>Service Name</h4>
    <p>Details</p>
</div>

<!-- Certification Card -->
<div class="cert-card">
    <div class="cert-icon iso-cert"><i class="fas fa-certificate"></i></div>
    <h4>ISO 9001:2015</h4>
    <p>Quality Management</p>
</div>
```

---

## 📱 Responsive

```css
/* Mobile First */
/* Base: 0-640px */

@media (min-width: 641px) {
    /* Tablet */
}

@media (min-width: 1025px) {
    /* Desktop */
}

/* Breakpoints */
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
--breakpoint-2xl: 1536px
```

---

## 📏 Common Patterns

### Section Layout
```html
<section class="section-py-lg section-bg-light">
    <div class="container">
        <h2 class="section-title">Title</h2>
        <p class="section-subtitle">Subtitle</p>
        <!-- Content -->
    </div>
</section>
```

### Hero Section
```html
<section class="hero-advanced">
    <div class="container">
        <div class="hero-grid">
            <div class="hero-panel">
                <span class="eyebrow">Label</span>
                <h1>Main Title</h1>
                <p class="lead">Description</p>
                <div class="hero-cta">
                    <button class="btn btn-primary">CTA</button>
                </div>
            </div>
            <div class="hero-media">
                <img src="..." class="hero-image">
            </div>
        </div>
    </div>
</section>
```

### Grid Layout
```html
<div class="products-grid">
    <!-- Auto-responsive 3-4 column grid -->
    <div class="product-card">...</div>
    <div class="product-card">...</div>
    <div class="product-card">...</div>
</div>
```

---

## 🎯 Utility Classes

```css
/* Spacing */
.m-4     /* margin: 16px */
.mt-8    /* margin-top: 32px */
.mb-6    /* margin-bottom: 24px */
.mx-auto /* margin: 0 auto */

.p-6     /* padding: 24px */
.py-8    /* padding: 32px 0 */
.px-4    /* padding: 0 16px */

/* Typography */
.text-sm       /* font-size: 14px */
.text-xl       /* font-size: 20px */
.font-bold     /* font-weight: 700 */
.leading-tight /* line-height: 1.25 */

/* Colors */
.text-primary    /* color: #1a1a1a */
.text-secondary  /* color: #4a5568 */
.bg-light        /* background: gray-50 */
```

---

## ♿ Accessibility

```css
/* Touch Targets */
min-height: 44px  /* Minimum */
min-width: 44px

/* Focus States */
outline: 2px solid var(--primary-color)
outline-offset: 2px

/* Color Contrast */
Primary on white: AA compliant
Dark navy on white: AAA compliant
```

---

## ⚡ Performance

```css
/* DO - GPU Accelerated */
transform: translateY(-8px);
opacity: 0.95;

/* DON'T - CPU Heavy */
top: -8px;
width: 110%;
margin: 10px;

/* Animations */
transition: all var(--transition-base);
will-change: transform, opacity; /* Use sparingly */
```

---

## 📚 Documentation

- **Full Guide:** `docs/STYLE-GUIDE.md`
- **Performance:** `docs/PERFORMANCE-OPTIMIZATION.md`
- **Completion Report:** `docs/MODERNIZATION-COMPLETE.md`

---

## 💡 Quick Tips

1. **Always use design tokens** - Never hardcode values
2. **Follow 8px grid** - All spacing should be multiples of 8px
3. **Mobile first** - Start with mobile, enhance for desktop
4. **Touch targets** - Minimum 44x44px for all buttons/links
5. **GPU animations** - Only use transform and opacity
6. **Test on devices** - Real mobile testing is essential

---

**Need Help?** Check `docs/STYLE-GUIDE.md` for detailed examples and usage patterns.
