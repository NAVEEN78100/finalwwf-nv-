<#
setup-partners-db.ps1
Helper script to run EF Core migrations for the Partners project (applies migrations to the configured database).

Usage:
  # from repo root
  .\scripts\setup-partners-db.ps1

Notes:
- This script requires the .NET SDK and the dotnet-ef tool (the `install-dotnet.ps1` script can help install them).
- The project uses SQL Server (see PackageReference to Microsoft.EntityFrameworkCore.SqlServer). Ensure a SQL Server instance is reachable and the connection string in
  `temp\partners\Partners\Partners\appsettings.Development.json` or `appsettings.json` points to a valid database.
#>

$projPath = Join-Path $PSScriptRoot "..\temp\partners\Partners\Partners"
if (-not (Test-Path $projPath)) {
  Write-Error "Project folder not found: $projPath"
  exit 1
}

Push-Location $projPath
try {
  Write-Output "Restoring packages..."
  dotnet restore

  Write-Output "Running EF Core migrations (dotnet ef database update)..."
  dotnet ef database update
  Write-Output "Migrations applied (if any)."
} catch {
  Write-Error "Error while applying migrations: $_"
} finally {
  Pop-Location
}
