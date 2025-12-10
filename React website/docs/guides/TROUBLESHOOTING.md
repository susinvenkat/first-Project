# Development Troubleshooting Guide

## Common Issues & Solutions

### 🔴 Problem: Home Page Not Loading / Blank Screen

**Possible Causes & Solutions:**

1. **Cache Issues**
   ```bash
   # Clear Vite cache and restart
   npm run dev:clean
   ```

2. **Port Conflict**
   ```bash
   # Check if port 5173 is in use
   netstat -ano | findstr :5173
   # Kill the process if needed
   taskkill /PID <process_id> /F
   ```

3. **Module Not Found Errors**
   ```bash
   # Reinstall dependencies
   rm -rf node_modules
   npm install
   ```

4. **React 19 Compatibility**
   - All components are React 19 compatible
   - Error boundary added for better error handling
   - Check browser console (F12) for errors

### 🔴 Problem: Live Server Not Updating (HMR Not Working)

**Solutions:**

1. **Enable File Watching (Already Configured)**
   - `usePolling: true` in vite.config.js
   - Should work even with network drives

2. **Restart Dev Server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev:clean
   ```

3. **Clear Browser Cache**
   - Hard refresh: `Ctrl + Shift + R` (Windows/Linux)
   - Or: `Ctrl + F5`
   - Or: Clear cache in DevTools → Network tab

4. **Check Antivirus/Firewall**
   - Whitelist the project folder
   - Allow Node.js through firewall

5. **File Path Issues**
   - Ensure no special characters in folder path
   - Avoid spaces in project path
   - Use forward slashes (/) in imports

### 🟢 Quick Fixes

**Fast Reload:**
```bash
# Press Ctrl+C to stop server
npm run dev:clean
```

**Complete Reset:**
```bash
# Delete cache and node_modules
npm run clean
npm install
npm run dev
```

**Check for Errors:**
```bash
# Run linter
npm run lint
```

### 📋 Best Practices

1. **Always use `npm run dev:clean`** when switching branches or after pulling changes
2. **Keep browser DevTools open** (F12) to see errors immediately
3. **Save files properly** (Ctrl+S) - some editors don't auto-save
4. **Check terminal** for error messages
5. **Use Error Boundary** - errors are caught and displayed nicely

### 🔧 Development Commands

```bash
# Start development server
npm run dev

# Start with cache clearing (USE THIS IF ISSUES)
npm run dev:clean

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Clean cache manually
npm run clean
```

### 🌐 URLs

- **Development:** http://localhost:5173
- **Backend API:** http://localhost:3000 (if running PHP backend)

### 📁 Important Files

- `vite.config.js` - Vite configuration with HMR settings
- `src/main.jsx` - Entry point with error handlers
- `src/components/ErrorBoundary.jsx` - Catches React errors
- `.env.development` - Environment variables

### 🐛 Debugging Steps

1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for failed requests
4. Check Sources tab to set breakpoints
5. Look at terminal for build errors

### 💡 Tips

- **HMR is now optimized** with file polling enabled
- **Error Boundary** will show user-friendly error messages
- **Source maps enabled** for easier debugging
- **Auto-open browser** on `npm run dev`
- **Strict mode enabled** to catch bugs early

### 🆘 Still Having Issues?

1. Check this file for solutions
2. Look at browser console (F12)
3. Check terminal output
4. Try `npm run dev:clean`
5. Restart VS Code
6. Restart computer (if all else fails)

---

## Recent Updates

✅ **Vite Config Enhanced:**
- File polling enabled for better HMR
- Source maps enabled for debugging
- Optimized dependencies pre-bundled

✅ **Error Handling Improved:**
- Global error boundary added
- Better error messages
- Development error details visible

✅ **Scripts Added:**
- `npm run dev:clean` - Start with cache clear
- `npm run clean` - Remove cache and build files

---

**Last Updated:** November 24, 2025
