# Susin Group Industrial Actuators Website

Professional industrial website for Susin Group - a valve automation company with 32+ years of experience, showcasing industrial actuators, gearboxes, and motion control solutions.

## 🏗️ Project Structure

```
first-Project/
├── assets/              # Static assets (images, search index)
│   ├── img/            # All image resources
│   │   ├── certifications/
│   │   ├── industries/
│   │   ├── products/
│   │   └── global-presence/
│   └── search/         # Site search functionality
├── backend/            # PHP backend system
│   ├── admin/          # HR admin dashboard
│   ├── api/            # REST API endpoints
│   ├── config/         # Database configuration
│   └── README.md       # Backend documentation
├── css/                # Stylesheets
├── js/                 # JavaScript modules
├── scripts/            # PowerShell utility scripts
├── uploads/            # User-uploaded files (resumes)
├── global-presence/    # Regional office pages
├── docs/               # Project documentation
│   ├── reports/        # Audit and analysis reports
│   └── guides/         # Implementation guides
└── archive/            # Historical source files
```

## 🚀 Quick Start

### Prerequisites
- **Web Server**: Apache/Nginx or XAMPP/WAMP
- **PHP**: 7.4 or higher
- **MySQL**: 5.7+ or MariaDB
- **Browser**: Modern browser with ES6 support

### Local Development Setup

1. **Clone/Download** the project to your local machine

2. **Database Setup**:
   ```bash
   mysql -u root -p < backend/database_schema.sql
   ```

3. **Configure Database**:
   Edit `backend/config/database.php` with your credentials:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'your_username');
   define('DB_PASSWORD', 'your_password');
   define('DB_NAME', 'susin_careers');
   ```

4. **Set Permissions**:
   ```bash
   chmod 755 uploads/resumes/
   ```

5. **Start Development Server**:
   - **XAMPP/WAMP**: Place project in `htdocs/` and access via `localhost/first-Project/`
   - **PHP Built-in**: `php -S localhost:8000`

6. **Access Admin Dashboard**:
   - URL: `http://localhost/first-Project/backend/admin/`
   - Username: `admin`
   - Password: `SusinHR2025!`

## 🎯 Key Features

### Frontend
- ✅ Responsive mega-dropdown navigation (8 sections)
- ✅ Mobile-first design with hamburger menu
- ✅ Industry-specific product showcases
- ✅ Global office locations (India, UAE, Qatar)
- ✅ Customer logo trust section (BHEL, NTPC, KAHRAMAA, etc.)
- ✅ Video hero slider with lazy loading
- ✅ Search functionality
- ✅ SEO optimized with structured data

### Backend System
- ✅ Job application submission API
- ✅ PDF resume upload (5MB max)
- ✅ HR admin dashboard with search/filter
- ✅ Application status management (New, Reviewed, Shortlisted, Rejected, Hired)
- ✅ Activity logging and audit trail
- ✅ Session-based authentication
- ✅ Email notifications (optional)

### Performance Optimizations
- ✅ Font Awesome async loading
- ✅ Image lazy loading with srcsets
- ✅ Gzip compression via .htaccess
- ✅ Browser caching (1 year for images)
- ✅ Deferred JavaScript execution
- ✅ Resource hints (preconnect, dns-prefetch)

### Security
- ✅ PDO prepared statements (SQL injection protection)
- ✅ Input sanitization and validation
- ✅ File type/size validation for uploads
- ✅ XSS protection with htmlspecialchars()
- ✅ Security headers in .htaccess
- ✅ Session-based admin authentication

## 📄 Page Structure

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Main landing page with hero, customer logos |
| Products | `products.html` | Product catalog (Electric, Pneumatic, Hydraulic, Gearboxes) |
| Industries | `industries.html` | Industries served overview |
| About | `about.html` | Company information and history |
| Careers | `careers.html` | Job listings with application form |
| Contact | `contact.html` | Contact information and inquiry form |
| Resources | `resources.html` | Technical documents and downloads |
| Services | `services.html` | Installation, maintenance, repair services |
| Global Offices | `global-presence/` | Regional office details (India, UAE, Qatar) |

## 🛠️ Development Tools

### Scripts
- **optimize-performance.ps1**: Performance audit script (in `/scripts`)
  ```powershell
  .\scripts\optimize-performance.ps1
  ```

### VS Code Configuration
Workspace includes:
- Terminal auto-approve enabled
- All audio cues disabled
- Recommended extensions for web development

## 📚 Documentation

Comprehensive documentation available in `/docs`:

### Reports (`/docs/reports`)
- Performance audits
- Navigation verification
- SEO optimization reports

### Guides (`/docs/guides`)
- Implementation summaries
- Security best practices
- SEO quick reference
- Menu functionality documentation

## 🔐 Admin Dashboard

Access the HR admin panel at `/backend/admin/` to:
- View all job applications
- Search and filter candidates
- Update application status
- Download resumes (PDF)
- View application statistics
- Track activity logs

Default credentials:
- Username: `admin`
- Password: `SusinHR2025!`
- **⚠️ Change in production!**

## 🌐 Production Deployment

1. **Update Database Credentials**: Edit `backend/config/database.php`
2. **Change Admin Password**: Update in `backend/admin/index.php`
3. **Configure Email**: Set SMTP settings in `backend/api/submit_application.php`
4. **Set Proper Permissions**: 
   - Files: 644
   - Directories: 755
   - Uploads: 755 (writable by web server)
5. **Enable HTTPS**: Update .htaccess for SSL redirect
6. **Test All Forms**: Especially career application submission
7. **Verify .htaccess**: Ensure server recognizes Apache directives

## 🧪 Testing Checklist

- [ ] All navigation links work (desktop/tablet/mobile)
- [ ] Mega-dropdown menus function properly
- [ ] Career form submits successfully
- [ ] PDF resume upload works (test 5MB limit)
- [ ] Admin dashboard authentication works
- [ ] Application status updates save correctly
- [ ] Mobile hamburger menu opens/closes
- [ ] Images load with lazy loading
- [ ] Font Awesome icons display correctly
- [ ] Search functionality works

## 📊 Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Create a new branch for features
2. Test thoroughly on multiple devices
3. Update documentation if needed
4. Ensure no console errors

## 📞 Support

For technical issues or questions, refer to:
- Backend documentation: `/backend/README.md`
- Security guidelines: `/docs/guides/SECURITY.md`
- SEO optimization: `/docs/guides/SEO-QUICK-REFERENCE.md`

## 📝 License

Copyright © Susin Group. All rights reserved.

## 🔄 Recent Updates

- ✅ Backend database system implemented (Nov 2025)
- ✅ Performance optimizations applied (Font Awesome async, .htaccess)
- ✅ Navigation click functionality fixed (desktop/tablet/mobile)
- ✅ Project structure organized (docs/, archive/, scripts/)
- ✅ Customer logos section added to homepage
- ✅ UTF-8 encoding fixes applied

---

**Version**: 1.0  
**Last Updated**: November 2025  
**Developed for**: Susin Group Industrial Actuators
