FROM node:8-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --no-progress

COPY . .
RUN npm run production-build

# -----

FROM nginx:1.12-alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY default.conf.tmpl /etc/nginx/conf.d/
CMD envsubst < /etc/nginx/conf.d/default.conf.tmpl > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
