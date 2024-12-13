export const invoiceTypeDefs = `#graphql
  extend type Query {
    invoices: [Invoice]!
    invoice(id: Int): Invoice
  }

  type Invoice {
    id: Int!
    info: Info!
    issuer: Person! 
    recipient: Person!
    service: Service!
    total: Float!
  }

  type Info {
    key: String!
    number: Int!
    competence: String!
    dateIssue: String!
    series: Int!
  }

  type Person {
    name: String!
    identity: String!
    address: Address!
    city: String
  }

  type Address {
    street: String!
    number: String!
    neighborhood: String!
    complement: String
  }

  type Service {
    code: String!
    codeDescription: String!
    serviceDescription: String!
    locationProvision: String!
  }
`
