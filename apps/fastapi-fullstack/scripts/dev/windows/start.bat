@echo off
REM Development Environment - Start
cd /d "%~dp0\..\..\..\docker"
docker-compose -f docker-compose.dev.yml up --build
