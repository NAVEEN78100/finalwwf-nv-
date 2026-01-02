<#
install-dotnet.ps1
Helper script to detect and (optionally) install .NET 8 SDK and dotnet-ef tool using winget.
Run this script in an elevated PowerShell (Run as Administrator) if you want it to install via winget.

Usage:
  # run interactively
  .\scripts\install-dotnet.ps1

This script will:
 - check `dotnet --info` for SDKs
 - if no SDKs found, attempt to install the .NET 8 SDK via winget
 - install the dotnet-ef global tool (used to run EF Core migrations)
#>

Write-Output "Checking for installed .NET SDKs..."
$sdks = & dotnet --list-sdks 2>$null
if (![string]::IsNullOrWhiteSpace($sdks)) {
  Write-Output "Found SDKs:\n$sdks"
} else {
  Write-Output "No .NET SDKs detected."
  if (Get-Command winget -ErrorAction SilentlyContinue) {
    Write-Output "winget found. Attempting to install Microsoft.DotNet.SDK.8 (requires elevation)..."
    try {
      Start-Process -FilePath winget -ArgumentList 'install','--id','Microsoft.DotNet.SDK.8','-e' -Verb RunAs -Wait
    } catch {
      Write-Error "Failed to run winget installer. Run the following manually as Administrator:\nwinget install --id Microsoft.DotNet.SDK.8 -e"
      exit 1
    }
  } else {
    Write-Error "winget not found. Please download and install the .NET 8 SDK from:\nhttps://dotnet.microsoft.com/en-us/download/dotnet/8.0"
    exit 1
  }

  Write-Output "Re-checking installed SDKs..."
  $sdks = & dotnet --list-sdks 2>$null
  if ([string]::IsNullOrWhiteSpace($sdks)) {
    Write-Error "SDK still not detected after attempted install. Please install manually and re-run this script."
    exit 1
  } else {
    Write-Output "Installed SDKs:\n$sdks"
  }
}

Write-Output "Installing dotnet-ef global tool (if not already installed)..."
try {
  $ef = & dotnet tool list -g 2>$null | Select-String -Pattern "dotnet-ef"
  if ($ef) {
    Write-Output "dotnet-ef already installed globally."
  } else {
    & dotnet tool install --global dotnet-ef --version 9.*
    Write-Output "dotnet-ef installed globally. You may need to restart your shell to use it."
  }
} catch {
  Write-Error "Failed to install dotnet-ef: $_"
}

Write-Output "Done. Run 'dotnet --info' to verify SDKs and 'dotnet ef --help' to verify EF tool."
