export const invoiceTypeDefs = `#graphql
  extend type Query {
    invoices: [Invoice]!
    invoice(id: Int): Invoice
  }

  type Invoice {
    Id: Int!
    Info: Info!
    Issuer: Person!
    Recipient: Person!
    Service: Service!
    Total: Float!
  }

  type Info {
    Key: String!
    Number: Int!
    Competence: String!
    DateIssue: String!
    Series: Int!
  }

  type Person {
    Name: String!
    Identity: String!
    Address: Address!
    City: String
  }

  type Address {
    Street: String!
    Number: String!
    Neighborhood: String!
    Complement: String
  }

  type Service {
    Code: String!
    CodeDescription: String!
    ServiceDescription: String!
    LocationProvision: String!
  }
`;