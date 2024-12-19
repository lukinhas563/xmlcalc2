FROM node:22.11

WORKDIR /app
COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

CMD ["node", "./dist/server.js"]