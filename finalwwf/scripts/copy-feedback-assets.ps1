<#
Copies the original FeedbackPage wwwroot static assets (CSS + images) into Next.js public/company/feedback/wwwroot.

Usage:
  powershell -ExecutionPolicy Bypass -File .\scripts\copy-feedback-assets.ps1

This script will copy the authoritative CSS and the three JPG images from the source .NET folder into public so the Feedback page renders exactly as the original.
#>

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path "$root\.."

$sourceCss = Join-Path $projectRoot 'company\FeedbackPage\FeedbackPage\wwwroot\css\feedback.css'
$sourceSections = Join-Path $projectRoot 'company\FeedbackPage\FeedbackPage\wwwroot\css\sections.css'
$sourceImages = Join-Path $projectRoot 'company\FeedbackPage\FeedbackPage\wwwroot\images\feedback'

$targetCssDir = Join-Path $projectRoot 'public\company\feedback\wwwroot\css'
$targetImagesDir = Join-Path $projectRoot 'public\company\feedback\wwwroot\images\feedback'

Write-Host "Source CSS: $sourceCss"
Write-Host "Source Images Dir: $sourceImages"
Write-Host "Target CSS Dir: $targetCssDir"

if (-Not (Test-Path $sourceCss)) {
    Write-Warning "Source CSS not found: $sourceCss"
    exit 1
}

New-Item -ItemType Directory -Force -Path $targetCssDir | Out-Null
New-Item -ItemType Directory -Force -Path $targetImagesDir | Out-Null

Copy-Item -Path $sourceCss -Destination (Join-Path $targetCssDir 'feedback.css') -Force
if (Test-Path $sourceSections) { Copy-Item -Path $sourceSections -Destination (Join-Path $targetCssDir 'sections.css') -Force }

if (Test-Path $sourceImages) {
    Get-ChildItem -Path $sourceImages -File | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination (Join-Path $targetImagesDir $_.Name) -Force
        Write-Host "Copied $($_.Name)"
    }
} else {
    Write-Warning "Source images folder not found: $sourceImages"
}

Write-Host "Done. Restart dev server if running to see changes." 
