FROM node:10-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production

COPY . .
RUN npm run production-build

# -----

FROM nginx:1.12-alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD nginx -g 'daemon off;'
