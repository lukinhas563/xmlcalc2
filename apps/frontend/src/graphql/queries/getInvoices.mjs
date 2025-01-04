import { gql } from "@apollo/client";

export const GQL_GET_INVOICES = gql`
  query GetInvoices {
    invoices {
      id
      info {
        key
      }
      issuer {
        name
      }
      recipient {
        name
      }
      total
    }
  }
`;
