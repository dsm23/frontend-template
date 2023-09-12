#!/bin/bash
set -e

./20-envsubst-on-templates.sh

# Inject environment variables to index.html
./environment-details/import-meta-env \
  -x /environment-details/.env.example \
  -p /usr/share/nginx/html/index.html || exit 1

nginx -g "daemon off;"
