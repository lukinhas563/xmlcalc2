import { Invoice, Page } from '../dtos/models/invoice_model'
import {
  Arg,
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts'
import { pubsub } from '../pubsub'
import { Inject, Service } from 'typedi'
import InvoiceService from '../shared/services/invoice_service'

@Resolver()
@Service()
export default class InvoiceResolvers {
  @Inject(() => InvoiceService)
  private readonly invoiceService: InvoiceService

  @Query(() => Page)
  async invoices(
    @Arg('pageSize', () => Int) pageSize: number,
    @Arg('page', () => Int) page: number,
  ) {
    const response = await this.invoiceService.getInvoices(pageSize, page)

    const { invoices, currentPage, maxPages, pageSizeHeader } = response

    return { invoices, currentPage, maxPages, pageSize: pageSizeHeader }
  }

  @Query(() => Invoice)
  async invoice(@Arg('id', () => Int) id: number) {
    const invoice = await this.invoiceService.getInvoiceById(id)
    return invoice
  }

  @Mutation(() => Boolean)
  async uploadInvoice(@Arg('file', () => GraphQLUpload) file: FileUpload) {
    const success = await this.invoiceService.uploadInvoice(file)

    if (success) {
      pubsub.publish('NOTIFICATIONS', 'Invoice has been created!')
    }

    return success
  }

  @Mutation(() => Boolean)
  async deleteInvoice(@Arg('id', () => Int) id: number) {
    const success = await this.invoiceService.deleteInvoice(id)

    return success
  }

  @Subscription(() => String, { topics: 'NOTIFICATIONS' })
  async invoiceNotification(@Arg('payload', () => String) payload: string) {
    return payload
  }
}
