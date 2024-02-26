import Invoice from './invoice';
import InvoiceBuilder from './invoice-builder';

export default class InvoiceDirector {
    private readonly _Invoices: Invoice[] = [];

    constructInvoice(
        document: Document | Document[],
    ): Invoice | Invoice[] | undefined {
        if (document instanceof Document) {
            const invoiceBuilder = new InvoiceBuilder(document);
            const invoice = invoiceBuilder
                .makeInfo()
                .makeSender()
                .makeRecipient()
                .makeInvoice()
                .makeProduct();

            return invoice;
        } else {
            document.forEach((document) => {
                const invoiceBuilder = new InvoiceBuilder(document);
                invoiceBuilder.makeInfo().makeSender().makeRecipient();
                const invoice = invoiceBuilder
                    .makeInfo()
                    .makeSender()
                    .makeRecipient()
                    .makeInvoice()
                    .makeProduct();

                if (invoice !== undefined) {
                    this._Invoices.push(invoice);
                }
            });

            return this._Invoices;
        }
    }
}
