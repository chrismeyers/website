FROM node:16.5.0-slim as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY ./ .
RUN yarn build

FROM nginx:1.21.0 as production-stage
RUN mkdir /app
COPY --from=build-stage /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf
