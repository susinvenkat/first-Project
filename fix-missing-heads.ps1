# Fix pages missing head sections and add navigation CSS/JS

$pages = @(
    "about.html",
    "contact.html", 
    "industries.html",
    "resources.html",
    "services.html",
    "about-industrial-actuators.html",
    "contact-support-sales.html",
    "industries-served.html",
    "resources-technical-docs.html",
    "services-installation-maintenance.html"
)

$backupFolder = "backup-20251121-231118"

foreach ($page in $pages) {
    Write-Host "Processing $page..." -ForegroundColor Cyan
    
    $backupPath = Join-Path $backupFolder $page
    $currentPath = $page
    
    if (Test-Path $backupPath) {
        # Read backup file
        $backupContent = Get-Content $backupPath -Raw
        
        # Read current file
        $currentContent = Get-Content $currentPath -Raw
        
        # Extract head section from backup (everything before </head>)
        if ($backupContent -match '(?s)(<!DOCTYPE html>.*?</head>)') {
            $headSection = $matches[1]
            
            # Add navigation.css if not present
            if ($headSection -notmatch 'navigation\.css') {
                $headSection = $headSection -replace '(<link rel="stylesheet" href="css/style\.css"[^>]*>)', "`$1`n    <link rel=`"stylesheet`" href=`"css/navigation.css`">"
            }
            
            # Extract body content from current file (everything after <body>)
            if ($currentContent -match '(?s)(<body>.*$)') {
                $bodySection = $matches[1]
                
                # Add navigation.js before </body> if not present
                if ($bodySection -notmatch 'navigation\.js') {
                    $bodySection = $bodySection -replace '(</body>)', "    <script src=`"js/navigation.js`"></script>`n`$1"
                }
                
                # Combine head and body
                $newContent = $headSection + "`n" + $bodySection
                
                # Save updated file
                $newContent | Set-Content $currentPath -NoNewline
                
                Write-Host "  ✅ Fixed $page" -ForegroundColor Green
            } else {
                Write-Host "  ⚠️ Could not find body section in $page" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  ⚠️ Could not extract head from backup for $page" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ❌ Backup not found for $page" -ForegroundColor Red
    }
}

Write-Host "`n✅ All pages processed!" -ForegroundColor Green
