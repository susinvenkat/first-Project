# Resume Management System - Backend Setup Guide

## Overview
This backend system manages job applications and resume submissions for Susin Group careers page.

## Features
- Resume file upload (PDF only, max 5MB)
- Applicant information storage
- Application status tracking
- Admin dashboard for HR team
- Activity logging
- Email notifications

## Installation Steps

### 1. Database Setup
```bash
# Import the database schema
mysql -u root -p < backend/database_schema.sql
```

Or manually:
1. Open phpMyAdmin or MySQL command line
2. Create database: `CREATE DATABASE susin_careers;`
3. Import `backend/database_schema.sql`

### 2. Configure Database Connection
Edit `backend/config/database.php`:
```php
define('DB_HOST', 'localhost');      // Your MySQL host
define('DB_NAME', 'susin_careers');  // Database name
define('DB_USER', 'root');           // MySQL username
define('DB_PASS', '');               // MySQL password
```

### 3. File Upload Directory
Ensure the uploads directory is writable:
```bash
mkdir -p uploads/resumes
chmod 755 uploads/resumes
```

### 4. Email Configuration
Edit `backend/config/database.php` for email settings:
```php
define('HR_EMAIL', 'hr@susin.in');           // HR notification email
define('FROM_EMAIL', 'careers@susingroup.com');  // Sender email
```

For production, configure SMTP in `backend/api/submit_application.php`

### 5. Update Careers Form
The careers.html form already includes the necessary fields. Just update the form action:
```html
<form id="careerForm" action="backend/api/submit_application.php" method="POST" enctype="multipart/form-data">
```

## Admin Dashboard Access

### URL
`http://yoursite.com/backend/admin/`

### Default Credentials
- **Username:** admin
- **Password:** SusinHR2025!

**⚠️ IMPORTANT:** Change these credentials in `backend/admin/index.php` before deploying to production!

```php
define('ADMIN_USERNAME', 'your_username');
define('ADMIN_PASSWORD', 'your_secure_password');
```

## API Endpoints

### Submit Application
- **URL:** `/backend/api/submit_application.php`
- **Method:** POST
- **Content-Type:** multipart/form-data

**Parameters:**
- `name` (required) - Full name
- `email` (required) - Email address
- `phone` (optional) - Phone number
- `role` (required) - Job role
- `resume` (optional) - PDF file
- `message` (optional) - Cover letter/message

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully!",
  "application_id": 123
}
```

## Database Tables

### applications
Stores all job applications with personal details, resume path, and status.

**Columns:**
- id, name, email, phone, role
- resume_filename, resume_path
- message, application_date
- status (new, reviewed, shortlisted, rejected, hired)
- notes, ip_address, user_agent

### activity_log
Tracks all activities related to applications.

**Columns:**
- id, application_id
- action, description
- created_at

## Security Features
- SQL injection protection (PDO prepared statements)
- Input sanitization
- File type validation (PDF only)
- File size limits (5MB max)
- XSS protection
- Session-based admin authentication

## Production Deployment Checklist

- [ ] Change admin credentials
- [ ] Configure proper SMTP for email notifications
- [ ] Set up SSL/HTTPS
- [ ] Configure proper file permissions (755 for directories, 644 for files)
- [ ] Set up database backups
- [ ] Configure error logging
- [ ] Remove demo/test data
- [ ] Test file upload functionality
- [ ] Test email notifications
- [ ] Review security settings

## Troubleshooting

### File Upload Issues
- Check `upload_max_filesize` in php.ini (should be >= 5MB)
- Check `post_max_size` in php.ini (should be >= 6MB)
- Verify uploads directory is writable: `chmod 755 uploads/resumes`

### Database Connection Issues
- Verify MySQL credentials in database.php
- Ensure MySQL service is running
- Check database exists: `SHOW DATABASES;`

### Email Not Sending
- Configure proper SMTP settings
- Use PHPMailer library for reliable email delivery
- Check spam folders

## Support
For technical support, contact: admin@susingroup.com
