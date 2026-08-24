@echo off
title 3altayer.app (عالطاير) - Run Servers
echo ============================================================
echo   ⚡ 3altayer.app - Starting Full System (Backend + Frontend)
echo ============================================================
echo.

echo [1/2] Launching Backend Server on port 4000...
start "3altayer Backend (Port 4000)" cmd /k "cd /d d:\3altayer.app\backend && npm run start:dev"

timeout /t 3 /nobreak >nul

echo [2/2] Launching Frontend & Admin Dashboard on port 3000...
start "3altayer Frontend (Port 3000)" cmd /k "cd /d d:\3altayer.app\admin-dashboard && npm run dev"

echo.
echo ============================================================
echo   🎉 System is starting up!
echo   - Frontend & Admin Dashboard: http://localhost:3000
echo   - Rider Web App:              http://localhost:3000/rider
echo   - Driver Web App:             http://localhost:3000/driver
echo   - Backend APIs (Swagger):     http://localhost:4000/api/docs
echo ============================================================
pause
