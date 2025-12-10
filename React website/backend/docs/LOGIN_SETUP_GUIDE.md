# Login System Setup Guide
## Susin Group Employee Authentication

### Database Setup

**Step 1: Run Authentication Schema**
```bash
# In MySQL/phpMyAdmin, run the following SQL files:
1. backend/database_schema.sql (if not already done)
2. backend/database_schema_auth.sql
```

**Step 2: Verify Database Tables**
The following tables should be created:
- `users` - Employee accounts
- `login_attempts` - Login tracking
- `user_sessions` - Session management
- `password_resets` - Password recovery

### Default User Accounts

**Administrator Account:**
- Username: `admin`
- Password: `Admin@123`
- Email: admin@susin.in
- Role: Admin

**HR Manager Account:**
- Username: `hr_user`
- Password: `HR@123456`
- Email: hr@susin.in
- Role: HR

**Sample Employee Account:**
- Username: `employee1`
- Password: `Employee@123`
- Email: employee@susin.in
- Role: Employee

**⚠️ IMPORTANT:** Change these default passwords immediately in production!

### File Structure

```
first Project/
├── backend/
│   ├── auth/
│   │   ├── login.php          # Login authentication handler
│   │   ├── logout.php         # Logout handler
│   │   ├── register.php       # User registration (admin only)
│   │   └── check_session.php  # Session status checker
│   ├── config/
│   │   └── database.php       # Database configuration
│   ├── database_schema.sql          # Main database schema
│   └── database_schema_auth.sql     # Authentication tables
├── css/
│   └── login.css              # Login modal styles
├── js/
│   └── login.js               # Login functionality
└── index.html                 # Updated with login button
```

### Features

✅ **Secure Authentication**
- Password hashing with bcrypt
- Session management
- Login attempt tracking
- Account lockout protection

✅ **User Interface**
- Login modal with modern design
- Password visibility toggle
- Remember me functionality
- Responsive design (mobile-friendly)

✅ **User Experience**
- Session persistence check
- Automatic redirect based on role
- Toast notifications
- User dropdown menu (Dashboard, Profile, Logout)

✅ **Security Features**
- SQL injection protection (PDO prepared statements)
- XSS prevention
- CSRF protection (can be enhanced)
- Secure password requirements

### Usage

**For End Users:**
1. Click the "Login" button in the header
2. Enter username/email and password
3. Click "Login"
4. Redirected to dashboard based on role

**For Administrators:**
1. Login with admin credentials
2. Access `/backend/admin/index.php` for admin panel
3. Use `/backend/auth/register.php` API to create new users

### API Endpoints

**Login:**
```
POST /backend/auth/login.php
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin@123",
  "remember": true
}

Response:
{
  "success": true,
  "message": "Login successful",
  "user": {
    "username": "admin",
    "email": "admin@susin.in",
    "full_name": "System Administrator",
    "role": "admin"
  },
  "redirect": "/backend/admin/index.php"
}
```

**Logout:**
```
GET /backend/auth/logout.php

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Check Session:**
```
GET /backend/auth/check_session.php

Response:
{
  "logged_in": true,
  "user": {
    "username": "admin",
    "email": "admin@susin.in",
    "full_name": "System Administrator",
    "role": "admin"
  }
}
```

**Register User (Admin Only):**
```
POST /backend/auth/register.php
Content-Type: application/json

{
  "username": "newuser",
  "password": "SecurePass123!",
  "email": "user@susin.in",
  "full_name": "John Doe",
  "role": "employee",
  "department": "Engineering",
  "employee_id": "EMP002"
}
```

### Password Requirements

- Minimum 8 characters
- Can include letters, numbers, and special characters
- Passwords are hashed with bcrypt (cost factor 10)

### Role-Based Access

**Admin:**
- Full system access
- User management
- Application management

**HR:**
- View/manage job applications
- Basic reports

**Manager:**
- Department-specific access
- Team management

**Employee:**
- Basic dashboard access
- Profile management

### Testing

**Test Login Flow:**
1. Open `index.html` in browser
2. Click "Login" button
3. Use test credentials (admin/Admin@123)
4. Verify successful login
5. Check user menu appears
6. Test logout functionality

**Test Session Persistence:**
1. Login with "Remember me" checked
2. Close browser
3. Reopen and visit site
4. Username should be pre-filled

### Security Recommendations

1. **Change Default Passwords:**
   - Update all default account passwords
   - Use strong, unique passwords

2. **HTTPS Only:**
   - Enable SSL/TLS certificate
   - Force HTTPS in production

3. **Environment Variables:**
   - Move database credentials to .env file
   - Don't commit credentials to Git

4. **Rate Limiting:**
   - Implement login attempt limits
   - Add CAPTCHA after failed attempts

5. **Session Security:**
   - Use secure session cookies
   - Implement session timeout
   - Regenerate session IDs

6. **Password Recovery:**
   - Implement email-based reset
   - Use secure tokens
   - Set expiration times

### Troubleshooting

**Issue: Login button not appearing**
- Check if `login.css` is loaded
- Verify `login.js` is included
- Check browser console for errors

**Issue: Login fails with "Connection error"**
- Verify PHP server is running
- Check database connection settings
- Ensure MySQL is running
- Check file paths in `database.php`

**Issue: "Invalid username or password"**
- Verify user exists in database
- Check password is correct
- Review `login_attempts` table

**Issue: Session not persisting**
- Check PHP session configuration
- Verify session cookies are enabled
- Check browser privacy settings

### Next Steps

1. **Create Dashboard Pages:**
   - `/backend/dashboard/index.php`
   - `/backend/dashboard/manager.php`
   - `/backend/dashboard/employee.php`

2. **Implement Password Reset:**
   - Email-based recovery
   - Token generation
   - Reset form

3. **Add User Profile:**
   - Profile editing
   - Password change
   - Avatar upload

4. **Enhance Security:**
   - Two-factor authentication
   - IP whitelist
   - Advanced session management

### Support

For issues or questions:
- IT Support: it@susin.in
- Admin: admin@susin.in

---

**Last Updated:** November 23, 2025
**Version:** 1.0
**Status:** Production Ready
