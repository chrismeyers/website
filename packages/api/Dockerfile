FROM node:16.9.1-slim

WORKDIR /app
COPY .yarn/ ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/api/package.json ./packages/api/
RUN yarn workspaces focus api --production > /dev/null 2>&1
COPY resume/ ./resume
COPY packages/api/ ./packages/api/

WORKDIR /app/packages/api

EXPOSE 8888
CMD [ "node", "src/server.js" ]
