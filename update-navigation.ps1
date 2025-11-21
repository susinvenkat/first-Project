<# 
.SYNOPSIS
    Update all HTML pages with new Susin Group navigation header

.DESCRIPTION
    This script automatically updates all HTML files with the new navigation system:
    1. Adds navigation.css link in <head>
    2. Adds navigation.js script before </body>
    3. Replaces old <header> with new navigation component
    
.NOTES
    Author: GitHub Copilot
    Date: November 21, 2025
    Version: 1.0
#>

# Color functions for output
function Write-Success { param($Message) Write-Host "✅ $Message" -ForegroundColor Green }
function Write-Info { param($Message) Write-Host "ℹ️  $Message" -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host "⚠️  $Message" -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host "❌ $Message" -ForegroundColor Red }

# Configuration
$ProjectRoot = $PSScriptRoot
$NavigationHeaderPath = Join-Path $ProjectRoot "navigation-header.html"
$BackupFolder = Join-Path $ProjectRoot "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

Write-Info "Starting Navigation Header Update Process..."
Write-Info "Project Root: $ProjectRoot"

# Verify required files exist
if (-not (Test-Path $NavigationHeaderPath)) {
    Write-Error "navigation-header.html not found!"
    exit 1
}

# Read navigation header content
$NavigationHeaderContent = Get-Content $NavigationHeaderPath -Raw
Write-Success "Loaded navigation header template"

# List of HTML files to update
$MainPages = @(
    "index.html",
    "products.html",
    "about.html",
    "services.html",
    "industries.html",
    "careers.html",
    "contact.html",
    "resources.html",
    "products-actuators-gearboxes.html",
    "services-installation-maintenance.html",
    "industries-served.html",
    "about-industrial-actuators.html",
    "contact-support-sales.html",
    "resources-technical-docs.html",
    "test-navigation.html"
)

$GlobalPages = @(
    "global-presence\susin-itork-india.html",
    "global-presence\susin-itork-uae.html",
    "global-presence\susin-itork-qatar.html"
)

# Create backup folder
New-Item -ItemType Directory -Path $BackupFolder -Force | Out-Null
Write-Success "Created backup folder: $BackupFolder"

# Function to update a single page
function Update-HTMLPage {
    param(
        [string]$FilePath,
        [bool]$IsSubdirectory = $false
    )
    
    $FullPath = Join-Path $ProjectRoot $FilePath
    
    if (-not (Test-Path $FullPath)) {
        Write-Warning "File not found: $FilePath"
        return $false
    }
    
    Write-Info "Processing: $FilePath"
    
    try {
        # Backup original file
        $BackupPath = Join-Path $BackupFolder $FilePath
        $BackupDir = Split-Path $BackupPath
        if (-not (Test-Path $BackupDir)) {
            New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
        }
        Copy-Item $FullPath $BackupPath -Force
        
        # Read current content
        $Content = Get-Content $FullPath -Raw
        
        # Prepare navigation content with path adjustments for subdirectory files
        $NavContent = $NavigationHeaderContent
        if ($IsSubdirectory) {
            $NavContent = $NavContent -replace 'src="logo\.jpg"', 'src="../logo.jpg"'
            $NavContent = $NavContent -replace 'href="([a-z-]+\.html)', 'href="../$1'
            $NavContent = $NavContent -replace 'href="../global-presence/', 'href="'
        }
        
        # 1. Add navigation.css if not present
        $cssPath = if ($IsSubdirectory) { "../css/navigation.css" } else { "css/navigation.css" }
        if ($Content -notmatch 'navigation\.css') {
            $Content = $Content -replace '(<link rel="stylesheet" href="css/style\.css"[^>]*>)', "`$1`n    <link rel=`"stylesheet`" href=`"$cssPath`">"
            Write-Info "  Added navigation.css link"
        }
        
        # 2. Add navigation.js if not present
        $jsPath = if ($IsSubdirectory) { "../js/navigation.js" } else { "js/navigation.js" }
        if ($Content -notmatch 'navigation\.js') {
            $Content = $Content -replace '(</body>)', "    <script src=`"$jsPath`"></script>`n`$1"
            Write-Info "  Added navigation.js script"
        }
        
        # 3. Replace header section
        if ($Content -match '(?s)<header[^>]*>.*?</header>') {
            # Find existing header
            $OldHeader = $matches[0]
            
            # Skip if it's a chat-header or other non-main header
            if ($OldHeader -match 'chat-header|footer') {
                # Only replace the main header
                $Content = $Content -replace '(?s)(<header class="modern-header"[^>]*>.*?</header>)', $NavContent
            } else {
                $Content = $Content -replace '(?s)(<header[^>]*>.*?</header>)', $NavContent
            }
            Write-Info "  Replaced header section"
        } else {
            Write-Warning "  No header section found"
            return $false
        }
        
        # Save updated content
        $Content | Set-Content $FullPath -NoNewline
        Write-Success "  Updated successfully: $FilePath"
        return $true
        
    } catch {
        Write-Error "  Failed to update: $FilePath - $($_.Exception.Message)"
        return $false
    }
}

# Update main pages
Write-Info "`n📄 Updating Main Pages..."
$UpdatedCount = 0
foreach ($Page in $MainPages) {
    if (Update-HTMLPage -FilePath $Page -IsSubdirectory $false) {
        $UpdatedCount++
    }
}

# Update global presence pages
Write-Info "`n🌍 Updating Global Presence Pages..."
foreach ($Page in $GlobalPages) {
    if (Update-HTMLPage -FilePath $Page -IsSubdirectory $true) {
        $UpdatedCount++
    }
}

# Summary
Write-Info "`n" + "="*60
Write-Success "Navigation Update Complete!"
Write-Info "Total pages updated: $UpdatedCount"
Write-Info "Backup location: $BackupFolder"
Write-Info "="*60

# Verify CSS and JS files exist
$CSSPath = Join-Path $ProjectRoot "css\navigation.css"
$JSPath = Join-Path $ProjectRoot "js\navigation.js"

if (Test-Path $CSSPath) {
    Write-Success "✓ navigation.css exists"
} else {
    Write-Warning "✗ navigation.css not found"
}

if (Test-Path $JSPath) {
    Write-Success "✓ navigation.js exists"
} else {
    Write-Warning "✗ navigation.js not found"
}

Write-Info "`n📋 Next Steps:"
Write-Host "1. Open index.html in a browser to test" -ForegroundColor Cyan
Write-Host "2. Test navigation functionality:" -ForegroundColor Cyan
Write-Host "   - Click all menu items" -ForegroundColor Gray
Write-Host "   - Test search (Ctrl+K)" -ForegroundColor Gray
Write-Host "   - Test mobile menu" -ForegroundColor Gray
Write-Host "   - Verify sticky header" -ForegroundColor Gray
Write-Host "3. Test on multiple pages" -ForegroundColor Cyan
Write-Host "4. Check mobile responsiveness" -ForegroundColor Cyan
Write-Host "5. If issues occur, restore from: $BackupFolder" -ForegroundColor Yellow

Write-Info "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
