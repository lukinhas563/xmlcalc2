import Invoice from './invoice';
import InvoiceBuilder from './invoice-builder';

export default class InvoiceDirector {
    private readonly _Invoices: Invoice[] = [];

    construct(
        document: Document | Document[],
    ): Invoice | Invoice[] | undefined {
        if (document instanceof Document) {
            console.log('Documento Unico');

            const invoiceBuilder = new InvoiceBuilder(document);
            const invoice = invoiceBuilder
                .makeInfo()
                .makeSender()
                .makeRecipient()
                .makeInvoice()
                .makeProduct();

            return invoice;
        } else {
            console.log('ARRAY');

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
