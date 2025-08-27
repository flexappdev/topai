#!/usr/bin/env bash
set -e

sudo docker-compose down --volumes --remove-orphans
sudo docker-compose build --no-cache
sudo docker-compose up -d

printf "\nFrontend: http://localhost:24500\n"
printf "Backend API: http://localhost:24501\n"
printf "Backoffice: http://localhost:24502\n"
