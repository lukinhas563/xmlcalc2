import axios from 'axios'
import FormData from 'form-data'
import { Invoice } from '../../dtos/models/invoice_model'
import { FileUpload } from 'graphql-upload-ts'
import { Service } from 'typedi'

@Service()
export default class InvoiceService {
  private readonly url: string
  private readonly port: number

  constructor() {
    this.url = process.env.GRAPHQL_INVOICE_URL || 'localhost'
    this.port = Number(process.env.GRAPHQL_INVOICE_PORT) || 8080
  }

  async getInvoices(pageSize: number, page: number): Promise<Invoice[]> {
    const result = await axios.get(
      `http://${this.url}:${this.port}/invoice/service?pageSize=${pageSize}&page=${page}`,
    )

    return result.data
  }

  async getInvoiceById(id: number): Promise<Invoice> {
    const result = await axios.get(
      `http://${this.url}:${this.port}/invoice/service/` + id,
    )

    return result.data
  }

  async uploadInvoice(file: FileUpload): Promise<boolean> {
    const { createReadStream, filename, mimetype } = file

    const formData = new FormData()
    formData.append('invoice', createReadStream(), {
      filename,
      contentType: mimetype,
    })

    try {
      const result = await axios.post(
        `http://${this.url}:${this.port}/invoice/service`,
        formData,
        {
          headers: {
            'x-apollo-operation-name': 'uploadInvoice',
          },
        },
      )

      if (result.status !== 200) {
        return false
      }

      return true
    } catch (error) {
      console.error('Error to upload the file:', error)
      return false
    }
  }

  async deleteInvoice(id: number) {
    try {
      const result = await axios.delete(
        `http://${this.url}:${this.port}/invoice/service/` + id,
      )

      if (result.status !== 200) {
        return false
      }

      return true
    } catch (error) {
      console.error('Error to delete invoice:', error)
      return false
    }
  }
}
