# SEO & Meta Tag Enhancement Script
# Adds comprehensive meta tags to all HTML pages

param(
    [switch]$DryRun
)

Write-Host "`n🔍 SEO & Meta Tag Enhancement Script" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse -Exclude "archive\*" | Where-Object { $_.DirectoryName -notlike "*\archive*" }

Write-Host "Found $($htmlFiles.Count) HTML files to process`n" -ForegroundColor Green

foreach ($file in $htmlFiles) {
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
    Write-Host "📄 Processing: $relativePath" -ForegroundColor Yellow
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Check if already has comprehensive meta tags
    if ($content -match 'max-image-preview:large' -and $content -match 'apple-mobile-web-app-title') {
        Write-Host "   ✓ Already optimized - skipping" -ForegroundColor Gray
        continue
    }
    
    $changes = 0
    
    # 1. Update format-detection to allow phone/email detection
    if ($content -match 'name="format-detection" content="telephone=no"') {
        $content = $content -replace 'name="format-detection" content="telephone=no"', 'name="format-detection" content="telephone=yes, address=yes, email=yes"'
        $changes++
        Write-Host "   ✓ Updated format-detection" -ForegroundColor Green
    }
    
    # 2. Add apple-mobile-web-app-title if missing
    if ($content -match 'apple-mobile-web-app-status-bar-style' -and $content -notmatch 'apple-mobile-web-app-title') {
        $content = $content -replace '(apple-mobile-web-app-status-bar-style" content="[^"]+">)', "`$1`n        <meta name=`"apple-mobile-web-app-title`" content=`"Susin Group`">"
        $changes++
        Write-Host "   ✓ Added apple-mobile-web-app-title" -ForegroundColor Green
    }
    
    # 3. Enhance robots meta tag
    if ($content -match 'name="robots" content="index, follow"') {
        $content = $content -replace 'name="robots" content="index, follow"', 'name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"'
        $changes++
        Write-Host "   ✓ Enhanced robots meta tag" -ForegroundColor Green
    }
    
    # 4. Add dark mode theme-color if missing
    if ($content -match 'name="theme-color" content="#c41e3a"' -and $content -notmatch 'prefers-color-scheme') {
        $darkModeTag = "`n        <meta name=`"theme-color`" content=`"#1a2942`" media=`"(prefers-color-scheme: dark)`">"
        $content = $content -replace '(name="theme-color" content="#c41e3a">)', "`$1$darkModeTag"
        $content = $content -replace '(name="theme-color" content="#c41e3a">)', 'name="theme-color" content="#c41e3a" media="(prefers-color-scheme: light)">'
        $changes++
        Write-Host "   ✓ Added dark mode theme-color" -ForegroundColor Green
    }
    
    # 5. Add hreflang tags if missing (after canonical)
    if ($content -match '<link rel="canonical"' -and $content -notmatch 'hreflang="en"') {
        $canonicalUrl = if ($content -match 'rel="canonical" href="([^"]+)"') { $Matches[1] } else { "https://www.susingroup.com/" }
        $content = $content -replace '(<link rel="canonical" href="[^"]+"\s*/?>)', "`$1`n        <link rel=`"alternate`" hreflang=`"en`" href=`"$canonicalUrl`">`n        <link rel=`"alternate`" hreflang=`"x-default`" href=`"$canonicalUrl`">"
        $changes++
        Write-Host "   ✓ Added hreflang tags" -ForegroundColor Green
    }
    
    # 6. Add manifest link if missing
    if ($content -match '</head>' -and $content -notmatch 'site.webmanifest') {
        $content = $content -replace '(    <link rel="icon"[^>]+>)', "`$1`n        <link rel=`"manifest`" href=`"site.webmanifest`">"
        $changes++
        Write-Host "   ✓ Added manifest link" -ForegroundColor Green
    }
    
    # 7. Add googlebot meta if missing
    if ($content -match 'name="robots"' -and $content -notmatch 'name="googlebot"') {
        $content = $content -replace '(name="robots" content="[^"]+">)', "`$1`n        <meta name=`"googlebot`" content=`"index, follow`">"
        $changes++
        Write-Host "   ✓ Added googlebot meta" -ForegroundColor Green
    }
    
    # 8. Add msapplication-TileImage if missing
    if ($content -match 'msapplication-TileColor' -and $content -notmatch 'msapplication-TileImage') {
        $content = $content -replace '(msapplication-navbutton-color" content="[^"]+">)', "`$1`n        <meta name=`"msapplication-TileImage`" content=`"assets/img/icons/mstile-144x144.png`">"
        $changes++
        Write-Host "   ✓ Added msapplication-TileImage" -ForegroundColor Green
    }
    
    if ($changes -gt 0) {
        if (-not $DryRun) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
            Write-Host "   💾 Saved $changes changes" -ForegroundColor Cyan
        } else {
            Write-Host "   👀 Would save $changes changes (DRY RUN)" -ForegroundColor Magenta
        }
    } else {
        Write-Host "   ⏭️  No changes needed" -ForegroundColor Gray
    }
    
    Write-Host ""
}

Write-Host "`n✅ SEO Enhancement Complete!`n" -ForegroundColor Green

if ($DryRun) {
    Write-Host "This was a DRY RUN - no files were modified" -ForegroundColor Yellow
    Write-Host "Run without -DryRun to apply changes`n" -ForegroundColor Yellow
}
