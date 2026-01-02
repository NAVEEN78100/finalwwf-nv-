#!/usr/bin/env pwsh
Write-Output "Run Partners ASP.NET app (helper script)"

$projPath = Join-Path $PSScriptRoot "..\temp\partners\Partners\Partners"
if (-not (Test-Path $projPath)) {
  Write-Error "Project folder not found: $projPath"
  Write-Output "Make sure you extracted the zip to temp\partners or update the script path."
  exit 1
}

# Check for installed SDKs
$sdks = & dotnet --list-sdks 2>$null
if ([string]::IsNullOrWhiteSpace($sdks)) {
  Write-Error "No .NET SDKs detected. Install .NET 8 SDK: https://dotnet.microsoft.com/en-us/download/dotnet/8.0"
  exit 2
}

Write-Output "Using .NET SDKs:\n$sdks"

Push-Location $projPath
try {
  Write-Output "Starting Partners app on http://localhost:5005 ..."
  $env:ASPNETCORE_URLS = 'http://localhost:5005'
  dotnet run
} finally {
  Pop-Location
}
