import 'reflect-metadata'

import path from 'node:path'

import { ApolloServer } from '@apollo/server'

import { buildSchema } from 'type-graphql'
import InvoiceResolvers from './resolvers/invoice_resolver'
import cors from 'cors'
import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload-ts'
import { expressMiddleware } from '@apollo/server/express4'
import { pubsub } from './pubsub'
import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'

const WEBSOCKET_PATH = '/graphql'
const GRAPHQL_PATH = '/graphql'
const PORT_SERVER = 4000

export default async function main() {
  const app = express()

  const httpServer = createServer(app)

  app.use(
    cors({
      origin: '*',
    }),
  )
  app.use(graphqlUploadExpress())
  app.use(express.json())

  const schema = await buildSchema({
    resolvers: [InvoiceResolvers],
    pubSub: pubsub,
    emitSchemaFile: path.resolve(__dirname, 'graphql', 'schema.gql'),
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: WEBSOCKET_PATH,
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

  app.use(GRAPHQL_PATH, expressMiddleware(server))

  httpServer.listen(PORT_SERVER, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT_SERVER}${GRAPHQL_PATH}`,
    )
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT_SERVER}${WEBSOCKET_PATH}`,
    )
  })
}
