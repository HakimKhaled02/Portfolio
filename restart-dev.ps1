# Restart Development Server Script
Write-Host "Stopping any existing Node processes on ports 3000 and 5000..." -ForegroundColor Yellow

# Kill processes on port 3000
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($port3000) {
    foreach ($pid in $port3000) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Write-Host "Stopped process on port 3000 (PID: $pid)" -ForegroundColor Green
    }
}

# Kill processes on port 3001 (backend server)
$port3001 = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($port3001) {
    foreach ($pid in $port3001) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Write-Host "Stopped process on port 3001 (PID: $pid)" -ForegroundColor Green
    }
}

Write-Host "`nStarting development server..." -ForegroundColor Cyan
Start-Sleep -Seconds 2

# Start the dev server
npm run dev

