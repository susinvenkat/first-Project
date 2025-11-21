<# 
.SYNOPSIS
    Smart navigation header inserter for Susin Group website

.DESCRIPTION
    Inserts new navigation header immediately after <body> tag,
    regardless of existing navigation structure
#>

function Write-Success { param($Message) Write-Host "✅ $Message" -ForegroundColor Green }
function Write-Info { param($Message) Write-Host "ℹ️  $Message" -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host "⚠️  $Message" -ForegroundColor Yellow }

$ProjectRoot = $PSScriptRoot
$NavigationHeaderPath = Join-Path $ProjectRoot "navigation-header.html"

# Read navigation header
$NavigationHeader = Get-Content $NavigationHeaderPath -Raw
Write-Success "Loaded navigation header template"

# Pages that need the header inserted
$PagesToUpdate = @(
    @{Path="about.html"; IsSubdir=$false},
    @{Path="services.html"; IsSubdir=$false},
    @{Path="industries.html"; IsSubdir=$false},
    @{Path="careers.html"; IsSubdir=$false},
    @{Path="contact.html"; IsSubdir=$false},
    @{Path="resources.html"; IsSubdir=$false},
    @{Path="services-installation-maintenance.html"; IsSubdir=$false},
    @{Path="industries-served.html"; IsSubdir=$false},
    @{Path="about-industrial-actuators.html"; IsSubdir=$false},
    @{Path="contact-support-sales.html"; IsSubdir=$false},
    @{Path="resources-technical-docs.html"; IsSubdir=$false}
)

foreach ($PageInfo in $PagesToUpdate) {
    $FilePath = Join-Path $ProjectRoot $PageInfo.Path
    
    if (-not (Test-Path $FilePath)) {
        Write-Warning "File not found: $($PageInfo.Path)"
        continue
    }
    
    Write-Info "Processing: $($PageInfo.Path)"
    
    try {
        $Content = Get-Content $FilePath -Raw
        
        # Prepare navigation (adjust paths if needed)
        $NavContent = $NavigationHeader
        if ($PageInfo.IsSubdir) {
            $NavContent = $NavContent -replace 'src="logo\.jpg"', 'src="../logo.jpg"'
            $NavContent = $NavContent -replace 'href="([a-z-]+\.html)', 'href="../$1'
        }
        
        # Remove old navigation elements (nav, header that aren't chat-header)
        $Content = $Content -replace '(?s)<!-- Navigation -->.*?</nav>', ''
        $Content = $Content -replace '(?s)<nav class="navbar">.*?</nav>', ''
        
        # Insert new header right after <body> and skip-link
        if ($Content -match '(<body>[\s\S]*?(?:<a class="skip-link"[^>]*>.*?</a>[\s\S]*?)?)([\s\S]*)') {
            $BeforePart = $matches[1]
            $AfterPart = $matches[2]
            
            $NewContent = $BeforePart + "`n`n" + $NavContent + "`n`n" + $AfterPart
            $NewContent | Set-Content $FilePath -NoNewline
            
            Write-Success "  ✓ Inserted navigation header"
        } else {
            Write-Warning "  Could not find insertion point"
        }
        
    } catch {
        Write-Warning "  Error: $($_.Exception.Message)"
    }
}

Write-Success "`n✅ All pages processed!"
Write-Info "Open any page in browser to verify navigation works"
