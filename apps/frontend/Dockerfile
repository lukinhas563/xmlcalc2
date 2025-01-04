# Etapa de build
FROM node:22.11 AS build

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

# Etapa de execução
FROM node:22.11 AS production

WORKDIR /app


COPY --from=build /app/dist /app/dist


RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
