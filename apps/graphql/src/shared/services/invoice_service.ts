import axios, { RawAxiosResponseHeaders } from 'axios'
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

  async getInvoices(
    pageSize: number,
    page: number,
  ): Promise<{
    invoices: Invoice[]
    currentPage: string
    maxPages: string
    pageSizeHeader: string
  }> {
    const result = await axios.get<Invoice[]>(
      `http://${this.url}:${this.port}/invoice/service?pageSize=${pageSize}&page=${page}`,
    )

    const headers = result.headers

    const currentPage = headers['x-current-page']
    const maxPages = headers['x-max-pages']
    const pageSizeHeader = headers['x-page-size']

    return {
      invoices: result.data,
      currentPage,
      maxPages,
      pageSizeHeader,
    }
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
