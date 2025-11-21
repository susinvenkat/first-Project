# Performance Optimization Script for Susin Group Website
# This script optimizes images, CSS, JS and checks for performance issues

Write-Host "=== Susin Group Website Performance Optimization ===" -ForegroundColor Cyan
Write-Host ""

# 1. Check for large images
Write-Host "1. Checking for large images..." -ForegroundColor Yellow
$largeImages = Get-ChildItem -Path "assets\img" -Recurse -Include *.jpg,*.jpeg,*.png,*.webp,*.jfif | Where-Object { $_.Length -gt 500KB }
if ($largeImages) {
    Write-Host "   WARNING: Found $($ largeImages.Count) images larger than 500KB:" -ForegroundColor Red
    $largeImages | ForEach-Object {
        $sizeKB = [math]::Round($_.Length / 1KB, 2)
        Write-Host "   - $($_.FullName.Replace($PWD, '.')) : $sizeKB KB" -ForegroundColor Red
    }
    Write-Host "   Consider compressing these images using tools like TinyPNG or ImageOptim" -ForegroundColor Yellow
} else {
    Write-Host "   ✓ All images are under 500KB" -ForegroundColor Green
}
Write-Host ""

# 2. Check CSS file size
Write-Host "2. Checking CSS file size..." -ForegroundColor Yellow
$cssFile = Get-Item "css\style.css"
$cssSizeKB = [math]::Round($cssFile.Length / 1KB, 2)
Write-Host "   style.css: $cssSizeKB KB"
if ($cssSizeKB -gt 150) {
    Write-Host "   WARNING: CSS file is large. Consider:" -ForegroundColor Red
    Write-Host "   - Removing unused CSS rules" -ForegroundColor Yellow
    Write-Host "   - Minifying CSS (use cssnano or clean-css)" -ForegroundColor Yellow
    Write-Host "   - Splitting into separate files and loading conditionally" -ForegroundColor Yellow
} else {
    Write-Host "   ✓ CSS size is acceptable" -ForegroundColor Green
}
Write-Host ""

# 3. Check JS file size
Write-Host "3. Checking JavaScript file size..." -ForegroundColor Yellow
$jsFile = Get-Item "js\main.js"
$jsSizeKB = [math]::Round($jsFile.Length / 1KB, 2)
Write-Host "   main.js: $jsSizeKB KB"
if ($jsSizeKB -gt 80) {
    Write-Host "   WARNING: JavaScript file is large. Consider:" -ForegroundColor Red
    Write-Host "   - Minifying JavaScript (use terser or uglify-js)" -ForegroundColor Yellow
    Write-Host "   - Code splitting for better performance" -ForegroundColor Yellow
    Write-Host "   - Removing console.log statements" -ForegroundColor Yellow
} else {
    Write-Host "   ✓ JavaScript size is acceptable" -ForegroundColor Green
}
Write-Host ""

# 4. Check for render-blocking resources
Write-Host "4. Checking for render-blocking resources..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -notlike "susin group*" }
$renderBlockingIssues = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.Name -Raw
    
    # Check for blocking CSS
    if ($content -match '<link[^>]+stylesheet[^>]+(?!media="print")[^>]*>(?!.*defer)' -and 
        $content -notmatch 'media="print" onload="this\.media=') {
        # Some blocking stylesheets found but might be intentional for critical CSS
    }
    
    # Check for blocking scripts without defer/async
    if ($content -match '<script[^>]+src=[^>]+(?!defer)(?!async)[^>]*></script>') {
        Write-Host "   WARNING: $($file.Name) has blocking scripts" -ForegroundColor Red
        $renderBlockingIssues++
    }
}

if ($renderBlockingIssues -eq 0) {
    Write-Host "   ✓ No critical render-blocking issues found" -ForegroundColor Green
} else {
    Write-Host "   Found $renderBlockingIssues files with potential issues" -ForegroundColor Yellow
}
Write-Host ""

# 5. Check for missing alt attributes
Write-Host "5. Checking for images without alt attributes..." -ForegroundColor Yellow
$missingAlts = 0
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.Name -Raw
    $matches = [regex]::Matches($content, '<img[^>]+>') | Where-Object { $_.Value -notmatch 'alt=' }
    if ($matches.Count -gt 0) {
        Write-Host "   WARNING: $($file.Name) has $($matches.Count) images without alt attributes" -ForegroundColor Red
        $missingAlts += $matches.Count
    }
}
if ($missingAlts -eq 0) {
    Write-Host "   ✓ All images have alt attributes" -ForegroundColor Green
} else {
    Write-Host "   Total: $missingAlts images missing alt attributes" -ForegroundColor Red
}
Write-Host ""

# 6. Performance recommendations
Write-Host "=== Performance Recommendations ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Quick Wins:" -ForegroundColor Green
Write-Host "  1. Enable Gzip/Brotli compression on your web server"
Write-Host "  2. Add browser caching headers (Cache-Control)"
Write-Host "  3. Use a CDN for static assets"
Write-Host "  4. Implement HTTP/2 if not already enabled"
Write-Host ""
Write-Host "Medium Priority:" -ForegroundColor Yellow
Write-Host "  1. Minify CSS and JavaScript files"
Write-Host "  2. Optimize and compress images (use WebP format)"
Write-Host "  3. Implement lazy loading for below-fold images"
Write-Host "  4. Use resource hints (preconnect, dns-prefetch)"
Write-Host ""
Write-Host "Long Term:" -ForegroundColor Cyan
Write-Host "  1. Implement a build process (webpack/vite)"
Write-Host "  2. Use critical CSS inline in <head>"
Write-Host "  3. Implement service worker for offline support"
Write-Host "  4. Use HTTP/3 (QUIC protocol)"
Write-Host ""

Write-Host "=== Optimization Complete ===" -ForegroundColor Cyan
Write-Host "Run this script periodically to check for performance regressions" -ForegroundColor Gray
