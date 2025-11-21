# Image Optimization Script for Susin Group Website
# Converts JFIF/JPG/PNG to WebP format with quality optimization
# Requires: ImageMagick or cwebp (Google WebP tools)

param(
    [string]$SourceDir = "assets\img",
    [int]$Quality = 85,
    [switch]$Verbose
)

Write-Host "`n🖼️  Image Optimization Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check if ImageMagick is installed
$magickExists = Get-Command magick -ErrorAction SilentlyContinue
$cwebpExists = Get-Command cwebp -ErrorAction SilentlyContinue

if (-not $magickExists -and -not $cwebpExists) {
    Write-Host "`n⚠️  Neither ImageMagick nor cwebp found!" -ForegroundColor Red
    Write-Host "`nInstall one of the following:" -ForegroundColor Yellow
    Write-Host "  1. ImageMagick: winget install ImageMagick.ImageMagick" -ForegroundColor White
    Write-Host "  2. Google WebP: Download from https://developers.google.com/speed/webp/download" -ForegroundColor White
    exit 1
}

$converter = if ($magickExists) { "magick" } else { "cwebp" }
Write-Host "Using converter: $converter`n" -ForegroundColor Green

# Get all image files
$imageExtensions = @("*.jpg", "*.jpeg", "*.png", "*.jfif")
$images = Get-ChildItem -Path $SourceDir -Recurse -Include $imageExtensions -File

$totalImages = $images.Count
$convertedCount = 0
$skippedCount = 0
$totalSavings = 0

Write-Host "Found $totalImages images to process`n" -ForegroundColor Cyan

foreach ($image in $images) {
    $webpPath = [System.IO.Path]::ChangeExtension($image.FullName, ".webp")
    
    # Skip if WebP already exists and is newer
    if ((Test-Path $webpPath) -and ((Get-Item $webpPath).LastWriteTime -gt $image.LastWriteTime)) {
        if ($Verbose) {
            Write-Host "⏭️  Skipping $($image.Name) (WebP exists)" -ForegroundColor Gray
        }
        $skippedCount++
        continue
    }
    
    try {
        $originalSize = $image.Length
        
        if ($converter -eq "magick") {
            # ImageMagick conversion
            & magick convert $image.FullName -quality $Quality -define webp:method=6 $webpPath 2>&1 | Out-Null
        } else {
            # cwebp conversion
            & cwebp -q $Quality -m 6 $image.FullName -o $webpPath 2>&1 | Out-Null
        }
        
        if (Test-Path $webpPath) {
            $webpSize = (Get-Item $webpPath).Length
            $savings = $originalSize - $webpSize
            $savingsPercent = [math]::Round(($savings / $originalSize) * 100, 1)
            $totalSavings += $savings
            
            Write-Host "✅ $($image.Name)" -ForegroundColor Green
            Write-Host "   Original: $([math]::Round($originalSize/1KB, 1)) KB → WebP: $([math]::Round($webpSize/1KB, 1)) KB (Saved: $savingsPercent%)" -ForegroundColor Gray
            
            $convertedCount++
        } else {
            Write-Host "❌ Failed to convert $($image.Name)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Error converting $($image.Name): $_" -ForegroundColor Red
    }
}

# Summary
Write-Host "`n" -NoNewline
Write-Host "📊 Conversion Summary" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host "Total images found:  $totalImages" -ForegroundColor White
Write-Host "Converted:           $convertedCount" -ForegroundColor Green
Write-Host "Skipped:             $skippedCount" -ForegroundColor Yellow
Write-Host "Total space saved:   $([math]::Round($totalSavings/1MB, 2)) MB`n" -ForegroundColor Cyan

# Generate HTML picture element examples
Write-Host "`n📝 HTML Usage Example:" -ForegroundColor Yellow
Write-Host @"
<picture>
  <source srcset="assets/img/products/pneumatic/hd-series.webp" type="image/webp">
  <source srcset="assets/img/products/pneumatic/hd-series.jpg" type="image/jpeg">
  <img src="assets/img/products/pneumatic/hd-series.jpg" alt="HD Series Actuator" loading="lazy">
</picture>
"@ -ForegroundColor Gray

Write-Host "`n✅ Optimization Complete!`n" -ForegroundColor Green
