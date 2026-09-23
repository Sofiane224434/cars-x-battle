#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${VPS_APP_DIR:-/home/debian/apps/cars-x-battle}"
PROJECT="${VPS_COMPOSE_PROJECT:-cxb}"

echo "==> Repertoire de deploiement : $APP_DIR"
cd "$APP_DIR"

echo "==> Mise a jour du code"
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env -e "backend/.env"

if [ ! -f .env ]; then
  echo "==> Creation du fichier .env"
  cat << 'ENV_EOF' > .env
DB_ROOT_PASSWORD=cxb_root_password_secret
DB_NAME=cars_x_battle
DB_USER=cxb_user
DB_PASSWORD=cxb_db_password_secret
JWT_SECRET=cxb_jwt_secret_super_key_2026
JWT_EXPIRES_IN=7d
APP_URL=https://cxb.azim404.com
CORS_ORIGIN=https://cxb.azim404.com
ENV_EOF
fi

echo "==> Build et demarrage des conteneurs"
docker compose -f docker-compose.yml -p "$PROJECT" build
docker compose -f docker-compose.yml -p "$PROJECT" up -d --remove-orphans

echo "==> Configuration Nginx"
if [ -f deploy/nginx/cxb.azim404.com-http.conf ]; then
  sudo -n cp deploy/nginx/cxb.azim404.com-http.conf /etc/nginx/sites-available/cxb.azim404.com
  sudo -n ln -sf /etc/nginx/sites-available/cxb.azim404.com /etc/nginx/sites-enabled/cxb.azim404.com.conf
  if sudo -n nginx -t; then
    sudo -n systemctl reload nginx
  fi
fi

echo "==> Verification des conteneurs"
docker compose -f docker-compose.yml -p "$PROJECT" ps

echo "==> Nettoyage images orphelines"
docker image prune -f

echo "==> Deploiement termine avec succes"
