# 🔐 Login System - Quick Start Guide

## Overview
Complete employee authentication system with database backend for Susin Group website.

## Features
✅ Secure login modal with modern UI  
✅ User authentication with password hashing  
✅ Session management  
✅ Role-based access (Admin, HR, Manager, Employee)  
✅ Login attempt tracking  
✅ Remember me functionality  
✅ Mobile responsive design  

## Quick Setup (3 Steps)

### Step 1: Database Setup
```bash
# Option A: Automatic Setup (Recommended)
1. Open browser and go to: http://localhost/first-Project/backend/setup.php
2. Click "Run Setup"
3. Done! Default users are created automatically

# Option B: Manual Setup
1. Open phpMyAdmin or MySQL client
2. Run: backend/database_schema.sql
3. Run: backend/database_schema_auth.sql
```

### Step 2: Configure Database
Edit `backend/config/database.php` if needed:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'susin_careers');
define('DB_USER', 'root');
define('DB_PASS', '');
```

### Step 3: Test Login
1. Open `index.html` in browser
2. Click "Login" button in header
3. Use credentials:
   - **Admin**: admin / Admin@123
   - **HR**: hr_user / HR@123456
   - **Employee**: employee1 / Employee@123

## Default Users

| Username | Password | Role | Email |
|----------|----------|------|-------|
| admin | Admin@123 | Administrator | admin@susin.in |
| hr_user | HR@123456 | HR Manager | hr@susin.in |
| employee1 | Employee@123 | Employee | employee@susin.in |

**⚠️ Change passwords after first login!**

## File Structure
```
backend/
├── auth/
│   ├── login.php           # Login handler
│   ├── logout.php          # Logout handler
│   ├── register.php        # User registration
│   └── check_session.php   # Session checker
├── dashboard/
│   └── index.php           # Employee dashboard
├── config/
│   └── database.php        # Database config
├── setup.php               # Auto setup script
├── database_schema.sql     # Main database
└── database_schema_auth.sql # Auth tables

css/
└── login.css               # Login modal styles

js/
└── login.js                # Login functionality
```

## Usage

### For End Users
1. Click "Login" button in header
2. Enter username and password
3. Click "Login"
4. Access dashboard based on role

### For Developers

**Check if user is logged in:**
```javascript
fetch('/backend/auth/check_session.php')
  .then(res => res.json())
  .then(data => {
    if (data.logged_in) {
      console.log('User:', data.user);
    }
  });
```

**Logout programmatically:**
```javascript
fetch('/backend/auth/logout.php')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      window.location.href = '/index.html';
    }
  });
```

## API Endpoints

### POST /backend/auth/login.php
Login user
```json
{
  "username": "admin",
  "password": "Admin@123"
}
```

### GET /backend/auth/logout.php
Logout current user

### GET /backend/auth/check_session.php
Check login status

### POST /backend/auth/register.php
Register new user (admin only)

## Security Features
- ✅ Password hashing (bcrypt)
- ✅ SQL injection protection (PDO)
- ✅ XSS prevention
- ✅ Session management
- ✅ Login attempt tracking
- ✅ Account lockout (configurable)

## Troubleshooting

**Login button not visible:**
- Check if `css/login.css` is loaded
- Verify `js/login.js` is included

**"Connection error":**
- Ensure PHP server is running
- Check database credentials
- Verify MySQL is running

**"Invalid username or password":**
- Check user exists in database
- Verify password is correct
- Check `login_attempts` table

**Session not persisting:**
- Check PHP session configuration
- Enable browser cookies

## Next Steps

1. **Change Default Passwords**
2. **Create Additional Users** via register.php
3. **Build Dashboard Features**
4. **Implement Password Reset**
5. **Add Two-Factor Authentication** (optional)

## Support
- IT Support: it@susin.in
- Documentation: `backend/LOGIN_SETUP_GUIDE.md`

---
**Version:** 1.0  
**Status:** Production Ready  
**Last Updated:** November 23, 2025
