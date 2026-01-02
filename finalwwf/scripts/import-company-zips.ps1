<#
Scans the repository `company/` folder for .zip files, extracts them into
`imports/incoming/<name>` and copies static assets (wwwroot/public/assets)
into `public/company/<name>` for quick integration.

Usage:
  # run from repo root (PowerShell)
  .\scripts\import-company-zips.ps1

#>

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$repoRoot = Split-Path -Parent $scriptDir
$companyDir = Join-Path $repoRoot 'company'

if (-not (Test-Path $companyDir)) {
  Write-Host "No 'company' folder found at: $companyDir" -ForegroundColor Yellow
  Write-Host "Create a folder named 'company' in the repo root and paste your zip files there, or use ./scripts/import-zip.ps1 to import a single zip."
  exit 0
}

$zipFiles = Get-ChildItem -Path $companyDir -Filter *.zip -Recurse -ErrorAction SilentlyContinue
if (!$zipFiles -or $zipFiles.Count -eq 0) {
  Write-Host "No .zip files found in $companyDir" -ForegroundColor Yellow
  exit 0
}

foreach ($zip in $zipFiles) {
  $name = [System.IO.Path]::GetFileNameWithoutExtension($zip.Name)
  $incoming = Join-Path $repoRoot 'imports\incoming'
  if (-not (Test-Path $incoming)) { New-Item -ItemType Directory -Path $incoming | Out-Null }
  $dest = Join-Path $incoming $name

  if (Test-Path $dest) {
    Write-Host "Destination $dest already exists — skipping extraction for $($zip.Name). Remove $dest to re-run." -ForegroundColor Yellow
    continue
  }

  Write-Host "Extracting $($zip.FullName) -> $dest"
  try {
    Expand-Archive -Path $zip.FullName -DestinationPath $dest -Force
  } catch {
    Write-Error "Failed to extract $($zip.FullName): $_"
    continue
  }

  # copy static folders into public/company/<name>
  $publicTarget = Join-Path $repoRoot "public\company\$name"
  $copied = $false

  $candidates = @('wwwroot','public','assets')
  foreach ($cand in $candidates) {
    $src = Join-Path $dest $cand
    if (Test-Path $src) {
      New-Item -Force -ItemType Directory -Path $publicTarget | Out-Null
      Write-Host "Copying $src -> $publicTarget"
      Copy-Item -Path (Join-Path $src '*') -Destination $publicTarget -Recurse -Force
      $copied = $true
      break
    }
  }

  if (-not $copied) {
    # if there were no standard static folders, try copying any top-level HTML files (index.html etc.)
    $htmlFiles = Get-ChildItem -Path $dest -Filter *.html -File -ErrorAction SilentlyContinue
    if ($htmlFiles -and $htmlFiles.Count -gt 0) {
      New-Item -Force -ItemType Directory -Path $publicTarget | Out-Null
      foreach ($hf in $htmlFiles) {
        Write-Host "Copying HTML $($hf.FullName) -> $publicTarget"
        Copy-Item -Path $hf.FullName -Destination $publicTarget -Force
      }
      $copied = $true
    } else {
      Write-Host "No static folder (wwwroot/public/assets) or HTML found inside $dest — nothing copied to $publicTarget" -ForegroundColor Yellow
    }
  }

  Write-Host "Import completed for $name`n"
}

Write-Host "All done. Inspect imports/incoming/ and public/company/ for results." -ForegroundColor Green
