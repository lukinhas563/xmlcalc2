import { useGetInvoices } from '../../../hooks/graphql/queries/useGetInvoices'
import Table from '../../common/Table'
import TLine from '../../common/TLine'

export default function Home() {
    const [{ data, fetching, error }] = useGetInvoices()

    if (fetching) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error</h1>
    }

    if (!data) {
        return <h1>Error</h1>
    }

    const invoices = data.invoices

    return (
        <Table>
            <tbody>
                {invoices.map(({ id, info, issuer, recipient, total }) => {
                    return (
                        <TLine
                            key={info.key}
                            uniqKey={info.key}
                            id={id}
                            issuer={issuer.name}
                            recipient={recipient.name}
                            value={total}
                        />
                    )
                })}
            </tbody>
        </Table>
    )
}
