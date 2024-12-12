import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './src/models/schemas/index.mjs';

const server = new ApolloServer({typeDefs,resolvers});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);