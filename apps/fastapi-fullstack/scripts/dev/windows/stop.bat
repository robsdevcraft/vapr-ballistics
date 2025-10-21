@echo off
REM Development Environment - Stop
cd /d "%~dp0\..\..\..\docker"
docker-compose -f docker-compose.dev.yml down
