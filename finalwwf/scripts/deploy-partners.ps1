param(
    [string]$Source = ".\temp\partners\Partners\Partners\wwwroot",
    [string]$Target = ".\public\company\partners",
    [switch]$WhatIf,
    [switch]$Overwrite
)

Write-Host "Deploy Partners assets"
Write-Host "Source: $Source"
Write-Host "Target: $Target"

if (-not (Test-Path $Source)) {
    Write-Error "Source path does not exist: $Source"
    exit 2
}

if ($WhatIf) {
    Write-Host "WhatIf: would create target and copy files (dry-run)"
    Get-ChildItem -Path $Source -Recurse | ForEach-Object { Write-Host "DRY: $_" }
    exit 0
}

# Create target if missing
if (-not (Test-Path $Target)) {
    Write-Host "Creating target directory: $Target"
    New-Item -ItemType Directory -Path $Target -Force | Out-Null
}

if ($Overwrite) {
    Write-Host "Overwrite mode: clearing target"
    Get-ChildItem -Path $Target -Recurse -Force | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Copying files..."
Copy-Item -Path (Join-Path $Source '*') -Destination $Target -Recurse -Force

$count = (Get-ChildItem -Path $Target -Recurse | Measure-Object).Count
Write-Host "Copied $count items to $Target"

Write-Host "Done. You can now run the app and visit /company/partners"
