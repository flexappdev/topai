#!/usr/bin/env bash
set -e

# Log in to Docker Hub using credentials from top-level secrets if available
if [ -f "/run/secrets/DOCKER_USERNAME" ] && [ -f "/run/secrets/DOCKER_PASSWORD" ]; then
  DOCKER_USERNAME=$(cat /run/secrets/DOCKER_USERNAME)
  DOCKER_PASSWORD=$(cat /run/secrets/DOCKER_PASSWORD)
fi

if [ -n "$DOCKER_USERNAME" ] && [ -n "$DOCKER_PASSWORD" ]; then
  echo "$DOCKER_PASSWORD" | sudo docker login -u "$DOCKER_USERNAME" --password-stdin >/dev/null 2>&1
fi

sudo docker-compose down --volumes --remove-orphans
sudo docker-compose build --no-cache
sudo docker-compose up -d

printf "\nFrontend: http://localhost:24500\n"
printf "Backend API: http://localhost:24501\n"
printf "Backoffice: http://localhost:24502\n"
