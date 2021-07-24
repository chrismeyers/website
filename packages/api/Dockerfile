FROM node:16.5.0-slim

WORKDIR /app
COPY .yarn/ ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/api/package.json ./packages/api/
RUN yarn workspaces focus api --production
COPY resume/ ./resume
COPY packages/api/ ./packages/api/

WORKDIR /app/packages/api

EXPOSE 8888
CMD [ "yarn", "workspace", "api", "start" ]
