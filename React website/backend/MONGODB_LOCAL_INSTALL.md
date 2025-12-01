# MongoDB Local Installation Guide for Windows

## Step-by-Step Installation

### 1. Download MongoDB Community Server

1. **Visit the MongoDB download page:**
   - URL: https://www.mongodb.com/try/download/community
   - Or direct link: https://www.mongodb.com/try/download/community-edition

2. **Select your options:**
   - Version: `7.0.x` (or latest stable)
   - Platform: `Windows`
   - Package: `msi` (Windows installer)

3. **Click "Download"**

### 2. Run the Installer

1. **Double-click the downloaded `.msi` file**

2. **Setup Type:**
   - Choose **"Complete"** installation
   - This installs MongoDB and all tools

3. **Service Configuration:**
   - ✅ **Check "Install MongoDB as a Service"**
   - Service Name: `MongoDB`
   - Data Directory: `C:\Program Files\MongoDB\Server\7.0\data\`
   - Log Directory: `C:\Program Files\MongoDB\Server\7.0\log\`
   - ✅ **Check "Run service as Network Service user"**

4. **Install MongoDB Compass (Optional):**
   - MongoDB Compass is a GUI tool for viewing your database
   - ✅ **Check "Install MongoDB Compass"** (recommended)
   - Or uncheck if you prefer command-line only

5. **Click "Install"**
   - Wait for installation to complete (2-5 minutes)

6. **Click "Finish"**

### 3. Verify Installation

Open PowerShell and run:

```powershell
# Check if MongoDB service is running
Get-Service MongoDB
```

Expected output:
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

If it shows "Stopped", start it:

```powershell
net start MongoDB
```

### 4. Test MongoDB Connection

```powershell
# Connect to MongoDB shell
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true
Using MongoDB: 7.0.x
Using Mongosh: 2.x.x
```

Type `exit` to exit the MongoDB shell.

### 5. Configure Your Project

The `.env` file in the backend folder is already configured for local MongoDB:

```env
MONGODB_URI=mongodb://localhost:27017/susin_careers
```

This should work automatically!

### 6. Initialize the Database

Now run the setup script:

```powershell
cd backend
npm run setup
```

This will:
- ✅ Create the `susin_careers` database
- ✅ Create collections (users, sessions, etc.)
- ✅ Create indexes for performance
- ✅ Add default users (admin, hr_manager)

### 7. Start the Backend Server

```powershell
npm run dev
```

You should see:
```
==================================================
🚀 MongoDB Backend Server Running
==================================================
📡 Server: http://localhost:3000
🔐 Auth API: http://localhost:3000/api/auth/login
💚 Health: http://localhost:3000/api/health
==================================================
```

### 8. Test the API

Open a new PowerShell terminal and test:

```powershell
curl http://localhost:3000/api/health
```

Expected response:
```json
{"status":"OK","message":"MongoDB backend is running"}
```

### 9. Start the Frontend

In another terminal:

```powershell
cd "c:\Users\mecve\Desktop\first Project\React website"
npm run dev
```

### 10. Test Login

1. Open browser: http://localhost:5173
2. Go to Login page
3. Toggle to **"Backend Mode"**
4. Login with:
   - Username: `admin`
   - Password: `Admin@2025`

---

## Troubleshooting

### MongoDB Service Won't Start

**Error: "The service name is invalid"**

The service might be named differently. Try:

```powershell
# List all MongoDB services
Get-Service | Where-Object {$_.DisplayName -like "*Mongo*"}
```

Then start with the correct name:

```powershell
net start "MongoDB Server"
```

**Error: "Access is denied"**

Run PowerShell as Administrator:
1. Right-click PowerShell
2. Select "Run as Administrator"
3. Try again: `net start MongoDB`

### MongoDB Not in PATH

If `mongosh` command isn't recognized, add MongoDB to PATH:

1. Open "Environment Variables"
2. Edit "Path" under System Variables
3. Add: `C:\Program Files\MongoDB\Server\7.0\bin`
4. Restart PowerShell

### Connection Refused

Check if MongoDB is listening:

```powershell
netstat -an | findstr 27017
```

Should show:
```
TCP    0.0.0.0:27017          0.0.0.0:0              LISTENING
```

If not, restart MongoDB service:

```powershell
net stop MongoDB
net start MongoDB
```

### Port Already in Use

If port 27017 is occupied:

```powershell
# Find process using port 27017
netstat -ano | findstr :27017

# Kill the process (replace PID)
taskkill /PID <process_id> /F
```

---

## Using MongoDB Compass (GUI)

If you installed MongoDB Compass:

1. **Open MongoDB Compass**
2. **Connection String:** `mongodb://localhost:27017`
3. **Click "Connect"**
4. **Browse databases:**
   - You should see `susin_careers` database
   - Click to expand and view collections
   - Click `users` to see user documents

---

## MongoDB Commands Reference

### Start/Stop Service

```powershell
# Start
net start MongoDB

# Stop
net stop MongoDB

# Restart
net stop MongoDB; net start MongoDB

# Check status
Get-Service MongoDB
```

### MongoDB Shell

```powershell
# Connect to MongoDB
mongosh

# Inside mongosh:
show dbs                    # List all databases
use susin_careers          # Switch to our database
show collections           # List collections
db.users.find()           # View all users
db.users.countDocuments() # Count users
exit                      # Exit shell
```

---

## Uninstall MongoDB (if needed)

1. **Stop the service:**
   ```powershell
   net stop MongoDB
   ```

2. **Uninstall via Control Panel:**
   - Open "Add or Remove Programs"
   - Find "MongoDB Server"
   - Click "Uninstall"

3. **Remove data directories:**
   - Delete: `C:\Program Files\MongoDB`
   - Delete: `C:\data\db` (if exists)

---

## Next Steps

✅ MongoDB is now installed and running locally!

**Your backend is ready to use:**

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `npm run dev` (in root folder)
3. Visit: http://localhost:5173
4. Login with Backend Mode enabled

**Default Credentials:**
- Admin: `admin` / `Admin@2025`
- HR Manager: `hr_manager` / `HR@2025`

**⚠️ Important:** Change these passwords after first login!

---

## Support Resources

- MongoDB Documentation: https://docs.mongodb.com/
- MongoDB Compass Guide: https://docs.mongodb.com/compass/
- MongoDB Community: https://community.mongodb.com/

---

**Installation Complete!** 🎉
