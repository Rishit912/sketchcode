@echo off
echo Installing MongoDB Community Server...

REM Create data directory if it doesn't exist
mkdir "C:\data\db" 2>nul

REM Download MongoDB 6.0 MSI installer
curl -L "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.12-signed.msi" --output "%TEMP%\mongodb.msi"

REM Install MongoDB silently
msiexec /i "%TEMP%\mongodb.msi" /quiet /qn /norestart ADDLOCAL="ServerService"

REM Clean up
del "%TEMP%\mongodb.msi"

REM Create mongod configuration file
echo systemLog:> "C:\Program Files\MongoDB\Server\6.0\mongod.cfg"
echo    destination: file>> "C:\Program Files\MongoDB\Server\6.0\mongod.cfg"
echo    path: C:\data\log\mongod.log>> "C:\Program Files\MongoDB\Server\6.0\mongod.cfg"
echo storage:>> "C:\Program Files\MongoDB\Server\6.0\mongod.cfg"
echo    dbPath: C:\data\db>> "C:\Program Files\MongoDB\Server\6.0\mongod.cfg"

REM Install and start MongoDB service
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\6.0\mongod.cfg" --install
net start MongoDB

echo MongoDB installation complete!
echo Please restart your terminal and run: npm run start
pause