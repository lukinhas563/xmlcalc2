import { Arg, Int, Mutation, Query } from 'type-graphql'
import { Invoice } from '../dtos/models/invoice_model'
import axios from 'axios'

export default class InvoiceResolvers {
  constructor() {}

  @Query(() => [Invoice])
  async invoices() {
    const result = await axios.get('http://localhost:8080/invoice/service')
    return result.data
  }

  @Query(() => Invoice)
  async invoice(@Arg('id', () => Int) id: number) {
    const result = await axios.get(
      'http://localhost:8080/invoice/service/' + id,
    )
    return result.data
  }

  @Mutation(() => String)
  async uploadInvoice() {
    return 'hello'
  }
}
