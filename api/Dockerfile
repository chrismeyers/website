FROM node:16.3.0-slim

WORKDIR /resume
ADD resume/ ./

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --production
COPY ./ .

EXPOSE 8888
CMD [ "node", "src/server.js" ]
