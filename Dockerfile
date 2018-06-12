FROM node:8
RUN mkdir -p /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install npm@latest -g && \
    npm install -g npm-check-updates && \
    npm install
COPY . .
