const invoices = async (_, __, { getInvoice }) => {
  const result = await getInvoice('/invoice/service')
  return result.data
}

const invoice = async (_, { id }, { getInvoice }) => {
  const result = await getInvoice(`/invoice/service/${id}`)
  return result.data
}
export const invoiceResolvers = {
  Query: { invoices, invoice },
}
