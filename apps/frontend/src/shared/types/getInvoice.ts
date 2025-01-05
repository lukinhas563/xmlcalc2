export type Page = {
    invoices: Invoice[]
    currentPage: string
    maxPages: string
    pageSize: string
}

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
