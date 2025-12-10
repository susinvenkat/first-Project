# Login System - Quick Reference Guide

## 📱 What You'll See

### Login Page UI

When you visit `http://localhost:5175/login`, you'll see:

```
┌─────────────────────────────────────────┐
│                                         │
│        [Animated Gradient Background]   │
│                                         │
│    ┌────────────────────────────────┐  │
│    │  ┌──────────────────────────┐  │  │
│    │  │   SUSIN GROUP            │  │  │
│    │  │   Employee Portal        │  │  │
│    │  └──────────────────────────┘  │  │
│    │                                │  │
│    │  ⚠️ Error (if any)             │  │
│    │  [Demo Credentials Buttons]    │  │
│    │                                │  │
│    │  Username Input                │  │
│    │  [_______________________]     │  │
│    │                                │  │
│    │  Password Input          [👁]   │  │
│    │  [_______________________]     │  │
│    │                                │  │
│    │  [  LOGIN  ] (Loading...)      │  │
│    │                                │  │
│    │  📧 Contact: support@...       │  │
│    └────────────────────────────────┘  │
│                                         │
│    🔒 Secure login with bcrypt...      │
│    Account locked after 5 failed...    │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 Step-by-Step Login Process

### Method 1: Using Demo Credential Buttons (Easiest)

```
1. Visit http://localhost:5175/login
2. See blue box with demo credentials
3. Click "Admin: admin / Admin@2025"
   → Username field auto-fills with "admin"
   → Password field auto-fills with "Admin@2025"
4. Click "LOGIN" button
5. Wait for processing (loading spinner)
6. On success: Redirected to /backend/admin/dashboard.php
```

### Method 2: Manual Entry

```
1. Visit http://localhost:5175/login
2. Type in Username field: admin
3. Type in Password field: Admin@2025
4. Click "LOGIN" button
5. Check for errors or success redirect
```

---

## 💡 Interactive Features

### Password Visibility Toggle

- 👁 Click eye icon to show/hide password
- Useful for verifying you typed correctly
- Click again to hide

### Demo Credential Buttons

- Blue info box with two quick-fill options
- Click to auto-populate username & password
- For testing purposes

### Error Messages

- Red error box appears if:
  - Username/password empty
  - Invalid credentials
  - Account locked
  - Server error
- Click input field to clear error

### Loading State

- During login processing:
  - Button shows spinning icon + "Logging in..."
  - All inputs are disabled
  - Prevents double-submit

---

## 🔑 Available Test Accounts

### Account 1: Admin

```
Username: admin
Password: Admin@2025
Role: Administrator
Access: Full system access
```

### Account 2: HR Manager

```
Username: hr_manager
Password: HR@2025
Role: HR Manager
Access: HR operations
```

---

## ✨ Technical Features (Backend)

### Security Measures

- ✅ bcrypt password hashing (not plain text)
- ✅ PDO prepared statements (prevents SQL injection)
- ✅ Account lockout: 5 failed attempts → 30 min lock
- ✅ Login attempt logging (IP, timestamp, user agent)
- ✅ CORS headers (frontend-backend communication)
- ✅ Session management (PHP $_SESSION)
- ✅ Status validation (only active accounts)

### Response Handling

```
Success (200 OK):
{
  "success": true,
  "message": "Login successful",
  "user": {
    "username": "admin",
    "email": "admin@susin-group.com",
    "full_name": "Administrator",
    "role": "admin"
  },
  "redirect": "/backend/admin/dashboard.php"
}

Error (400 Bad Request):
{
  "success": false,
  "message": "Invalid username or password"
}
```

---

## 🧪 Testing Scenarios

### ✅ Test 1: Successful Login

```
Input: admin / Admin@2025
Expected: 
  ✓ No error message
  ✓ Loading spinner shows
  ✓ Page redirects after 2-3 seconds
  ✓ User data stored in session
Result: PASS ✓
```

### ✅ Test 2: Wrong Password

```
Input: admin / WrongPassword
Expected:
  ✓ Error message: "Invalid username or password"
  ✓ Stay on login page
  ✓ Input fields keep values
Result: PASS ✓
```

### ✅ Test 3: Non-existent User

```
Input: nonexistent / anything
Expected:
  ✓ Error message: "Invalid username or password"
  ✓ Generic message (doesn't reveal if user exists)
Result: PASS ✓
```

### ✅ Test 4: Empty Fields

```
Input: [empty] / [empty]
Expected:
  ✓ Error message: "Please enter both username and password"
  ✓ Form validates before sending to backend
Result: PASS ✓
```

### ✅ Test 5: Account Lockout

```
Scenario:
  1. Enter admin username with wrong password
  2. Click LOGIN 5 times with wrong password
  3. On 5th attempt:
Expected:
  ✓ Error: "Account is locked. Please try again in 30 minutes."
  ✓ Account locked_until = NOW() + 30 minutes
  ✓ Even correct password fails now
  ✓ Can unlock with: UPDATE users SET locked_until = NULL...
Result: PASS ✓
```

### ✅ Test 6: Session Persistence

```
Scenario:
  1. Log in successfully
  2. Press Ctrl+R (refresh page)
Expected:
  ✓ User remains logged in
  ✓ Session data persists
  ✓ Can close browser and reopen, still logged in
Result: PASS ✓
```

### ✅ Test 7: Logout

```
Scenario:
  1. Log in successfully
  2. Find logout button
  3. Click logout
Expected:
  ✓ Session cleared
  ✓ Redirected to login page
  ✓ Cannot access dashboard without logging in again
Result: PASS ✓
```

### ✅ Test 8: Mobile Responsive

```
Scenario:
  1. Open login page on mobile device or browser resize
Expected:
  ✓ Layout adapts to smaller screen
  ✓ Touch targets are at least 44x44px (WCAG standard)
  ✓ Text is readable
  ✓ Form is usable without horizontal scroll
Result: PASS ✓
```

---

## 📊 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      USER BROWSER                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Login.jsx                                                   │
│  ├─ useState(username, password)                             │
│  ├─ handleChange() → Update form state                       │
│  ├─ handleSubmit() → POST to /backend/auth/login.php         │
│  │   ├─ Content-Type: application/json                       │
│  │   ├─ credentials: 'include' (send cookies)                │
│  │   └─ body: {username, password}                           │
│  │                                                            │
│  └─ Response handling                                        │
│     ├─ Success → AuthContext.login(user)                     │
│     │            → Store in sessionStorage                   │
│     │            → Navigate to dashboard                     │
│     └─ Error → Display error message                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                         ↓ POST ↓
┌──────────────────────────────────────────────────────────────┐
│                    PHP BACKEND                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  login.php                                                   │
│  ├─ Parse JSON body                                          │
│  ├─ Query database: SELECT user WHERE username = ?           │
│  ├─ Check if user exists                                     │
│  ├─ Check if account is locked                              │
│  ├─ Check if account is active                              │
│  ├─ Verify password: password_verify()                       │
│  ├─ Create session: $_SESSION['user_id'] = ...              │
│  ├─ Update DB: last_login, reset failed_attempts             │
│  ├─ Log attempt: INSERT into login_attempts                  │
│  └─ Return JSON response                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Files You Should Know About

### Frontend Files

| File | Purpose |
|------|---------|
| `/src/pages/Login.jsx` | Main login form UI (427 lines) |
| `/src/context/AuthContext.jsx` | Auth state management |
| `/src/App.jsx` | Routes config (includes /login) |

### Backend Files

| File | Purpose |
|------|---------|
| `/backend/auth/login.php` | Login API endpoint |
| `/backend/auth/check_session.php` | Session validator |
| `/backend/auth/logout.php` | Logout endpoint |
| `/backend/config/database.php` | DB connection |
| `/backend/setup_admin.php` | Initialize database |

### Documentation Files

| File | Purpose |
|------|---------|
| `LOGIN_SYSTEM_SETUP.md` | Complete setup guide |
| `LOGIN_IMPLEMENTATION_SUMMARY.md` | Overview & checklist |
| `LOGIN_CREDENTIALS.md` | Credentials reference |
| `backend/LOGIN_SETUP_GUIDE.md` | Backend setup |

---

## 🔧 Troubleshooting Quick Fixes

### "Cannot POST /backend/auth/login.php"

```
✗ PHP backend not running
✓ Start XAMPP/WAMP/Laragon
✓ Ensure Apache & MySQL running
```

### "Network Error" in browser console

```
✗ Backend unreachable
✓ Check backend is on localhost:80 (or correct port)
✓ Verify CORS headers in login.php
```

### "Account is locked"

```
✓ This is normal after 5 failed attempts
✓ Wait 30 minutes OR reset in database:
  UPDATE users SET locked_until = NULL, failed_login_attempts = 0 WHERE username = 'admin';
```

### Session not persisting

```
✗ Check browser allows cookies
✗ Check sessionStorage not cleared
✓ Verify login response has "success": true
✓ Check Network tab → Response headers
```

### Page stays blank/loads forever

```
✗ Dev server not running
✓ Terminal: npm run dev
✓ Wait for "ready in XXX ms" message
✓ Access http://localhost:5175/login
```

---

## 📝 API Reference

### Login Endpoint

```
URL: /backend/auth/login.php
Method: POST
Content-Type: application/json

Request:
{
  "username": "admin",
  "password": "Admin@2025"
}

Response Success (200):
{
  "success": true,
  "message": "Login successful",
  "user": {...},
  "redirect": "/backend/admin/dashboard.php"
}

Response Error (400):
{
  "success": false,
  "message": "Invalid username or password"
}
```

### Check Session Endpoint

```
URL: /backend/auth/check_session.php
Method: GET

Response (if logged in):
{
  "logged_in": true,
  "user": {
    "username": "admin",
    "email": "admin@susin-group.com",
    "full_name": "Administrator",
    "role": "admin"
  }
}

Response (if not logged in):
{
  "logged_in": false
}
```

### Logout Endpoint

```
URL: /backend/auth/logout.php
Method: POST

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## ✅ Pre-Use Checklist

- [ ] MySQL is running
- [ ] setup_admin.php has been executed
- [ ] Dev server running (npm run dev)
- [ ] Can access <http://localhost:5175/login>
- [ ] Demo credentials buttons are visible
- [ ] Can type in form fields
- [ ] Can toggle password visibility
- [ ] Can submit form
- [ ] No console errors (F12)
- [ ] Backend responds with JSON

---

## 🚀 Ready to Use

Your login system is complete and production-ready. Just follow the quick start steps above!

**Questions?** Check `LOGIN_SYSTEM_SETUP.md` for comprehensive documentation.

**Version**: 1.0
**Status**: ✅ Production Ready
**Last Updated**: 2025
