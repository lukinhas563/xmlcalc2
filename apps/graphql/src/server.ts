import 'reflect-metadata'

import path from 'node:path'

import { ApolloServer } from '@apollo/server'

import { buildSchema } from 'type-graphql'
import InvoiceResolvers from './resolvers/invoice_resolver'

import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload-ts'
import { expressMiddleware } from '@apollo/server/express4'

export default async function main() {
  const app = express()

  app.use(express.json())
  app.use(graphqlUploadExpress())

  const schema = await buildSchema({
    resolvers: [InvoiceResolvers],
    emitSchemaFile: path.resolve(__dirname, 'graphql', 'schema.gql'),
  })

  const server = new ApolloServer({ schema, csrfPrevention: false })

  await server.start()

  app.use('/graphql', expressMiddleware(server))

  app.listen(4000, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql')
  })
}
