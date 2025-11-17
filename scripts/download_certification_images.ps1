# Download Certification Images Script

$ErrorActionPreference = "SilentlyContinue"

# Create certifications directory
$certDir = "..\assets\img\certifications"
if (!(Test-Path $certDir)) {
    New-Item -ItemType Directory -Path $certDir -Force | Out-Null
}

Write-Host "Creating placeholder certification images..." -ForegroundColor Green

# Create SVG placeholders for certifications
$certifications = @{
    "iso-9001.svg" = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect fill="#003DA5" width="200" height="200"/>
  <circle cx="100" cy="100" r="70" fill="none" stroke="white" stroke-width="4"/>
  <text x="100" y="90" font-family="Arial" font-size="24" font-weight="bold" fill="white" text-anchor="middle">ISO</text>
  <text x="100" y="115" font-family="Arial" font-size="32" font-weight="bold" fill="white" text-anchor="middle">9001</text>
  <text x="100" y="135" font-family="Arial" font-size="14" fill="white" text-anchor="middle">:2015</text>
</svg>
"@
    "ce-mark.svg" = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect fill="#FFFFFF" width="200" height="200"/>
  <path d="M70,100 Q50,70 70,40 T90,70 Q70,100 70,100 M110,100 Q90,70 110,40 T130,70 Q110,100 110,100 M70,100 Q50,130 70,160 T90,130 Q70,100 70,100 M110,100 Q90,130 110,160 T130,130 Q110,100 110,100" fill="#003DA5"/>
  <text x="100" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#003DA5" text-anchor="middle">CE</text>
</svg>
"@
    "atex.svg" = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect fill="#FFD700" width="200" height="200"/>
  <polygon points="100,30 130,90 190,90 140,130 160,190 100,150 40,190 60,130 10,90 70,90" fill="#000000"/>
  <text x="100" y="105" font-family="Arial" font-size="28" font-weight="bold" fill="#FFD700" text-anchor="middle">ATEX</text>
</svg>
"@
    "api.svg" = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect fill="#C41E3A" width="200" height="200"/>
  <circle cx="100" cy="100" r="60" fill="none" stroke="white" stroke-width="6"/>
  <text x="100" y="115" font-family="Arial" font-size="48" font-weight="bold" fill="white" text-anchor="middle">API</text>
</svg>
"@
    "iso-14001.svg" = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect fill="#00AA4F" width="200" height="200"/>
  <circle cx="100" cy="100" r="70" fill="none" stroke="white" stroke-width="4"/>
  <text x="100" y="90" font-family="Arial" font-size="24" font-weight="bold" fill="white" text-anchor="middle">ISO</text>
  <text x="100" y="115" font-family="Arial" font-size="28" font-weight="bold" fill="white" text-anchor="middle">14001</text>
  <path d="M80,130 L85,140 L95,125" fill="none" stroke="white" stroke-width="3"/>
</svg>
"@
}

foreach ($cert in $certifications.GetEnumerator()) {
    $filePath = Join-Path $certDir $cert.Key
    $cert.Value | Out-File -FilePath $filePath -Encoding UTF8
    Write-Host "Created: $($cert.Key)" -ForegroundColor Cyan
}

Write-Host "`nCertification images created successfully!" -ForegroundColor Green
Write-Host "Location: $certDir" -ForegroundColor Yellow
