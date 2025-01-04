import { useMutation } from 'urql'

const UploadInvoice = `#graphql
    mutation UploadInvoice($file: Upload!) {
        uploadInvoice(file: $file)
    }
`

export function useUploadInvoice() {
    return useMutation(UploadInvoice)
}
