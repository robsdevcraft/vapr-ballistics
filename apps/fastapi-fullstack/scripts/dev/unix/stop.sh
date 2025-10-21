#!/bin/bash
# Development Environment - Stop
cd "$(dirname "cd "$(dirname "$0")/../../.."")/../../../docker"
docker-compose -f docker-compose.dev.yml down
