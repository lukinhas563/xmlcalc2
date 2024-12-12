import axios from "axios";

const invoices = async () => {
  const result = await axios.get('http://localhost:8080/invoice/service')
  return result.data
}

const invoice = async (_, {id}) => {
  const result = await axios.get(`http://localhost:8080/invoice/service/${id}`)
  return result.data
}
export const invoiceResolvers = {
  Query: {invoices, invoice},
}; 