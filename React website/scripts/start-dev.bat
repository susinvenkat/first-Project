@echo off
echo ========================================
echo    Susin Itork Development Server
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/5] Node.js version:
node --version
echo.

echo [2/5] Checking for node_modules...
if not exist "node_modules\" (
    echo [WARNING] node_modules not found. Installing dependencies...
    call npm install
) else (
    echo [OK] node_modules found.
)
echo.

echo [3/5] Cleaning Vite cache...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo [OK] Vite cache cleared.
) else (
    echo [OK] No cache to clear.
)
echo.

echo [4/5] Checking for port conflicts on 5173...
netstat -ano | findstr :5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo [WARNING] Port 5173 is in use!
    echo Attempting to free the port...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
        taskkill /PID %%a /F >nul 2>&1
    )
    echo [OK] Port freed.
) else (
    echo [OK] Port 5173 is available.
)
echo.

echo [5/5] Starting development server...
echo.
echo ========================================
echo  Server will open at: http://localhost:5173
echo  Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start the dev server with clean cache
call npm run dev:clean

pause
