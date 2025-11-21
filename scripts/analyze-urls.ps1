# URL Structure Analysis & Recommendations
# Analyzes current URLs and suggests SEO-friendly improvements

Write-Host "`n🔗 URL Structure Analysis" -ForegroundColor Cyan
Write-Host "========================`n" -ForegroundColor Cyan

$urls = @(
    @{ Current = "products-actuators-gearboxes.html"; Suggested = "products/actuators-gearboxes/"; Type = "Product Landing" },
    @{ Current = "about-industrial-actuators.html"; Suggested = "about/industrial-actuators/"; Type = "About Page" },
    @{ Current = "contact-support-sales.html"; Suggested = "contact/support-sales/"; Type = "Contact Page" },
    @{ Current = "industries-served.html"; Suggested = "industries/"; Type = "Industry Landing" },
    @{ Current = "resources-technical-docs.html"; Suggested = "resources/technical-documentation/"; Type = "Resource Page" },
    @{ Current = "services-installation-maintenance.html"; Suggested = "services/installation-maintenance/"; Type = "Service Page" },
    @{ Current = "global-presence/susin-itork-india.html"; Suggested = "locations/india/"; Type = "Location Page" },
    @{ Current = "global-presence/susin-itork-uae.html"; Suggested = "locations/uae/"; Type = "Location Page" },
    @{ Current = "global-presence/susin-itork-qatar.html"; Suggested = "locations/qatar/"; Type = "Location Page" }
)

Write-Host "📋 Current URL Structure Analysis`n" -ForegroundColor Yellow

foreach ($url in $urls) {
    Write-Host "Type: $($url.Type)" -ForegroundColor Green
    Write-Host "  Current:   $($url.Current)" -ForegroundColor White
    Write-Host "  Suggested: $($url.Suggested)" -ForegroundColor Cyan
    
    # Calculate SEO score improvements
    $improvements = @()
    if ($url.Suggested -notlike "*.html") { $improvements += "✓ Clean URL (no .html)" }
    if ($url.Suggested -like "*/") { $improvements += "✓ Trailing slash" }
    if ($url.Suggested -match "/") { $improvements += "✓ Hierarchical structure" }
    if ($url.Suggested -notlike "*-*-*") { $improvements += "✓ Simplified naming" }
    
    Write-Host "  Benefits:  $($improvements -join ', ')" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "`n📊 SEO Best Practices for URLs:`n" -ForegroundColor Yellow
Write-Host "  1. Remove .html extensions (use URL rewriting)" -ForegroundColor White
Write-Host "  2. Use hierarchical structure (e.g., /products/category/)" -ForegroundColor White
Write-Host "  3. Keep URLs short and descriptive" -ForegroundColor White
Write-Host "  4. Use hyphens (-) not underscores (_)" -ForegroundColor White
Write-Host "  5. Use lowercase letters only" -ForegroundColor White
Write-Host "  6. Include trailing slashes for consistency" -ForegroundColor White

Write-Host "`n🔧 Implementation Steps:`n" -ForegroundColor Cyan
Write-Host "  Option A: Apache .htaccess Rewrite Rules" -ForegroundColor Green
Write-Host "  -----------------------------------------" -ForegroundColor Gray
Write-Host @"
  # Add to .htaccess:
  RewriteEngine On
  
  # Remove .html extension
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}\.html -f
  RewriteRule ^(.*)$ $1.html [L]
  
  # Redirect old URLs to new structure
  Redirect 301 /products-actuators-gearboxes.html /products/actuators-gearboxes/
  Redirect 301 /about-industrial-actuators.html /about/industrial-actuators/
"@ -ForegroundColor Gray

Write-Host "`n  Option B: Keep Current Structure (Recommended for Now)" -ForegroundColor Green
Write-Host "  ------------------------------------------------------" -ForegroundColor Gray
Write-Host "  - Current URLs are acceptable and already indexed" -ForegroundColor White
Write-Host "  - Focus on content quality and meta tag optimization" -ForegroundColor White
Write-Host "  - Implement clean URLs in future redesign" -ForegroundColor White

Write-Host "`n✅ Current URL Structure: ACCEPTABLE" -ForegroundColor Green
Write-Host "   All pages use descriptive, hyphenated filenames" -ForegroundColor Gray
Write-Host "   No changes required immediately`n" -ForegroundColor Gray
