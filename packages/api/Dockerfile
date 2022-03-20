FROM node:16.14.2-slim

WORKDIR /app
COPY .yarn/ ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/api/package.json ./packages/api/
RUN yarn workspaces focus api --production > /dev/null
COPY resume/ ./resume
COPY packages/api/ ./packages/api/

WORKDIR /app/packages/api

EXPOSE 8888
CMD [ "node", "src/server.js" ]
