FROM node:8
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install npm@latest -g && \
    npm install -g npm-check-updates -g && \
    npm install
