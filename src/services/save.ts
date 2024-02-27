import Address from '@/classes/address';
import Invoice from '@/classes/invoice';
import { FisicalPerson, LegalPerson } from '@/classes/persons';
import Product from '@/classes/product';

export class SaveService {
    get invoice(): Invoice | Invoice[] | undefined {
        const getInvoice = localStorage.getItem('invoice');

        if (getInvoice !== null) {
            const objectData = JSON.parse(getInvoice);

            if (Array.isArray(objectData)) {
                let invoices: Invoice[] = [];

                objectData.forEach((object) => {
                    const invoicedata = this.tranformInvoice(object);

                    invoices.push(invoicedata);
                });

                return invoices;
            } else {
                const invoice = this.tranformInvoice(objectData);

                return invoice;
            }
        }
    }

    saveOnLocalStorage(invoice: Invoice | Invoice[]) {
        localStorage.setItem('invoice', JSON.stringify(invoice));
    }

    private tranformInvoice(object: any): Invoice {
        let senderPerson;

        if (object._sender._cnpj) {
            senderPerson = new LegalPerson(
                object._sender._name,
                this.makeAddress(object._sender._address),
                object._sender._fantasyName,
                object._sender._cnpj,
            );
        } else {
            senderPerson = new FisicalPerson(
                object._sender._name,
                this.makeAddress(object._sender._address),
                object._sender._lastName,
                object._sender._cpf,
            );
        }

        return new Invoice(
            object._number,
            object._serial,
            object._key,
            object._operation,
            object._emission,
            object._status,
            this.makePerson(object._sender),
            this.makePerson(object._recipient),
            object._products.map(
                (productData: any) =>
                    new Product(
                        productData._name,
                        productData._ncm,
                        productData._cfop,
                        productData._un,
                        productData._amount,
                        productData._unitPrice,
                        productData._totalPrice,
                        productData._aliquotIcms,
                        productData._aliquotIpi,
                    ),
            ),
        );
    }

    private makeAddress(data: any) {
        const address = new Address(
            data._street,
            data._neighborhood,
            data._city,
            data._state,
            data._zipCode,
            data._country,
        );

        return address;
    }

    private makePerson(data: any) {
        if (data._cnpj) {
            const legalPerson = new LegalPerson(
                data._name,
                this.makeAddress(data._address),
                data._fantasyName,
                data._cnpj,
            );

            return legalPerson;
        } else {
            const fisicalPerson = new FisicalPerson(
                data._name,
                this.makeAddress(data._address),
                data._lastName,
                data._cpf,
            );

            return fisicalPerson;
        }
    }
}
