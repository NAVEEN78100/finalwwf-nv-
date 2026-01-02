$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
# project root is one level up from scripts
$projectRoot = Resolve-Path (Join-Path $scriptDir "..")
Write-Host "Starting Next dev in $projectRoot"
# Start Next from project root
$proc = Start-Process -FilePath npm -ArgumentList 'run','dev' -WorkingDirectory $projectRoot -PassThru
Start-Sleep -Seconds 1
for ($i = 0; $i -lt 30; $i++) {
    try {
        $r = Invoke-WebRequest -Uri 'http://localhost:3000/company/partners' -UseBasicParsing -TimeoutSec 2
        Write-Host 'UP' $r.StatusCode
        break
    } catch {
        Write-Host 'waiting...' $i
        Start-Sleep -Seconds 1
    }
}
Write-Host 'Done loop'