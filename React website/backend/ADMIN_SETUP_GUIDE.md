# 🚀 Susin Group Admin System - Complete Guide

## Overview
A complete admin authentication and control panel system for managing job applications, documents, users, and system settings.

---

## 🎯 Features

### ✅ User Authentication
- Secure login with password hashing (bcrypt)
- Account lockout after 5 failed attempts (30 minutes)
- Session management
- Remember me functionality
- Login attempt tracking

### ✅ Role-Based Access Control
- **Admin**: Full system access
- **HR Manager**: Application and user management
- **Manager**: View and edit applications
- **Employee**: View-only access

### ✅ Admin Dashboard
- Real-time statistics
- Application overview
- Recent activities
- Status tracking

### ✅ Control Panel
- User profile management
- Password change
- System settings
- Activity logs
- User management

---

## 📋 Installation Steps

### Step 1: Setup Database

1. **Access the setup page:**
   ```
   http://localhost/backend/setup_admin.php
   ```

2. The setup script will automatically:
   - Create all required database tables
   - Insert default admin user
   - Insert default HR manager
   - Configure system settings

3. **Default Credentials:**

   **Admin Account:**
   - Username: `admin`
   - Password: `Admin@2025`
   - Email: `admin@susingroup.com`

   **HR Manager Account:**
   - Username: `hr_manager`
   - Password: `HR@2025`
   - Email: `hr@susingroup.com`

4. **Important:** Delete `setup_admin.php` after successful installation!

### Step 2: Database Configuration

Update `backend/config/database.php` with your database credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'susin_careers');
define('DB_USER', 'root');
define('DB_PASS', '');
```

### Step 3: File Permissions

Ensure proper permissions for upload directory:
```bash
chmod 755 backend/uploads/resumes/
```

---

## 🔐 Login & Access

### Login Page
```
http://localhost/backend/auth/login_page.html
```

### Admin Dashboard
```
http://localhost/backend/admin/dashboard.php
```

### Settings Panel
```
http://localhost/backend/admin/settings.php
```

---

## 📊 Database Tables

### 1. **users**
Stores user account information
- id, username, password, email, full_name
- role, department, status
- failed_login_attempts, locked_until
- last_login, created_at

### 2. **login_attempts**
Tracks all login attempts
- username, user_id, success
- ip_address, user_agent, failure_reason
- attempt_time

### 3. **user_sessions**
Manages active user sessions
- user_id, session_id
- ip_address, user_agent
- created_at, expires_at, is_active

### 4. **applications**
Job application data (from existing schema)

### 5. **documents**
Application documents (from existing schema)

---

## 🛠️ File Structure

```
backend/
├── auth/
│   ├── login.php              # Login API endpoint
│   ├── login_page.html        # Modern login UI
│   ├── logout.php             # Logout handler
│   ├── check_session.php      # Session verification
│   └── register.php           # User registration
│
├── admin/
│   ├── dashboard.php          # Main admin dashboard
│   ├── settings.php           # Control panel & settings
│   ├── users.php              # User management (to create)
│   ├── applications.php       # Application management
│   └── documents.php          # Document management
│
├── api/
│   ├── upload_document.php    # File upload API
│   ├── download_document.php  # File download API
│   ├── list_documents.php     # List documents
│   ├── delete_document.php    # Delete document
│   └── verify_document.php    # Verify document
│
├── config/
│   └── database.php           # Database configuration
│
├── setup_admin.php            # One-time setup script
└── database_schema_auth.sql   # SQL schema
```

---

## 🎨 Dashboard Features

### Main Dashboard (dashboard.php)
- **Statistics Cards:**
  - Total Applications
  - Shortlisted Candidates
  - Under Review
  - New Applications
  
- **Recent Applications Table**
  - Name, Position, Date, Status
  - Quick actions
  
- **Application Status Chart**
  - Visual progress bars
  - Percentage breakdown

### Settings & Control Panel (settings.php)
- **Profile Settings:**
  - Update name, email, phone
  - View role and department
  
- **Security Settings:**
  - Change password
  - Password requirements
  - Account lockout info
  
- **System Information:**
  - Active users count
  - Total applications
  - Login statistics
  - Database info
  - PHP version

---

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- Uppercase and lowercase letters
- At least one number
- At least one special character

### Account Protection
- Passwords hashed with bcrypt
- 5 failed attempts = 30 minute lockout
- Session timeout
- IP address logging
- User agent tracking

### Admin-Only Features
- User management
- Role assignments
- System settings
- Activity logs
- Full control panel access

---

## 🚨 Troubleshooting

### Issue: Cannot login
**Solutions:**
1. Verify credentials (case-sensitive)
2. Check if account is locked (wait 30 minutes)
3. Ensure database is setup correctly
4. Check PHP session settings

### Issue: Setup page not working
**Solutions:**
1. Check database connection in `config/database.php`
2. Ensure MySQL service is running
3. Verify database name exists
4. Check PHP error logs

### Issue: Permission denied
**Solutions:**
1. Check file permissions on upload directory
2. Ensure web server user has write access
3. Verify PHP `upload_max_filesize` setting

---

## 📝 Next Steps

### Recommended Actions After Setup:

1. **Change Default Passwords:**
   - Login as admin
   - Go to Settings → Security
   - Change password immediately

2. **Create Additional Users:**
   - Go to User Management
   - Add HR staff
   - Assign appropriate roles

3. **Configure System Settings:**
   - Email settings
   - File upload limits
   - Application statuses

4. **Test Functionality:**
   - Create test application
   - Upload document
   - Change status
   - Download files

5. **Delete Setup File:**
   ```bash
   rm backend/setup_admin.php
   ```

---

## 🎯 User Roles & Permissions

### Super Admin
- ✅ All permissions
- ✅ User management
- ✅ System settings
- ✅ Database access
- ✅ Activity logs

### Admin
- ✅ Most permissions
- ✅ User management
- ✅ Application management
- ✅ Settings access
- ❌ System backup

### HR Manager
- ✅ View/Edit applications
- ✅ Upload/Verify documents
- ✅ View users
- ✅ Reports access
- ❌ System settings

### Manager
- ✅ View applications
- ✅ Change status
- ✅ View documents
- ❌ User management
- ❌ Settings

### Employee
- ✅ View applications
- ✅ View documents
- ❌ Edit anything
- ❌ User management

---

## 📞 Support

For issues or questions:
- Email: admin@susingroup.com
- Check PHP error logs
- Review database connection settings
- Verify file permissions

---

## 🔄 Updates & Maintenance

### Regular Tasks:
- Review login attempts weekly
- Update passwords monthly
- Backup database regularly
- Monitor disk space for uploads
- Review and clean old sessions

### Database Cleanup:
```sql
-- Clean old login attempts (older than 90 days)
DELETE FROM login_attempts WHERE attempt_time < DATE_SUB(NOW(), INTERVAL 90 DAY);

-- Clean expired sessions
DELETE FROM user_sessions WHERE expires_at < NOW();
```

---

## ✨ Features Coming Soon

- [ ] Two-factor authentication (2FA)
- [ ] Email notifications
- [ ] Advanced reporting
- [ ] Bulk actions
- [ ] Export functionality
- [ ] API documentation
- [ ] Mobile app support

---

**Version:** 1.0.0  
**Last Updated:** November 2025  
**Author:** Susin Group IT Team  
**License:** Proprietary

---

## 🎉 You're All Set!

The admin system is now ready to use. Login with the default credentials and start managing your applications!

**Login URL:** http://localhost/backend/auth/login_page.html
