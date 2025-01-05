import { useQuery } from 'urql'
import { Invoice } from '../../../shared/types/getInvoice'

const GetInvoices = `#graphql
    query GetInvoices($pageSize: Int!, $page: Int!) {
        invoices(pageSize: $pageSize, page: $page) {
            id
            info {
                key
                number
                series
            }
            issuer {
                name
                identity
            }
            recipient {
                name
                identity
            }
            total 
        }
    }  
`

export function useGetInvoices(pageSize: number, page: number) {
    return useQuery<{ invoices: Invoice[] }>({
        query: GetInvoices,
        variables: { pageSize, page },
    })
}
