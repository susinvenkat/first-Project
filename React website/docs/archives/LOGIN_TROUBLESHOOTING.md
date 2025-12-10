# Login Page Troubleshooting Guide

## Current Issue
The login page is not working because the PHP backend is not running.

## Quick Fix Options

### Option 1: Set Up PHP Backend (Recommended for Full Functionality)

**Prerequisites:**
- XAMPP, WAMP, or Laragon installed
- Apache and MySQL running

**Steps:**

1. **Start Your PHP Server**
   - Open XAMPP Control Panel
   - Start Apache
   - Start MySQL

2. **Copy Backend Files**
   ```bash
   # Copy the entire backend folder to your web server root
   # For XAMPP: C:\xampp\htdocs\
   # For WAMP: C:\wamp64\www\
   # For Laragon: C:\laragon\www\
   
   cp -r "C:\Users\mecve\Desktop\first Project\React website\backend" "C:\xampp\htdocs\"
   ```

3. **Set Up Database**
   - Open browser: http://localhost/backend/setup_admin.php
   - This will create all necessary database tables and default users
   
4. **Test Login Credentials**
   - **Admin:** username: `admin` / password: `Admin@2025`
   - **HR Manager:** username: `hr_manager` / password: `HR@2025`

5. **Update Vite Proxy (if needed)**
   The vite.config.js already has proxy configuration. Restart your dev server:
   ```bash
   npm run dev
   ```

6. **Test Login**
   - Navigate to: http://localhost:5174/login
   - Use the demo credentials above

### Option 2: Mock Backend for Development (Quick Test)

If you don't want to set up PHP backend right now, you can use a mock login for testing:

**Update Login.jsx to use mock authentication:**
- This allows you to test the UI without backend
- Data won't persist (only for testing)

### Option 3: Deploy Backend Separately

If you're deploying to production:
1. Deploy React app to Vercel/Netlify
2. Deploy PHP backend to hosting with PHP/MySQL support
3. Update API endpoints in the React app

## Current Backend Endpoints

The React app tries to call:
- `/backend/auth/login.php` - User login
- `/backend/auth/logout.php` - User logout  
- `/backend/auth/check_session.php` - Session verification

## Vite Proxy Configuration

Current proxy setup in `vite.config.js`:
```javascript
proxy: {
  '/backend': {
    target: 'http://localhost',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/backend/, '/backend')
  }
}
```

This proxies all `/backend/*` requests to `http://localhost/backend/*`

## Testing Without Backend

You can temporarily test the UI by:

1. **Disable authentication checks in Header.jsx**
2. **Mock the AuthContext**
3. **Skip API calls in Login.jsx**

Would you like me to create a development-only mock version?

## Common Errors

### Error: "Backend server not configured"
**Solution:** Install and run XAMPP/WAMP, then follow Option 1 above

### Error: "Failed to fetch"
**Solution:** Check if Apache is running on port 80

### Error: "CORS policy blocked"
**Solution:** The PHP files already have CORS headers. Restart Apache.

### Error: "Connection refused"
**Solution:** 
- Check if Apache is running
- Verify port 80 is not blocked
- Check Windows Firewall settings

## Next Steps

1. Choose which option above fits your needs
2. For production: Set up proper PHP hosting
3. For development: Use XAMPP locally or create mock version

## Need Help?

Let me know which option you'd like to proceed with:
- Full backend setup (I can guide you through XAMPP installation)
- Mock version for UI testing only
- Different deployment strategy
