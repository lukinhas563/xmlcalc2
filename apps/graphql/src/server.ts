import 'reflect-metadata'

import path from 'node:path'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { buildSchema } from 'type-graphql'
import InvoiceResolvers from './resolvers/invoice_resolver'

export default async function main() {
  const schema = await buildSchema({
    resolvers: [InvoiceResolvers],
    emitSchemaFile: path.resolve(__dirname, 'graphql', 'schema.gql'),
  })

  const server = new ApolloServer({ schema })

  const { url } = await startStandaloneServer(server)

  console.log(`🚀 Server ready at ${url}`)
}
