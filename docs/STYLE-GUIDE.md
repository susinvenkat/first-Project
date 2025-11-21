# Susin Group Website - Style Guide & Design System

**Version:** 2.0 - Global Standards  
**Last Updated:** November 21, 2025  
**Brand:** Susin Group - Industrial Actuators

---

## 📋 Table of Contents

1. [Design Tokens](#design-tokens)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Responsive Breakpoints](#responsive-breakpoints)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [Usage Examples](#usage-examples)

---

## 🎨 Design Tokens

All design values are defined as CSS custom properties in `:root`. These tokens ensure consistency across the entire website.

### Color Palette

```css
/* Primary Brand Colors */
--primary-color: #c41e3a;      /* Susin Red */
--secondary-color: #1a2942;     /* Dark Navy */
--accent-color: #dc3545;        /* Bright Red Accent */

/* Gray Scale (50-900) */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;

/* Semantic Colors */
--text-primary: #1a1a1a;        /* Main text */
--text-secondary: #4a5568;      /* Secondary text */
--text-tertiary: #718096;       /* Muted text */
--bg-primary: #ffffff;          /* Main background */
--bg-secondary: #f7fafc;        /* Alt background */
--border-color: #e2e8f0;        /* Default borders */
--border-light: #edf2f7;        /* Light borders */
```

### Typography Scale

```css
/* Font Families */
--font-heading: 'Montserrat', -apple-system, system-ui, sans-serif;
--font-body: 'Inter', -apple-system, system-ui, sans-serif;

/* Font Sizes (Fluid Responsive) */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Letter Spacing */
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

### Spacing System (8px Grid)

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Shadows & Elevation

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.12);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);

/* Colored Shadows */
--shadow-primary: 0 10px 30px rgba(196, 30, 58, 0.15);
--shadow-primary-sm: 0 4px 12px rgba(196, 30, 58, 0.1);
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Pill shape */
```

### Animations & Transitions

```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🎨 Color System

### Primary Colors

**Susin Red (`#c41e3a`)**
- Use for: Primary CTAs, headers, key highlights
- Accessibility: Meets WCAG AA for large text on white
- Examples: Primary buttons, navigation highlights, hero accents

**Dark Navy (`#1a2942`)**
- Use for: Secondary elements, dark backgrounds
- Accessibility: Meets WCAG AAA on white
- Examples: Footer, secondary buttons, dark sections

### Semantic Usage

```css
/* Text Colors */
.text-primary { color: var(--text-primary); }      /* Main content */
.text-secondary { color: var(--text-secondary); }  /* Supporting text */
.text-tertiary { color: var(--text-tertiary); }    /* Captions, labels */

/* Background Colors */
.bg-white { background: var(--white); }
.bg-light { background: var(--gray-50); }
.bg-primary { background: var(--primary-color); }
```

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #c41e3a 0%, #8b1428 100%);
--gradient-secondary: linear-gradient(135deg, #1a2942 0%, #0f1a2e 100%);
--gradient-light: linear-gradient(180deg, #ffffff 0%, #f7fafc 100%);
--gradient-dark: linear-gradient(180deg, #2d3748 0%, #1a202c 100%);
--gradient-accent: linear-gradient(90deg, #c41e3a 0%, #dc3545 100%);
```

---

## ✍️ Typography

### Heading Hierarchy

```css
/* H1 - Main Page Titles */
h1 {
    font-size: clamp(2.25rem, 5vw, 4rem);     /* 36-64px */
    font-weight: var(--font-extrabold);
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-tight);
}

/* H2 - Section Titles */
h2 {
    font-size: clamp(1.875rem, 4vw, 3rem);    /* 30-48px */
    font-weight: var(--font-bold);
    line-height: var(--leading-tight);
}

/* H3 - Subsection Titles */
h3 {
    font-size: clamp(1.5rem, 3vw, 2.25rem);   /* 24-36px */
    font-weight: var(--font-bold);
}

/* H4 - Card/Component Titles */
h4 {
    font-size: clamp(1.25rem, 2.5vw, 1.875rem); /* 20-30px */
    font-weight: var(--font-semibold);
}

/* H5, H6 - Minor Headings */
h5 { font-size: var(--text-xl); }  /* 20px */
h6 { font-size: var(--text-lg); }  /* 18px */
```

### Body Text

```css
/* Default Body */
body {
    font-size: var(--text-base);              /* 16px */
    line-height: var(--leading-relaxed);      /* 1.625 */
    font-family: var(--font-body);
}

/* Lead Paragraph */
.lead {
    font-size: var(--text-xl);                /* 20px */
    line-height: var(--leading-relaxed);
    color: var(--text-secondary);
}

/* Small Text */
.text-small {
    font-size: var(--text-sm);                /* 14px */
}
```

### Text Utilities

```css
.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
/* ... up to text-6xl */

.font-light { font-weight: var(--font-light); }
.font-normal { font-weight: var(--font-normal); }
.font-medium { font-weight: var(--font-medium); }
.font-semibold { font-weight: var(--font-semibold); }
.font-bold { font-weight: var(--font-bold); }
```

---

## 📐 Spacing & Layout

### Container System

```css
/* Default Container */
.container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 var(--space-6);  /* 24px */
}

/* Container Variants */
.container-sm { max-width: 768px; }   /* Small content */
.container-md { max-width: 1024px; }  /* Medium content */
.container-lg { max-width: 1280px; }  /* Large content */
.container-fluid { max-width: 100%; } /* Full width */

/* Responsive Padding */
@media (max-width: 640px) {
    .container { padding: 0 var(--space-4); }  /* 16px mobile */
}
```

### Spacing Utilities

```css
/* Margin */
.m-0 { margin: 0; }
.m-1 { margin: var(--space-1); }    /* 4px */
.m-2 { margin: var(--space-2); }    /* 8px */
.m-4 { margin: var(--space-4); }    /* 16px */
/* ... up to m-32 */

/* Directional Margins */
.mt-4 { margin-top: var(--space-4); }
.mb-4 { margin-bottom: var(--space-4); }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Padding */
.p-0 { padding: 0; }
.p-2 { padding: var(--space-2); }   /* 8px */
.p-4 { padding: var(--space-4); }   /* 16px */
/* ... up to p-32 */

/* Directional Padding */
.py-8 { padding-top: var(--space-8); padding-bottom: var(--space-8); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }
```

### Gap Utilities (Flexbox/Grid)

```css
.gap-2 { gap: var(--space-2); }     /* 8px */
.gap-4 { gap: var(--space-4); }     /* 16px */
.gap-6 { gap: var(--space-6); }     /* 24px */
.gap-8 { gap: var(--space-8); }     /* 32px */
```

---

## 🧩 Components

### Buttons

#### Button Variants

```html
<!-- Primary Button (Gradient) -->
<button class="btn btn-primary">Learn More</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Contact Us</button>

<!-- Outline Button -->
<button class="btn btn-outline">View Details</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Cancel</button>

<!-- White Button (on dark backgrounds) -->
<button class="btn btn-white">Get Started</button>
```

#### Button Sizes

```html
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium (default)</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-xl">Extra Large</button>
```

#### Button States

```html
<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabled</button>

<!-- With Icon -->
<button class="btn btn-primary">
    <i class="fas fa-download"></i>
    <span>Download</span>
</button>

<!-- Full Width -->
<button class="btn btn-primary btn-full">Full Width Button</button>
```

### Cards

#### Product Card

```html
<div class="product-card">
    <div class="product-icon">
        <i class="fas fa-cog"></i>
    </div>
    <h3>Electric Actuators</h3>
    <p>High-performance electric actuators for industrial applications.</p>
    <a href="#" class="product-link">
        Learn More <i class="fas fa-arrow-right"></i>
    </a>
</div>
```

#### Service Card

```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-tools"></i>
    </div>
    <h4>Installation Services</h4>
    <p>Professional on-site installation by certified technicians.</p>
</div>
```

#### Certification Card

```html
<div class="cert-card">
    <div class="cert-icon iso-cert">
        <i class="fas fa-certificate"></i>
    </div>
    <h4>ISO 9001:2015</h4>
    <p>Quality Management System</p>
</div>
```

### Section Layouts

```html
<section class="section-py-lg section-bg-light">
    <div class="container">
        <h2 class="section-title">Our Products</h2>
        <p class="section-subtitle">
            Industry-leading actuators and automation solutions
        </p>
        <!-- Section content -->
    </div>
</section>
```

### Hero Section

```html
<section class="hero-advanced">
    <div class="container">
        <div class="hero-grid">
            <div class="hero-panel">
                <span class="eyebrow">Industry Leader Since 1993</span>
                <h1>Industrial Valve Automation</h1>
                <p class="lead">Precision-engineered actuators...</p>
                <div class="hero-cta">
                    <button class="btn btn-primary btn-lg">Get Started</button>
                    <button class="btn btn-outline btn-lg">Learn More</button>
                </div>
            </div>
            <div class="hero-media">
                <img src="..." class="hero-image" alt="...">
            </div>
        </div>
    </div>
</section>
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base styles: Mobile (0-640px) */

@media (min-width: 641px) {
    /* Tablet: 641px - 1024px */
}

@media (min-width: 1025px) {
    /* Desktop: 1025px - 1440px */
}

@media (min-width: 1441px) {
    /* Large Desktop: 1441px+ */
}

/* Specific Breakpoints */
--breakpoint-xs: 0px;
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

---

## ♿ Accessibility Guidelines

### Touch Targets

- **Minimum size:** 44x44px for all interactive elements
- All buttons, links, and form controls meet this requirement
- Mobile menu items have enhanced touch targets

### Color Contrast

- **Text on white:** Minimum 4.5:1 (WCAG AA)
- **Large text (18px+):** Minimum 3:1
- Primary red (#c41e3a) meets AA for large text
- Dark navy (#1a2942) meets AAA for all text

### Focus States

```css
/* All interactive elements have visible focus states */
button:focus,
a:focus,
input:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}
```

### Semantic HTML

- Use proper heading hierarchy (h1 → h6)
- ARIA labels on navigation dropdowns
- Alt text on all images
- Proper form labels

---

## 💡 Usage Examples

### Creating a Product Section

```html
<section class="products-preview section-py-xl">
    <div class="container">
        <h2 class="section-title">Our Product Range</h2>
        <p class="section-subtitle">
            Comprehensive automation solutions for every industry
        </p>
        
        <div class="products-grid">
            <div class="product-card">
                <div class="product-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <h3>Electric Actuators</h3>
                <p>Precision control with low maintenance requirements.</p>
                <a href="/products/electric" class="product-link">
                    Explore <i class="fas fa-arrow-right"></i>
                </a>
            </div>
            <!-- More product cards -->
        </div>
    </div>
</section>
```

### Applying Spacing

```html
<!-- Section with large vertical padding -->
<section class="py-20">
    <!-- Content -->
</section>

<!-- Centered container with auto margins -->
<div class="container mx-auto">
    <!-- Content -->
</div>

<!-- Grid with consistent gaps -->
<div class="features-grid gap-6">
    <!-- Grid items -->
</div>
```

### Typography Combinations

```html
<!-- Hero Title -->
<h1 class="font-extrabold text-primary leading-tight tracking-tight">
    Transform Your Operations
</h1>

<!-- Section Subtitle -->
<p class="text-xl text-secondary leading-relaxed">
    Industry-leading solutions since 1993
</p>

<!-- Card Description -->
<p class="text-base text-tertiary leading-normal">
    Detailed product information...
</p>
```

---

## 🚀 Performance Best Practices

### Critical CSS
- Design tokens and typography loaded first
- Above-the-fold styles prioritized
- Non-critical styles loaded asynchronously

### Animation Performance
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Apply `will-change` sparingly to critical animations only
- Prefer CSS transitions over JavaScript animations

### Image Optimization
- Use responsive images (`srcset`, `sizes`)
- Apply `loading="lazy"` for below-fold images
- Compress images (WebP format preferred)

---

## 📝 Notes

- **Always use design tokens** instead of hardcoded values
- **Follow the 8px grid system** for spacing
- **Test on mobile devices** to ensure touch targets are accessible
- **Maintain color contrast** ratios for accessibility
- **Use semantic HTML** for better SEO and accessibility

---

**Questions or Updates?**  
Refer to `css/style.css` for complete implementation details.  
For component additions, follow existing patterns and naming conventions.
