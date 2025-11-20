# Susin Group Industrial Actuators Website - AI Coding Guidelines

## Project Overview
This is a comprehensive industrial website for Susin Group, a valve automation company with 32+ years of experience. The site showcases industrial actuators, gearboxes, and motion control solutions with a complete backend application system for careers/resume management.

## Architecture & Structure

### Frontend Architecture
- **Static HTML Site**: Multi-page site with shared navigation and modern responsive design
- **CSS Framework**: Custom CSS with mobile-first approach, GPU-accelerated animations
- **JavaScript**: Vanilla JS with modular functions, no external frameworks
- **Navigation**: Complex mega-dropdown system with 8 navigation sections and mobile hamburger menu
- **Assets**: Organized image structure in `assets/img/` with industry-specific folders

### Backend System (PHP/MySQL)
- **Database**: MySQL with two main tables: `applications` (job applications) and `activity_log` (audit trail)
- **API Endpoint**: `backend/api/submit_application.php` handles resume uploads and form processing
- **Admin Dashboard**: `backend/admin/index.php` for HR team to manage applications
- **File Uploads**: PDF resume storage in `uploads/resumes/` with 5MB limit and type validation

## Key Development Patterns

### HTML Structure Convention
```html
<!-- All pages follow this header pattern -->
<header class="modern-header">
    <div class="header-top-bar">
        <!-- Company credentials and contact info -->
    </div>
    <nav class="main-navigation">
        <!-- 8 mega-dropdown navigation items -->
    </nav>
</header>
```

### CSS Organization
- **Mobile-First**: All styles start with mobile and use `@media` queries for desktop
- **Component-Based**: Each section has specific classes (`.modern-header`, `.video-flash-slider`, `.products-preview`)
- **Performance**: Use `will-change` and `contain` properties for GPU acceleration
- **Brand Colors**: Primary `#c41e3a` (red), secondary `#1a2942` (dark blue)

### JavaScript Patterns
```javascript
// All JS follows this initialization pattern
document.addEventListener('DOMContentLoaded', () => {
    initializeHeaderFunctionality();
    initializeMenuFeatures();
    // Additional module initialization...
});
```

### Database Integration
- **PDO with Prepared Statements**: All database queries use PDO for security
- **File Upload Security**: Validate file types, sizes, and sanitize filenames
- **Session Management**: Simple session-based admin authentication

## Critical Developer Workflows

### Development Setup
1. **XAMPP/WAMP Required**: Backend needs PHP 7.4+ and MySQL
2. **Database Setup**: Run `backend/database_schema.sql` to create tables
3. **Upload Directory**: Ensure `uploads/resumes/` is writable (755 permissions)
4. **Configuration**: Update database credentials in `backend/config/database.php`

### Testing Workflow
```powershell
# Local development server
php -S localhost:8000
# Or use XAMPP and access via localhost/first-Project/
```

### Image Asset Management
- **PowerShell Scripts**: Use `scripts/download_certification_images.ps1` for placeholder generation
- **Directory Structure**: Organized by industry (`oil-gas/`, `marine/`, `pharmaceutical/`)
- **Optimization**: Images should be web-optimized, use `loading="lazy"` attribute

### Form Processing Pipeline
1. **Frontend**: AJAX submission from `careers.html` with file upload progress
2. **Backend**: `submit_application.php` validates, stores file, saves to database
3. **Admin**: Dashboard shows applications with status management and download capability

## Project-Specific Conventions

### Navigation System
- **8 Mega Dropdowns**: Products, Global Presence, Industries, Services, About, Careers, Resources, Contact
- **ARIA Compliance**: All dropdowns have proper `aria-haspopup`, `aria-expanded`, `role="menu"`
- **Mobile Hamburger**: Transforms into full-screen overlay on mobile devices
- **Active State**: Automatically highlights current page navigation

### SEO & Performance Patterns
```html
<!-- Every page includes structured data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Susin Group"
  // ... company details
}
</script>
```

### Security Implementations
- **Input Sanitization**: All user inputs processed through `filter_var()` and `htmlspecialchars()`
- **File Validation**: Only PDF files allowed, MIME type checking, filename sanitization
- **SQL Injection Protection**: PDO prepared statements throughout backend
- **XSS Prevention**: Output escaping in admin dashboard

## Integration Points

### External Dependencies
- **Font Awesome 6.4.0**: Icons loaded from CDN
- **Google Fonts**: Preconnected for performance
- **Video CDN**: Coverr.co videos for hero slider backgrounds

### Cross-Component Communication
```javascript
// Global site configuration
window.SITE_CONFIG = {
    employeeLoginUrl: '', // Set for production SSO
    searchEndpoint: '/assets/search/search-index.json'
};
```

### Email Integration (Optional)
- **SMTP Configuration**: Can be enabled in `backend/api/submit_application.php`
- **Notification System**: HR email alerts when applications submitted

## File System Patterns

### Static Assets Organization
```
assets/
├── img/
│   ├── certifications/     # ISO, ATEX, API certificates
│   ├── industries/         # Industry-specific images
│   └── products/          # Product category images
└── search/
    └── search-index.json  # Site search data
```

### Backend File Structure
```
backend/
├── config/database.php    # Database connection & config
├── api/submit_application.php  # Form processing endpoint
├── admin/index.php       # HR dashboard
└── database_schema.sql   # Database setup script
```

## Common Tasks & Commands

### Adding New Product Categories
1. Add new section to `products.html` with consistent HTML structure
2. Update navigation dropdown in all HTML files
3. Add corresponding images to `assets/img/products/[category]/`
4. Update `assets/search/search-index.json` for search functionality

### Career Form Modifications
- **Frontend Changes**: Modify `careers.html` form structure
- **Backend Changes**: Update `submit_application.php` processing logic
- **Database Changes**: Alter `applications` table schema if needed

### Mobile Menu Updates
- **HTML**: Update `.primary-nav` structure in header
- **CSS**: Modify `.mobile-menu-active` styles for new items
- **JS**: Ensure `initializeMobileNav()` handles new navigation elements

Remember: This is a professional industrial website requiring attention to technical accuracy, SEO optimization, and robust backend functionality. Always test form submissions and database operations in development before deploying changes.