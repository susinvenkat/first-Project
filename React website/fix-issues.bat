@echo off
echo ========================================
echo    Quick Fix for Common Issues
echo ========================================
echo.

echo [1/4] Stopping any running Node processes...
taskkill /F /IM node.exe >nul 2>&1
echo [OK] Node processes stopped.
echo.

echo [2/4] Clearing Vite cache...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo [OK] Vite cache cleared.
)
if exist "dist" (
    rmdir /s /q "dist"
    echo [OK] Build folder cleared.
)
echo.

echo [3/4] Clearing browser cache...
echo Please do a hard refresh in your browser:
echo  - Chrome/Edge: Ctrl + Shift + R
echo  - Firefox: Ctrl + Shift + Delete
echo.

echo [4/4] Reinstalling dependencies...
call npm install
echo [OK] Dependencies reinstalled.
echo.

echo ========================================
echo  Fix Complete! Now run: start-dev.bat
echo ========================================
echo.
pause
