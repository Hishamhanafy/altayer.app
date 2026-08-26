@echo off
title AKHIL Super Admin Dashboard (لوحة تحكم أخيل)
color 0b
echo ========================================================
echo   🐎 AKHIL Super Admin Dashboard - أخيل لوحة العمليات
echo ========================================================
echo.
echo Cleaning stale cache and starting Next.js Admin Server...
echo.

cd /d "d:\3altayer.app\admin-dashboard"

if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
)

echo Opening http://localhost:3000 in your browser...
start "" "http://localhost:3000"
npm run dev

pause
