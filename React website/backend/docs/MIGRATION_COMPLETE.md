# Backend Migration Complete - MongoDB Setup

## ✅ What Was Done

Successfully migrated the backend from **PHP/MySQL** to **Node.js/MongoDB**:

### 1. Backend Infrastructure

- ✅ Created Express server (`server.js`)
- ✅ Configured MongoDB connection (`config/mongodb.js`)
- ✅ Set up environment configuration (`.env`)
- ✅ Added proper CORS and session middleware

### 2. Authentication System

- ✅ Converted login handler to MongoDB (`auth/login_mongodb.js`)
- ✅ Converted logout handler to MongoDB (`auth/logout_mongodb.js`)
- ✅ Converted session check to MongoDB (`auth/check_session_mongodb.js`)
- ✅ Fixed variable name error in logout handler

### 3. Database Setup

- ✅ Created database initialization script (`setup_mongodb.js`)
- ✅ Configured collections: users, user_sessions, login_attempts, applications, activity_log
- ✅ Added database indexes for performance
- ✅ Seeding script for default users (admin, hr_manager)

### 4. NPM Configuration

- ✅ Installed all required packages (131 packages, 0 vulnerabilities)
- ✅ Added npm scripts: `start`, `dev`, `setup`
- ✅ Installed nodemon for development

### 5. Frontend Integration

- ✅ Updated Vite proxy to point to Node.js backend (port 3000)
- ✅ Changed proxy path from `/backend` to `/api`

---

## 📦 Installed Packages

```json
{
  "dependencies": {
    "bcryptjs": "^3.0.3",          // Password hashing
    "cookie-parser": "^1.4.7",     // Cookie parsing
    "cors": "^2.8.5",              // Cross-origin support
    "dotenv": "^17.2.3",           // Environment variables
    "express": "^5.1.0",           // Web framework
    "express-session": "^1.18.2",  // Session management
    "jsonwebtoken": "^9.0.2",      // JWT tokens
    "mongodb": "^7.0.0"            // MongoDB driver
  },
  "devDependencies": {
    "nodemon": "^3.0.0"            // Auto-restart dev server
  }
}
```

---

## 🚀 How to Use

### Step 1: Install MongoDB

Choose one option:

**Option A: MongoDB Atlas (Cloud - Recommended)**

1. Visit <https://www.mongodb.com/cloud/atlas>
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env`:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/susin_careers
   ```

**Option B: Local MongoDB**

1. Download from <https://www.mongodb.com/try/download/community>
2. Install MongoDB Community Server
3. Start service: `net start MongoDB`
4. Use default connection in `.env`:

   ```env
   MONGODB_URI=mongodb://localhost:27017/susin_careers
   ```

### Step 2: Configure Environment

Edit `backend/.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/susin_careers
JWT_SECRET=change-this-to-something-secure
SESSION_SECRET=change-this-to-something-secure
PORT=3000
NODE_ENV=development
```

### Step 3: Initialize Database

Run setup script:

```powershell
cd backend
npm run setup
```

This creates default users:

- **Admin:** username: `admin`, password: `Admin@2025`
- **HR Manager:** username: `hr_manager`, password: `HR@2025`

### Step 4: Start Backend Server

**Development mode** (auto-restarts on changes):

```powershell
cd backend
npm run dev
```

**Production mode:**

```powershell
cd backend
npm start
```

Server runs on: <http://localhost:3000>

### Step 5: Start Frontend

In a **new terminal**:

```powershell
npm run dev
```

Frontend runs on: <http://localhost:5173>

### Step 6: Test Login

1. Open <http://localhost:5173>
2. Navigate to Login page
3. Toggle switch to **Backend Mode**
4. Login with:
   - Username: `admin`
   - Password: `Admin@2025`

---

## 🧪 Testing

### Test Backend Health

```powershell
curl http://localhost:3000/api/health
```

Expected:

```json
{
  "status": "OK",
  "message": "MongoDB backend is running"
}
```

### Test Login

```powershell
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"username":"admin","password":"Admin@2025"}'
```

---

## 📂 File Structure

```
backend/
├── server.js                    # Main Express server
├── setup_mongodb.js             # Database initialization
├── package.json                 # Dependencies & scripts
├── .env                         # Configuration (DO NOT COMMIT)
├── .env.example                 # Example configuration
├── MONGODB_SETUP_GUIDE.md       # Setup documentation
├── config/
│   └── mongodb.js               # MongoDB connection manager
└── auth/
    ├── login_mongodb.js         # Login endpoint
    ├── logout_mongodb.js        # Logout endpoint
    └── check_session_mongodb.js # Session verification
```

---

## 🔐 Default Credentials

| Username | Password | Role | Email |
|----------|----------|------|-------|
| admin | Admin@2025 | admin | <admin@susingroup.com> |
| hr_manager | HR@2025 | hr | <hr@susingroup.com> |

**⚠️ IMPORTANT:** Change these passwords after first login!

---

## 📊 Database Collections

### users

User accounts with authentication data

### user_sessions

Active user sessions for session management

### login_attempts

Failed login tracking for security

### applications

Job applications (for future use)

### activity_log

User activity logging (for future use)

---

## 🔧 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with auto-restart |
| `npm run setup` | Initialize database & create default users |

---

## ⚡ Quick Start Checklist

- [ ] Install MongoDB (Atlas or Local)
- [ ] Configure `backend/.env` file
- [ ] Run `npm install` in backend folder (if needed)
- [ ] Run `npm run setup` to initialize database
- [ ] Run `npm run dev` to start backend
- [ ] Run `npm run dev` in root folder to start frontend
- [ ] Test login at <http://localhost:5173>
- [ ] Switch to Backend Mode in login page
- [ ] Login with admin credentials

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

- Check if MongoDB is running: `net start MongoDB`
- Verify connection string in `.env`
- For Atlas: check IP whitelist

### Port Already in Use

```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <process_id> /F
```

### Login Not Working

- Make sure backend server is running on port 3000
- Run `npm run setup` to create users
- Check browser console for errors
- Verify you're in "Backend Mode" not "Mock Mode"

---

## 📝 Next Steps

1. Test authentication flow thoroughly
2. Change default passwords
3. Add more admin users as needed
4. Implement additional API endpoints
5. Add application submission functionality
6. Set up production environment

---

## 🎉 Migration Complete

The backend has been successfully migrated from PHP/MySQL to Node.js/MongoDB!

**What changed:**

- ❌ PHP backend → ✅ Node.js/Express
- ❌ MySQL database → ✅ MongoDB
- ❌ PHP sessions → ✅ express-session
- ❌ Manual SQL → ✅ MongoDB queries

**What stayed the same:**

- ✅ Authentication logic
- ✅ User roles and permissions
- ✅ Security features (password hashing, lockout)
- ✅ Session management

For detailed setup instructions, see `MONGODB_SETUP_GUIDE.md`
