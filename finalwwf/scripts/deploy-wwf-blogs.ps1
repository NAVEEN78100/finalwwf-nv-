param(
    [switch]$DryRun
)

# Deploy helper for the wwf-blogs CRA project.
# Usage:
#  .\scripts\deploy-wwf-blogs.ps1        # build and copy
#  .\scripts\deploy-wwf-blogs.ps1 -DryRun # show steps without running

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$repoRoot = Resolve-Path (Join-Path $scriptDir "..")

$src = Join-Path $repoRoot "company\wwf-blogs"

# If the project is nested (e.g. company/wwf-blogs/wwf-blogs), prefer the inner folder that contains package.json
if (-not (Test-Path (Join-Path $src 'package.json'))) {
    $children = Get-ChildItem -Path $src -Directory -ErrorAction SilentlyContinue
    foreach ($d in $children) {
        if (Test-Path (Join-Path $d.FullName 'package.json')) {
            Write-Host "Found nested project at: $($d.FullName)"
            $src = $d.FullName
            break
        }
    }
}

$buildDir = Join-Path $src "build"
$dest = Join-Path $repoRoot "public\company\wwf-blogs"

Write-Host "Repo root: $repoRoot"
Write-Host "Source:    $src"
Write-Host "Dest:      $dest"

if (-not (Test-Path $src)) {
    Write-Error "Source folder not found: $src"
    exit 1
}

if ($DryRun) {
    Write-Host "Dry run: would run npm install and npm run build inside $src"
    Write-Host "Dry run: would copy $buildDir -> $dest and patch index.html to use relative asset paths"
    exit 0
}

# Run npm install and build
Push-Location $src
try {
    if (Test-Path package.json) {
        Write-Host "Running npm install in $src..."
        npm install
        Write-Host "Running npm run build in $src..."
        npm run build
    } else {
        Write-Warning "No package.json found in $src - skipping build step."
    }
} finally {
    Pop-Location
}

if (-not (Test-Path $buildDir)) {
    Write-Error "Build output not found at $buildDir"
    exit 1
}

# Copy build to public/company/wwf-blogs
if (Test-Path $dest) {
    Write-Host "Removing existing destination $dest"
    Remove-Item $dest -Recurse -Force
}

Write-Host "Copying build -> $dest"
Copy-Item $buildDir -Destination $dest -Recurse -Force

# Patch index.html to use relative asset paths (./static/ instead of /static/)
$indexPath = Join-Path $dest "index.html"
if (Test-Path $indexPath) {
    Write-Host "Patching index.html to use relative paths"
    $html = Get-Content $indexPath -Raw

    # Simple replacements: convert absolute leading slashes to relative paths for known static assets
    $html = $html -replace '/static/', './static/'
    $html = $html -replace '/favicon.ico', './favicon.ico'
    $html = $html -replace '/manifest.json', './manifest.json'
    $html = $html -replace '/logo192.png', './logo192.png'
    $html = $html -replace '/logo512.png', './logo512.png'

    Set-Content -Path $indexPath -Value $html -Force -Encoding UTF8
    Write-Host "index.html patched"
} else {
    Write-Warning "index.html not found at $indexPath - nothing to patch"
}

Write-Host 'Deploy complete. You can open http://localhost:3002/company/blogs (dev) or /company/wwf-blogs/index.html (static)'
