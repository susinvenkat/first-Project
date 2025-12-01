# MongoDB Backend Setup Guide

## Overview
This backend uses **Node.js**, **Express**, and **MongoDB** to handle authentication and user management for the Susin Group career portal.

---

## Prerequisites

### Install MongoDB

Choose one of these options:

#### Option 1: MongoDB Atlas (Cloud - Recommended for Production)
1. Visit [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string
5. Update `.env` with your connection string

#### Option 2: MongoDB Local Installation
1. Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install MongoDB Community Server
3. Start MongoDB service:
   ```powershell
   net start MongoDB
   ```
4. Connection string will be: `mongodb://localhost:27017/susin_careers`

---

## Installation Steps

### 1. Install Dependencies
```powershell
cd backend
npm install
```

### 2. Configure Environment
Edit the `backend/.env` file with your settings:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/susin_careers
# OR for Atlas: mongodb+srv://username:password@cluster.mongodb.net/susin_careers

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-me

# Session Secret (change this!)
SESSION_SECRET=your-super-secret-session-key-change-me

# Session Settings
SESSION_EXPIRES_MS=86400000
SESSION_COOKIE_NAME=connect.sid

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 3. Initialize Database
Run the setup script to create collections and default users:

```powershell
npm run setup
```

This creates:
- ✓ Database collections with indexes
- ✓ Admin user: `admin` / `Admin@2025`
- ✓ HR Manager: `hr_manager` / `HR@2025`

### 4. Start the Server

**Development mode** (auto-restart on changes):
```powershell
npm run dev
```

**Production mode**:
```powershell
npm start
```

Server will run on: `http://localhost:3000`

---

## API Endpoints

### Health Check
```
GET /api/health
```
Returns: `{ "status": "OK", "message": "MongoDB backend is running" }`

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin@2025"
}
```

### Check Session
```
GET /api/auth/check-session
```

### Logout
```
POST /api/auth/logout
```

---

## Testing the Backend

### 1. Test Health Endpoint
```powershell
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "MongoDB backend is running"
}
```

### 2. Test Login
```powershell
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"username":"admin","password":"Admin@2025"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "username": "admin",
    "email": "admin@susingroup.com",
    "role": "admin"
  }
}
```

---

## Connecting Frontend to Backend

The Vite proxy is already configured in `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true
  }
}
```

This means frontend requests to `/api/*` will proxy to `http://localhost:3000/api/*`

### Update Login Page

In `src/pages/Login.jsx`, switch from Mock Mode to Backend Mode:
- Toggle the switch at the top of the login form
- Use credentials: `admin` / `Admin@2025`

---

## Default Users

| Username | Password | Role | Email |
|----------|----------|------|-------|
| admin | Admin@2025 | admin | admin@susingroup.com |
| hr_manager | HR@2025 | hr | hr@susingroup.com |

**⚠️ IMPORTANT:** Change these default passwords after first login!

---

## Troubleshooting

### MongoDB Connection Issues

**Error: Connection refused**
- Check if MongoDB is running: `net start MongoDB`
- Verify connection string in `.env`
- For Atlas: check IP whitelist and database user permissions

**Error: Authentication failed**
- Verify username/password in connection string
- Check database user permissions in MongoDB Atlas

### Server Won't Start

**Port already in use**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <process_id> /F
```

**Missing dependencies**
```powershell
cd backend
npm install
```

### Login Fails

**Check if database is set up:**
```powershell
npm run setup
```

**Check server logs:**
- Look for error messages in terminal
- Verify MongoDB connection status
- Check credentials match database

---

## Project Structure

```
backend/
├── server.js              # Main Express server
├── setup_mongodb.js       # Database initialization
├── package.json           # Dependencies & scripts
├── .env                   # Configuration (DO NOT COMMIT)
├── .env.example           # Example configuration
├── config/
│   └── mongodb.js         # MongoDB connection
└── auth/
    ├── login_mongodb.js   # Login handler
    ├── logout_mongodb.js  # Logout handler
    └── check_session_mongodb.js  # Session check
```

---

## Database Collections

### users
Stores user accounts with authentication data

### user_sessions
Tracks active user sessions

### login_attempts
Records failed login attempts for security

### applications
Stores job applications (for future use)

### activity_log
Logs user activities (for future use)

---

## Security Features

✓ Password hashing with bcrypt  
✓ Account lockout after 5 failed attempts (30 min)  
✓ Session-based authentication  
✓ HTTP-only cookies  
✓ CORS protection  
✓ Failed login tracking  

---

## Next Steps

1. ✅ Install MongoDB (local or Atlas)
2. ✅ Run `npm install` in backend folder
3. ✅ Configure `.env` file
4. ✅ Run `npm run setup` to initialize database
5. ✅ Run `npm run dev` to start server
6. ✅ Test health endpoint
7. ✅ Test login with default credentials
8. ✅ Switch frontend to Backend Mode
9. ✅ Change default passwords!

---

## Support

For issues or questions, refer to:
- MongoDB Documentation: https://docs.mongodb.com/
- Express Documentation: https://expressjs.com/
- Node.js Documentation: https://nodejs.org/docs/

---

**Last Updated:** 2025
**Version:** 1.0.0
