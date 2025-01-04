import { useQuery } from 'urql'
import { Invoice } from '../../../shared/types/getInvoice'

const GetInvoices = `#graphql
    query GetInvoices {
        invoices {
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

export function useGetInvoices() {
    return useQuery<{ invoices: Invoice[] }>({ query: GetInvoices })
}
