@echo off
rem local dev launcher (not tracked in git): sets env file for wavesrv then starts electron-vite dev
set "WAVETERM_ENVFILE=%~dp0.env"
cd /d "%~dp0"
npm run dev
