import Invoice from '@/classes/invoice';

export class SaveService {
    get invoice(): Invoice | Invoice[] | undefined {
        const getInvoice = localStorage.getItem('invoice');

        if (getInvoice !== null) {
            const objectInvoice = JSON.parse(getInvoice);

            return objectInvoice;
        }
    }

    saveOnLocalStorage(invoice: Invoice | Invoice[]) {
        localStorage.setItem('invoice', JSON.stringify(invoice));
    }
}
