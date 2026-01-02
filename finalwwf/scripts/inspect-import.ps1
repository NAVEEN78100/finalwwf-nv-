param(
  [Parameter(Mandatory=$true)][string]$Name
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$target = Join-Path $repoRoot "imports\incoming\$Name"

if (-not (Test-Path $target)) {
  Write-Error "Import folder not found: $target"
  exit 1
}

Write-Host "Top-level contents of $target:`n"
Get-ChildItem -Path $target | ForEach-Object { Write-Host ($_ | Select-Object -ExpandProperty Name) }

Write-Host "`nIf this looks like an ASP.NET project, common files to look for: *.csproj, Views/, wwwroot/."
