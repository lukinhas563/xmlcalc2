import { useState } from 'react'
import { useGetInvoices } from '../../../hooks/graphql/queries/useGetInvoices'
import Container from '../../common/Container'
import Header from '../../common/Header'
import Modal from '../../common/Modal'
import Table from '../../common/Table'
import TFooter from '../../common/TFooter'
import THead from '../../common/THead'
import TLine from '../../common/TLine'
import Upload from '../../common/Upload'

export default function Home() {
    const PAGESIZE = 5

    const [page, setPage] = useState(1)
    const [{ data, fetching, error }, reexecuteQuery] = useGetInvoices(PAGESIZE, page)
    const [modalOpen, setModalOpen] = useState(false)

    if (fetching) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error</h1>
    }

    if (!data) {
        return <h1>Error</h1>
    }

    const invoices = data.invoices.invoices
    const maxPage = Number(data.invoices.maxPages)

    const handlePageUp = () => {
        if (page === maxPage) {
            return
        }

        const newPage = page + 1
   
        setPage(newPage)
        reexecuteQuery()
    }

    const handlePageDown = () => {
        if (page === 1) {
            return
        }

        const newPage = page - 1
   
        setPage(newPage)
        reexecuteQuery()
    }

    return (
        <Container>
            <Header />
            <Table>
                <THead
                    columns={['ID', 'KEY', 'ISSUER', 'RECIPIENT', 'VALUE', '']}
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
                                refetchInvoice={reexecuteQuery}
                            />
                        )
                    })}
                </tbody>
                <TFooter 
                    colSpan={3} 
                    onClick={() => setModalOpen(true)} 
                    onPageUp={handlePageUp} 
                    onPageDown={handlePageDown} 
                    isDownDisable={page === 1 ? true : false} 
                    isUpDisable={page === maxPage ? true : false}
                />
            </Table>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Upload invoice"
            >
                <Upload
                    onCancel={() => setModalOpen(false)}
                    refetchInvoice={reexecuteQuery}
                />
            </Modal>
        </Container>
    )
}
