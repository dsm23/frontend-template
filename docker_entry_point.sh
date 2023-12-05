#!/bin/bash
set -e

bash /docker-entrypoint.d/20-envsubst-on-templates.sh

bash /environment-details/replacePlaceholder.sh \
  /usr/share/nginx/html/importMetaEnvPlaceholder.js

nginx -g "daemon off;"
