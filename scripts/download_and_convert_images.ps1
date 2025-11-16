# Download and optionally convert images used by the site to local assets
# Usage: Open PowerShell as Administrator (if needed), then:
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#   .\scripts\download_and_convert_images.ps1

$images = @(
    # Products - pneumatic
    @{ url = 'https://www.susingroup.com/assets/img/products/pneumatic/pds-actuator.jpg'; out='assets/img/products/pneumatic/pds-actuator.jpg' },
    @{ url = 'https://www.susingroup.com/assets/img/products/pneumatic/hd-actuator.jpg'; out='assets/img/products/pneumatic/hd-actuator.jpg' },

    # Products - mechanical
    @{ url = 'https://www.susingroup.com/assets/img/products/mechanical/itg-series.jpg'; out='assets/img/products/mechanical/itg-series.jpg' },

    # Products - hydraulic
    @{ url = 'https://www.susingroup.com/assets/img/products/hydraulic/electro-hydraulic-actuator.jpg'; out='assets/img/products/hydraulic/electro-hydraulic-actuator.jpg' },

    # Products - electrical
    @{ url = 'https://www.susingroup.com/assets/img/products/electrical/itq-series.jpg'; out='assets/img/products/electrical/itq-series.jpg' },

    # Industries
    @{ url = 'http://www.susingroup.com/uploads/recent_project/20240731-095344-17224196248255.jfif'; out='assets/img/industries/oil-gas.jpg' },
    @{ url = 'http://www.susingroup.com/uploads/category_thumbnail_image/20250514-114327-17472230071145.JPG'; out='assets/img/industries/water-treatment.jpg' },
    @{ url = 'http://www.susingroup.com/assets/img/global-presence/germany.jpg'; out='assets/img/industries/power-generation.jpg' },
    @{ url = 'http://www.susingroup.com/uploads/category_thumbnail_image/20250514-095924-17472167644310.png'; out='assets/img/industries/chemical.png' },
    @{ url = 'http://www.susingroup.com/uploads/recent_project/20240731-094855-17224193357774.jpg'; out='assets/img/industries/marine.jpg' },
    @{ url = 'http://www.susingroup.com/uploads/category_thumbnail_image/20250514-115923-17472239635687.jpg'; out='assets/img/industries/pharmaceutical.jpg' },
    @{ url = 'http://www.susingroup.com/uploads/recent_project/20240731-092632-17224179928266.jpg'; out='assets/img/industries/mining.jpg' },
    @{ url = 'http://www.susingroup.com/uploads/category_thumbnail_image/20250614-233653-17499244132777.png'; out='assets/img/industries/food-beverage.png' },

    # Contact
    @{ url = 'http://www.susingroup.com/uploads/contact_thumbnail_image/20250621-130105-17504910657842.jpg'; out='assets/img/contact/mumbai.jpg' },
    @{ url = 'http://www.susingroup.com/assets/img/contact/location-image.png'; out='assets/img/contact/uae.png' },
    @{ url = 'http://www.susingroup.com/uploads/contact_thumbnail_image/20250621-130451-17504912914193.jpg'; out='assets/img/contact/qatar.jpg' },
    @{ url = 'http://www.susingroup.com/assets/img/contact/location-image.png'; out='assets/img/contact/oman.png' },
    @{ url = 'http://www.susingroup.com/uploads/contact_thumbnail_image/20250621-130105-17504910657842.jpg'; out='assets/img/contact/europe.jpg' }
)

foreach ($item in $images) {
    $url = $item.url
    $out = $item.out
    $dir = Split-Path $out -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    Write-Host "Downloading $url -> $out"
    try {
        Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
    } catch {
        Write-Warning "Failed to download $url : $_"
    }
}

# Optionally convert to WebP if ImageMagick 'magick' is available
$magick = Get-Command magick -ErrorAction SilentlyContinue
if ($magick) {
    Write-Host "ImageMagick detected. Creating WebP fallbacks..."
    foreach ($item in $images) {
        $out = $item.out
        $ext = [System.IO.Path]::GetExtension($out).ToLower()
        $webp = [System.IO.Path]::ChangeExtension($out, '.webp')
        if (Test-Path $out) {
            try {
                & magick $out -quality 80 $webp
                Write-Host "Converted $out -> $webp"
            } catch {
                Write-Warning "Conversion failed for $out : $_"
            }
        }
    }
} else {
    Write-Host "ImageMagick not found. Skipping WebP conversion. To enable conversion, install ImageMagick and ensure 'magick' is in PATH."
}

Write-Host "Done. Update HTML if you wish to change file names or locations."

# If ImageMagick is available, also generate resized JPG and WebP variants for responsive srcset
$magick = Get-Command magick -ErrorAction SilentlyContinue
if ($magick) {
    $sizes = @(320, 640, 1024)
    Write-Host "Generating resized JPEG and WebP variants: $($sizes -join ', ')"
    foreach ($item in $images) {
        $out = $item.out
        if (-not (Test-Path $out)) { continue }
        $dir = Split-Path $out -Parent
        $base = [System.IO.Path]::GetFileNameWithoutExtension($out)
        $ext = [System.IO.Path]::GetExtension($out)
        foreach ($s in $sizes) {
            $resizedJpg = Join-Path $dir ("{0}-{1}{2}" -f $base, $s, $ext)
            $resizedWebp = Join-Path $dir ("{0}-{1}.webp" -f $base, $s)
            try {
                # Resize to width s, keep aspect ratio. Use best practice quality settings.
                & magick $out -resize "${s}x" -quality 80 $resizedJpg
                Write-Host "Created $resizedJpg"
                & magick $resizedJpg -quality 80 $resizedWebp
                Write-Host "Created $resizedWebp"
            } catch {
                Write-Warning "Failed to create resized variants for $out at ${s}px: $_"
            }
        }
    }
    Write-Host "Resized variants generation complete."
} else {
    Write-Host "ImageMagick not available; resized variants not generated."
}
