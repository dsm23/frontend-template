#################
# Build the app #
#################
FROM node:18.17.1-slim as build

COPY . .

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile
RUN pnpm build

RUN npx pkg ./node_modules/@import-meta-env/cli/bin/import-meta-env.js \
  --target node18-linuxstatic-x64 \
  --output import-meta-env


################
# Run in NGINX #
################
FROM nginx:1.25.2-alpine3.18-slim
COPY --from=build /dist /usr/share/nginx/html

RUN mkdir /environment-details

COPY --from=build /import-meta-env /environment-details/
COPY .env.example docker_entry_point.sh /environment-details/

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

ENTRYPOINT ["sh","/environment-details/docker_entry_point.sh"]
