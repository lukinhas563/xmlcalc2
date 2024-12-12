import {invoiceTypeDefs} from "./invoice/typeDefs.mjs";
import {invoiceResolvers} from './invoice/resolvers.mjs'

const rootTypeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const rootResolvers = {
  Query: {
    hello: () => 'world',
  },
};

export const typeDefs = [rootTypeDefs, invoiceTypeDefs]
export const resolvers = [rootResolvers, invoiceResolvers]