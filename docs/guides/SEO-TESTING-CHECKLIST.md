# SEO & Mobile Optimization Testing Checklist
## Susin Group Website - Validation Guide

**Last Updated:** 2025-11-17  
**Pages to Test:** 17 HTML pages

---

## 🔍 Google Search Console Tests

### 1. Rich Results Test
**URL:** https://search.google.com/test/rich-results

**Test Each Page Type:**
- [ ] Homepage (index.html) - Organization + WebSite + BreadcrumbList schemas
- [ ] About page - AboutPage + BreadcrumbList schemas
- [ ] Products page - CollectionPage + BreadcrumbList schemas
- [ ] Services page - Service + BreadcrumbList schemas
- [ ] Contact page - ContactPage + BreadcrumbList schemas
- [ ] Industries page - WebPage + BreadcrumbList schemas
- [ ] Resources page - CollectionPage + BreadcrumbList schemas
- [ ] Careers page - JobPosting + BreadcrumbList schemas

**Expected Results:**
✅ All schemas detected and valid  
✅ No errors in structured data  
✅ Breadcrumbs show proper hierarchy  

---

## 📱 Mobile-Friendly Tests

### 2. Google Mobile-Friendly Test
**URL:** https://search.google.com/test/mobile-friendly

**Test Pages:**
- [ ] index.html
- [ ] about.html
- [ ] products.html
- [ ] services.html
- [ ] contact.html

**Check For:**
✅ "Page is mobile-friendly" result  
✅ No tap target issues  
✅ No content wider than screen  
✅ Text is readable without zooming  

---

## 🚀 Performance Tests

### 3. Google PageSpeed Insights
**URL:** https://pagespeed.web.dev/

**Test Key Pages:**
- [ ] Homepage (index.html)
- [ ] Products page
- [ ] Contact page

**Target Metrics:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **Performance Score:** > 90 (Mobile & Desktop)

**Check For:**
✅ Lazy loading working correctly  
✅ Images properly optimized  
✅ CSS not blocking render  
✅ JavaScript efficiently loaded  

---

## 🌐 Social Media Validation

### 4. Facebook Sharing Debugger
**URL:** https://developers.facebook.com/tools/debug/

**Test All Main Pages:**
- [ ] index.html
- [ ] about.html
- [ ] products.html
- [ ] services.html
- [ ] contact.html
- [ ] industries.html
- [ ] resources.html
- [ ] careers.html

**Verify:**
✅ Image displays (1200x630 dimensions)  
✅ Title shows correctly  
✅ Description is complete  
✅ URL is canonical  
✅ No missing required properties  

**Action:** Click "Scrape Again" to fetch latest data

---

### 5. Twitter Card Validator
**URL:** https://cards-dev.twitter.com/validator

**Test Key Pages:**
- [ ] Homepage
- [ ] Products
- [ ] About
- [ ] Contact

**Verify:**
✅ Card type: summary_large_image  
✅ Image preview displays  
✅ Title and description appear  
✅ Site attribution (@susingroup)  

---

### 6. LinkedIn Post Inspector
**URL:** https://www.linkedin.com/post-inspector/

**Test Business Pages:**
- [ ] Homepage
- [ ] About
- [ ] Products
- [ ] Careers

**Verify:**
✅ Image displays correctly  
✅ Title is compelling  
✅ Description is professional  
✅ No errors reported  

---

## ✅ HTML Validation

### 7. W3C Markup Validation
**URL:** https://validator.w3.org/

**Validate All 17 Pages:**

**Main Pages:**
- [ ] index.html
- [ ] about.html
- [ ] products.html
- [ ] services.html
- [ ] industries.html
- [ ] contact.html
- [ ] careers.html
- [ ] resources.html

**Subpages:**
- [ ] products-actuators-gearboxes.html
- [ ] services-installation-maintenance.html
- [ ] about-industrial-actuators.html
- [ ] industries-served.html
- [ ] resources-technical-docs.html
- [ ] contact-support-sales.html

**Accept:**
✅ 0 errors  
⚠️ Minor warnings acceptable (e.g., empty headings if by design)  

---

## 📐 Schema Markup Validation

### 8. Schema.org Validator
**URL:** https://validator.schema.org/

**Test Structured Data:**
- [ ] Organization schema (homepage)
- [ ] WebSite schema (homepage)
- [ ] BreadcrumbList (all pages)
- [ ] Product schema (product pages)
- [ ] Service schema (service pages)
- [ ] JobPosting schema (careers page)

**Verify:**
✅ No errors in JSON-LD syntax  
✅ All required properties present  
✅ Valid URLs and data types  

---

## 📊 Accessibility Testing

### 9. WAVE Web Accessibility Evaluation
**URL:** https://wave.webaim.org/

**Test Key Pages:**
- [ ] Homepage
- [ ] Products
- [ ] Contact
- [ ] Careers

**Check For:**
✅ All images have alt text  
✅ Proper heading hierarchy (H1 → H2 → H3)  
✅ Color contrast ratios meet WCAG AA standards  
✅ Form labels properly associated  
✅ Skip links functional  

**Target:** 0 errors, minimal alerts

---

## 📱 Device Testing

### 10. Real Device Testing

**Test on Actual Devices:**

**Mobile Phones:**
- [ ] iPhone (iOS Safari)
- [ ] Android Phone (Chrome)
- [ ] Samsung Device (Samsung Internet)

**Tablets:**
- [ ] iPad (Safari)
- [ ] Android Tablet (Chrome)

**Test Scenarios:**
- [ ] Navigation menu opens/closes smoothly
- [ ] All buttons/links are tappable (44x44px minimum)
- [ ] Forms are easy to fill (inputs don't cause zoom)
- [ ] Images load with lazy loading
- [ ] Page scrolls smoothly
- [ ] No horizontal scrolling
- [ ] Text is readable without zooming

**Portrait & Landscape:**
- [ ] Test both orientations
- [ ] Verify header adjusts properly in landscape

---

## 🔎 Browser Testing

### 11. Cross-Browser Compatibility

**Desktop Browsers:**
- [ ] Chrome (Windows)
- [ ] Firefox (Windows)
- [ ] Edge (Windows)
- [ ] Safari (Mac)

**Mobile Browsers:**
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Firefox (Android)
- [ ] Samsung Internet (Android)

**Check Each Browser:**
✅ CSS renders correctly  
✅ Fonts load properly  
✅ Images display  
✅ JavaScript functions work  
✅ No console errors  

---

## 🎯 Manual SEO Checks

### 12. Meta Tag Verification

**On Each Page, Verify:**
- [ ] **Title Tag:** 50-60 characters, unique, keyword-rich
- [ ] **Meta Description:** 150-160 characters, compelling, includes ✓ symbols
- [ ] **Canonical URL:** Correct and absolute
- [ ] **Viewport Meta:** Includes max-scale and user-scalable
- [ ] **Open Graph:** All required properties present
- [ ] **Twitter Cards:** Complete implementation

**Example Check (index.html):**
```html
✅ <title>Industrial Actuators & Gearboxes | Advanced Motion Control Solutions | Susin Group</title>
✅ <meta name="description" content="Leading manufacturer...">
✅ <link rel="canonical" href="https://www.susingroup.com/index.html">
✅ <meta property="og:image:width" content="1200">
✅ <meta property="og:image:height" content="630">
✅ <meta name="twitter:card" content="summary_large_image">
```

---

## 📈 Google Search Console Monitoring

### 13. Post-Deployment Monitoring

**Week 1 After Deployment:**
- [ ] Submit updated sitemap.xml to GSC
- [ ] Request indexing for key pages
- [ ] Monitor "Coverage" report for errors
- [ ] Check "Mobile Usability" for issues
- [ ] Review "Core Web Vitals" metrics

**Week 2-4:**
- [ ] Monitor "Enhancements" for Rich Results
- [ ] Check "Structured Data" for errors
- [ ] Review impressions and CTR changes
- [ ] Monitor position changes for target keywords

**Ongoing (Monthly):**
- [ ] Track mobile vs desktop traffic ratio
- [ ] Monitor page load times
- [ ] Check for crawl errors
- [ ] Review top performing pages

---

## 🖼️ Image Optimization Checks

### 14. Image Quality & Performance

**Verify on All Pages:**
- [ ] All images have `alt` attributes
- [ ] Below-fold images use `loading="lazy"`
- [ ] Key images use `decoding="async"`
- [ ] Social sharing image (og-image.jpg) is 1200x630px
- [ ] Hero images have `fetchpriority="high"` (if applicable)
- [ ] No images are larger than necessary

**Social Sharing Image:**
- [ ] Create branded og-image.jpg (1200x630px)
- [ ] Upload to /assets/img/og-image.jpg
- [ ] Verify image displays in social debuggers

---

## 🔗 Link & Navigation Testing

### 15. Navigation & Link Checks

**Test All Pages:**
- [ ] All internal links work (no 404s)
- [ ] External links open in new tab (if desired)
- [ ] Breadcrumb navigation displays correctly
- [ ] Mobile menu opens/closes properly
- [ ] Dropdowns/submenus function on touch devices
- [ ] Footer links are accessible

**Tools:**
- Check My Links (Chrome Extension)
- Screaming Frog SEO Spider (for comprehensive crawl)

---

## 📝 Content Quality Checks

### 16. Content Review

**On Each Page:**
- [ ] Headings follow proper hierarchy (H1 → H2 → H3)
- [ ] Only one H1 per page
- [ ] Content is unique (no duplicate content)
- [ ] Keywords used naturally (not stuffed)
- [ ] CTAs (Call-to-Actions) are clear
- [ ] Contact information is up-to-date

**Readability:**
- [ ] Short paragraphs (3-4 lines)
- [ ] Bullet points used for lists
- [ ] Important info highlighted (✓ symbols used)
- [ ] No walls of text on mobile

---

## 🎨 Visual Design Checks (Mobile)

### 17. Mobile Design Quality

**Test on 375px width (iPhone SE):**
- [ ] Logo displays properly
- [ ] Navigation is accessible
- [ ] Text is readable (16px minimum)
- [ ] Buttons are easily tappable
- [ ] Forms are user-friendly
- [ ] Images scale correctly
- [ ] No content cutoff
- [ ] Proper spacing between elements

**Test on 768px width (iPad):**
- [ ] Layout adapts to tablet size
- [ ] Grid columns adjust (3-col → 2-col)
- [ ] Navigation shows appropriate version
- [ ] Images are properly sized

---

## 🔐 Security & Technical Checks

### 18. Technical SEO

**Verify:**
- [ ] HTTPS enabled on all pages
- [ ] No mixed content warnings
- [ ] Canonical URLs use HTTPS
- [ ] Robots.txt allows crawling
- [ ] Sitemap.xml is up-to-date
- [ ] 404 page exists and is helpful

**Security Headers:**
- [ ] Content-Security-Policy (recommended)
- [ ] X-Content-Type-Options
- [ ] X-Frame-Options

---

## ✅ Final Checklist Summary

### Critical Items (Must Pass):
- ✅ All 17 pages pass Mobile-Friendly Test
- ✅ Rich Results Test shows no errors
- ✅ Open Graph tags validated on Facebook Debugger
- ✅ Twitter Cards display correctly
- ✅ HTML validates with 0 errors
- ✅ All images have alt text
- ✅ Structured data validates on schema.org
- ✅ PageSpeed score > 85 on mobile

### Important Items (Should Pass):
- ✅ No accessibility errors on WAVE
- ✅ All browsers render correctly
- ✅ Touch targets meet 44x44px minimum
- ✅ Font sizes prevent zoom on iOS
- ✅ Breadcrumbs display in GSC
- ✅ Social sharing images are 1200x630

### Nice-to-Have Items:
- ⚠️ PageSpeed score > 90
- ⚠️ Core Web Vitals all "Good"
- ⚠️ Featured snippets obtained
- ⚠️ Rich results displayed in search

---

## 📋 Testing Schedule

**Immediate (Day 1):**
1. Run Rich Results Test on all pages
2. Validate HTML on W3C Validator
3. Test Facebook sharing on 5 main pages
4. Run Mobile-Friendly Test on 5 main pages

**Week 1:**
1. Complete all device testing
2. Run PageSpeed Insights on all pages
3. Test on all browsers
4. Complete accessibility testing

**Week 2:**
1. Monitor Google Search Console
2. Check for crawl errors
3. Review structured data reports
4. Monitor Core Web Vitals

**Monthly:**
1. Re-test PageSpeed
2. Check mobile usability reports
3. Review search performance
4. Update content as needed

---

## 🎯 Success Metrics

**Targets to Achieve:**

**SEO:**
- All structured data validates with 0 errors
- Rich results appear in search within 2-4 weeks
- Breadcrumbs display in search results
- Social sharing previews work on all platforms

**Mobile:**
- 100% mobile-friendly score on Google test
- All tap targets meet 44x44px requirement
- No zoom required on any device
- Smooth scrolling on all pages

**Performance:**
- Mobile PageSpeed > 85
- Desktop PageSpeed > 90
- LCP < 2.5 seconds
- CLS < 0.1

**Accessibility:**
- WAVE reports 0 errors
- All images have alt text
- Proper heading hierarchy
- Keyboard navigation works

---

## 📞 Support & Resources

**Testing Tools:**
- Google Search Console: https://search.google.com/search-console
- Rich Results Test: https://search.google.com/test/rich-results
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- PageSpeed Insights: https://pagespeed.web.dev/
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- W3C Validator: https://validator.w3.org/
- Schema.org Validator: https://validator.schema.org/
- WAVE Accessibility: https://wave.webaim.org/

**Documentation:**
- Schema.org Documentation: https://schema.org/docs/documents.html
- Open Graph Protocol: https://ogp.me/
- Twitter Cards Guide: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards

---

**Checklist Version:** 1.0  
**Created:** 2025-11-17  
**For:** Susin Group Website SEO & Mobile Optimization  

**Note:** Check items as completed. Retest monthly to ensure ongoing compliance.
