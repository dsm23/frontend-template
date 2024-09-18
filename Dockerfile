FROM oven/bun:1.1.28-slim AS builder

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile
RUN bun run build


FROM nginx:1.25.3-alpine3.18-slim

RUN apk add --no-cache bash

COPY --from=builder /app/dist /usr/share/nginx/html

RUN mkdir /environment-details

COPY docker_entry_point.sh /environment-details/
COPY .env.example /environment-details/
COPY replacePlaceholder.sh /environment-details/

COPY nginx/nginx.conf /etc/nginx/templates/default.conf.template

# implement changes required to run NGINX as an unprivileged user
RUN sed -i '/user  nginx;/d' /etc/nginx/nginx.conf \
    && sed -i 's,/var/run/nginx.pid,/tmp/nginx.pid,' /etc/nginx/nginx.conf \
# nginx user must own the cache and etc directory to write cache and tweak the nginx config
    && chown -R nginx /var/cache/nginx \
    && chmod -R g+w /var/cache/nginx \
    && chown -R nginx /etc/nginx \
    && chmod -R g+w /etc/nginx \
# change the placeholder js file in html
    && chown -R nginx /usr/share/nginx/html

USER nginx

ENTRYPOINT ["sh","/environment-details/docker_entry_point.sh"]
