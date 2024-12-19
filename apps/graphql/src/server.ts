import 'reflect-metadata'

import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'type-graphql'
import { graphqlUploadExpress } from 'graphql-upload-ts'
import { pubsub } from './pubsub'
import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { Container } from 'typedi'
import path from 'node:path'
import InvoiceResolvers from './resolvers/invoice_resolver'
import cors from 'cors'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import protect from 'overload-protection'
import setEnvironments from './shared/config/environments'
import { Environments } from './shared/config/environments'

export default async function main(environments: Environments) {
  const app = express()
  protect('express')

  const httpServer = createServer(app)

  const schema = await buildSchema({
    resolvers: [InvoiceResolvers],
    pubSub: pubsub,
    container: Container,
    emitSchemaFile: path.resolve(__dirname, 'graphql', 'schema.gql'),
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: environments.WEBSOCKET_PATH,
  })

  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
    csrfPrevention: false,
  })

  await server.start()

  app.use(
    environments.GRAPHQL_PATH,
    cors({
      origin: environments.GRAPHQL_CORS_ORIGIN,
    }),
    express.json(),
    graphqlUploadExpress(),
    expressMiddleware(server),
  )

  const port = 4000
  httpServer.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${environments.GRAPHQL_PATH}`,
    )
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${port}${environments.WEBSOCKET_PATH}`,
    )
  })
}

const env = setEnvironments()

main(env)
