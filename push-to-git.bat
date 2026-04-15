@echo off
cd /d "%~dp0"

echo.
set /p msg="Commit message: "

git add .
git commit -m "%msg%"
git push origin main

echo.
echo Done!
pause