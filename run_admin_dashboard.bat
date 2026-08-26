@echo off
title AKHIL Super Admin Dashboard (لوحة تحكم أخيل)
color 0b
echo ========================================================
echo   🐎 AKHIL Super Admin Dashboard - أخيل لوحة العمليات
echo ========================================================
echo.
echo Starting Next.js Admin Dashboard Server...
echo Opening http://localhost:3000 in your browser...
echo.

cd /d "d:\3altayer.app\admin-dashboard"
start "" "http://localhost:3000"
npm run dev

pause
