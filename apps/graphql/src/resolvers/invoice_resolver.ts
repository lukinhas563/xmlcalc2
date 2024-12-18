import { Arg, Int, Mutation, Query } from 'type-graphql'
import { Invoice } from '../dtos/models/invoice_model'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'
import FormData from 'form-data'
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

  @Mutation(() => Boolean)
  async uploadInvoice(@Arg('file', () => GraphQLUpload) file: FileUpload) {
    const { createReadStream, filename, mimetype } = file

    const formData = new FormData()
    formData.append('invoice', createReadStream(), {
      filename,
      contentType: mimetype,
    })

    try {
      const result = await axios.post(
        'http://localhost:8080/invoice/service',
        formData,
        {
          headers: {
            'x-apollo-operation-name': 'uploadInvoice',
          },
        },
      )
      return true
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error)
      return false
    }
  }
}
