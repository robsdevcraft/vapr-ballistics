@echo off
REM Development Environment - Restart
cd /d "%~dp0\..\..\..\docker"
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build
