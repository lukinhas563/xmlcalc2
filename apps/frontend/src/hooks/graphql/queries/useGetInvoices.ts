import { useQuery } from 'urql'
import { Page } from '../../../shared/types/getInvoice'

const GetInvoices = `#graphql
query PageInvoices($page: Int!, $pageSize: Int!) {
  invoices(page: $page, pageSize: $pageSize) {
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
    currentPage
    maxPages
    pageSize
  }
}
`

export function useGetInvoices(pageSize: number, page: number) {
    return useQuery<{ invoices: Page }>({
        query: GetInvoices,
        variables: { pageSize, page },
    })
}
