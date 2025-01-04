import { useGetInvoices } from '../../../hooks/graphql/queries/useGetInvoices'
import Container from '../../common/Container'
import Header from '../../common/Header'
import Table from '../../common/Table'
import TFooter from '../../common/TFooter'
import THead from '../../common/THead'
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
        <Container>
            <Header />
            <Table>
                <THead
                    columns={['ID', 'KEY', 'ISSUER', 'RECIPIENT', 'VALUE']}
                />
                <tbody>
                    {invoices.map(({ id, info, issuer, recipient, total }) => {
                        return (
                            <TLine
                                key={id}
                                uniqKey={info.key}
                                id={id}
                                issuer={issuer.name}
                                recipient={recipient.name}
                                value={total}
                            />
                        )
                    })}
                </tbody>
                <TFooter colSpan={3} />
            </Table>
        </Container>
    )
}
