@echo off
set "PATH=%PATH%;D:\src\flutter\bin"
echo ===================================================
echo [3altayer.app] Building Rider & Driver APKs...
echo ===================================================

echo [1/2] Building Rider App APK...
cd /d d:\3altayer.app\mobile\apps\rider_app
call flutter pub get
call flutter build apk --release

echo.
echo [2/2] Building Driver App APK...
cd /d d:\3altayer.app\mobile\apps\driver_app
call flutter pub get
call flutter build apk --release

echo.
echo ===================================================
echo [DONE] Both APKs have been generated successfully!
echo ===================================================
pause
