# 🔐 Login System Setup Guide

## Quick Start

### Step 1: Run Database Setup

1. Open your browser and navigate to:

   ```text
   http://localhost/backend/setup_admin.php
   ```

   OR if you're using a different port:

   ```text
   http://localhost:5000/backend/setup_admin.php
   ```

2. The script will:
   - Create database tables (users, login_attempts, user_sessions)
   - Create default admin and HR users
   - Display all credentials

### Step 2: Default Login Credentials

#### Admin Account

- **Username:** `admin`
- **Password:** `Admin@2025`
- **Email:** `admin@susingroup.com`
- **Role:** Administrator (Full access)

#### HR Manager Account

- **Username:** `hr_manager`
- **Password:** `HR@2025`
- **Email:** `hr@susingroup.com`
- **Role:** HR Manager (Application management)

### Step 3: Access Login Page

```
http://localhost/backend/auth/login.php
```

---

## Database Requirements

### MySQL Database Setup

```sql
CREATE DATABASE susin_careers;
USE susin_careers;
```

### Configuration File

Edit `/backend/config/database.php`:

```php
define('DB_HOST', 'localhost');      // Your MySQL host
define('DB_NAME', 'susin_careers');  // Database name
define('DB_USER', 'root');           // MySQL username
define('DB_PASS', '');               // MySQL password (empty for local dev)
```

---

## Features

### Security Features ✅

- Password hashing with bcrypt
- Account lockout after 5 failed attempts (30 minutes)
- Session management
- Login attempt logging
- CORS headers for API requests
- Input validation and sanitization

### User Management

- Role-based access control (Admin, HR, Manager, Employee)
- User status (active, inactive, suspended)
- Last login tracking
- Failed login attempt tracking
- Account lockout mechanism

### Database Tables

#### users

```
id, username, password, email, full_name, employee_id, role, 
department, phone, status, created_at, last_login, 
password_changed_at, failed_login_attempts, locked_until
```

#### login_attempts

```
id, username, user_id, success, ip_address, user_agent, 
failure_reason, attempt_time
```

#### user_sessions

```
id, user_id, session_id, ip_address, user_agent, 
created_at, expires_at, is_active
```

---

## API Endpoints

### Login API

**POST** `/backend/auth/login.php`

#### Request

```json
{
  "username": "admin",
  "password": "Admin@2025"
}
```

#### Success Response (200)

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "username": "admin",
    "email": "admin@susingroup.com",
    "full_name": "System Administrator",
    "role": "admin"
  },
  "redirect": "/backend/admin/dashboard.php"
}
```

#### Error Response (400)

```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

### Logout API

**POST** `/backend/auth/logout.php`

---

## Troubleshooting

### Database Connection Error

**Issue:** "Database connection failed"

**Solutions:**

1. Check MySQL is running
2. Verify database credentials in `/backend/config/database.php`
3. Ensure database `susin_careers` exists
4. Check MySQL user permissions

### Login Failed / Invalid Credentials

**Issue:** Login always fails even with correct credentials

**Solutions:**

1. Run setup script again: `http://localhost/backend/setup_admin.php`
2. Check if users table exists: `SELECT * FROM users;`
3. Verify password hashing: `SELECT password FROM users WHERE username='admin';`
4. Check user status: `UPDATE users SET status='active' WHERE username='admin';`

### Account Locked

**Issue:** "Account is locked. Please try again in X minutes"

**Solutions:**

1. Wait 30 minutes for automatic unlock, OR
2. Unlock manually:

   ```sql
   UPDATE users SET locked_until = NULL, failed_login_attempts = 0 
   WHERE username = 'admin';
   ```

### CORS Error

**Issue:** Login request blocked by CORS

**Solutions:**

- The API already has CORS headers configured
- Make sure requests are from same domain or add domain to whitelist

---

## Security Best Practices

1. **Change Default Passwords** ⚠️
   - Change admin password immediately after first login
   - Change HR manager password immediately

2. **Delete Setup File**
   - Remove `setup_admin.php` after installation for security

3. **Regular Backups**
   - Backup your database regularly
   - Store backups securely

4. **Monitor Login Attempts**
   - Check `login_attempts` table regularly
   - Look for suspicious IP addresses

5. **Update Credentials**
   - Change passwords periodically
   - Use strong passwords (min 8 characters, mixed case, numbers, symbols)

---

## Creating Additional Users

### Via Database

```sql
INSERT INTO users (username, password, email, full_name, role, status, created_at) 
VALUES (
  'newuser',
  '$2y$10$...',  -- bcrypt hashed password
  'user@example.com',
  'New User Name',
  'employee',
  'active',
  NOW()
);
```

### Password Hash Generation (PHP)

```php
$password = 'SecurePassword123';
$hash = password_hash($password, PASSWORD_DEFAULT);
echo $hash;
```

---

## Dashboard Access

### Admin Dashboard

URL: `/backend/admin/dashboard.php`
Access: Admin, HR, Manager roles

### Employee Dashboard

URL: `/backend/dashboard/index.php`
Access: Employee role

---

## Important Files

| File | Purpose |
|------|---------|
| `setup_admin.php` | One-time setup script |
| `auth/login.php` | Login API endpoint |
| `auth/logout.php` | Logout handler |
| `config/database.php` | Database configuration |
| `admin/dashboard.php` | Admin panel |
| `dashboard/index.php` | Employee panel |

---

## Support

For issues or questions:

1. Check this documentation
2. Review error messages in browser console (F12)
3. Check MySQL error logs
4. Verify all files are properly uploaded

---

**Last Updated:** November 30, 2025
**Version:** 1.0
**Status:** ✅ Production Ready
