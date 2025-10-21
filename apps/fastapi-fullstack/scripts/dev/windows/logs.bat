@echo off
REM Development Environment - Logs
cd /d "%~dp0\..\..\..\docker"
docker-compose -f docker-compose.dev.yml logs -f
