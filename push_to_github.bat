@echo off
set "PATH=%PATH%;C:\Program Files\Git\cmd"
echo ===================================================
echo [3altayer.app] Pushing all source code to GitHub...
echo ===================================================
echo.
echo Repo: https://github.com/hishamhanafy/3altayer.app.git
echo Branch: main
echo.
cd /d d:\3altayer.app
git push -u origin main
echo.
echo ===================================================
echo [DONE] Check your repository at:
echo https://github.com/hishamhanafy/3altayer.app
echo ===================================================
pause
