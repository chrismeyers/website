FROM node:18.14.0-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run generate
RUN npm run build

FROM nginx:1.23.3-alpine-slim

RUN mkdir /app
COPY --from=builder /app/build /app
COPY config/docker/nginx.conf /etc/nginx/nginx.conf
