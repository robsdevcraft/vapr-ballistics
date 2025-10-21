@echo off
REM Production Environment - Start
cd /d "%~dp0\..\..\..\docker"
docker-compose -f docker-compose.yml up -d --build
