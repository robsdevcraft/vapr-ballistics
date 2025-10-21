#!/bin/bash
# Development Environment - Logs
cd "$(dirname "cd "$(dirname "$0")/../../.."")/../../../docker"
docker-compose -f docker-compose.dev.yml logs -f
