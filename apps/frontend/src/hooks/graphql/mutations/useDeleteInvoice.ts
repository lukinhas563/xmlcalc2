import { useMutation } from 'urql'

const DeleteInvoice = `#graphql
    mutation DeleteInvoice($deleteInvoiceId: Int!) {
        deleteInvoice(id: $deleteInvoiceId)
    }
`

export function useDeleteInvoice() {
    return useMutation(DeleteInvoice)
}
