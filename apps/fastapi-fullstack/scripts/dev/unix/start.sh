#!/bin/bash
# Development Environment - Start
cd "$(dirname "cd "$(dirname "$0")/../../.."")/../../../docker"
docker-compose -f docker-compose.dev.yml up --build
