import { useQuery } from "@apollo/client";
import Line from "./Line";
import { GQL_GET_INVOICES } from "../../graphql/queries/getInvoices.mjs";

export function Table() {
  const { loading, error, data } = useQuery(GQL_GET_INVOICES);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>KEY</th>
          <th>ISSUER</th>
          <th>RECIPIENT</th>
          <th>VALUE</th>
        </tr>
      </thead>
      <tbody>
        {data.invoices.map((invoice) => {
          return (
            <Line
              key={invoice.id}
              id={invoice.id}
              uniqKey={invoice.info.key}
              issuer={invoice.issuer.name}
              recipient={invoice.recipient.name}
              value={invoice.total}
            />
          );
        })}
      </tbody>
    </table>
  );
}
