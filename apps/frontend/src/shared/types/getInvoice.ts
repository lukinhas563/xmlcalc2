export type Invoice = {
    id: number
    info: InvoiceInfo
    issuer: InvoicePerson
    recipient: InvoicePerson
    total: number
}

type InvoiceInfo = {
    key: string
    number: number
    series: string
}

type InvoicePerson = {
    name: string
    identity: string
}
