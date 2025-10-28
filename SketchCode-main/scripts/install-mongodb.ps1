# This script must be run as Administrator
# Right-click PowerShell and choose "Run as Administrator"

$mongoDBVersion = "6.0.12"
$downloadUrl = "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-$mongoDBVersion-signed.msi"
$installerPath = "$env:TEMP\mongodb.msi"
$dataPath = "C:\data\db"
$logPath = "C:\data\log"

Write-Host "Creating MongoDB directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $dataPath | Out-Null
New-Item -ItemType Directory -Force -Path $logPath | Out-Null

Write-Host "Downloading MongoDB $mongoDBVersion..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath

Write-Host "Installing MongoDB..." -ForegroundColor Yellow
Start-Process msiexec.exe -Wait -ArgumentList "/i `"$installerPath`" /quiet ADDLOCAL=`"ServerService`" SHOULD_INSTALL_COMPASS=`"0`""

Write-Host "Creating MongoDB configuration file..." -ForegroundColor Yellow
@"
systemLog:
    destination: file
    path: $logPath\mongod.log
storage:
    dbPath: $dataPath
net:
    bindIp: 127.0.0.1
    port: 27017
"@ | Out-File -FilePath "C:\Program Files\MongoDB\Server\6.0\bin\mongod.cfg" -Encoding UTF8

Write-Host "Starting MongoDB service..." -ForegroundColor Yellow
Start-Service MongoDB

Write-Host "Cleaning up..." -ForegroundColor Yellow
Remove-Item $installerPath -Force

Write-Host "`nMongoDB installation complete!" -ForegroundColor Green
Write-Host "Service name: MongoDB"
Write-Host "Data path: $dataPath"
Write-Host "Log path: $logPath\mongod.log"
Write-Host "Connection string: mongodb://localhost:27017"

# Test connection
Write-Host "`nTesting connection..." -ForegroundColor Yellow
Try {
    $client = New-Object System.Net.Sockets.TcpClient
    $client.Connect("localhost", 27017)
    Write-Host "MongoDB is responding on port 27017" -ForegroundColor Green
    $client.Close()
} Catch {
    Write-Host "Could not connect to MongoDB - please check the service status" -ForegroundColor Red
}