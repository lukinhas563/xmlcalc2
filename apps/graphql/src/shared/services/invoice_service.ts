import axios from 'axios'
import FormData from 'form-data'
import { Invoice } from '../../dtos/models/invoice_model'
import { FileUpload } from 'graphql-upload-ts'
import { Service } from 'typedi'

@Service()
export default class InvoiceService {
  constructor() {}

  async getInvoices(): Promise<Invoice[]> {
    const result = await axios.get('http://localhost:8080/invoice/service')

    return result.data
  }

  async getInvoiceById(id: number): Promise<Invoice> {
    const result = await axios.get(
      'http://localhost:8080/invoice/service/' + id,
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
        'http://localhost:8080/invoice/service',
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
        'http://localhost:8080/invoice/service/' + id,
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
