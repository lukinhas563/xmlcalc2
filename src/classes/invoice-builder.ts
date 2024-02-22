import { Person } from '@/interfaces/person-protocol';
import Address from './address';
import Invoice from './invoice';
import Product from './product';
import { FisicalPerson, LegalPerson } from './persons';

export default class InvoiceBuilder {
    private readonly _invoices: Invoice[] = [];

    private _operation: string = 'N/A';
    private _number: number = 0;
    private _serial: number = 0;
    private _key: string = 'N/A';
    private _emission: string = 'N/A';
    private _sender: Person | null = null;
    private _recipient: Person | null = null;
    private _product: Product | null = null;

    private readonly _paths: string[] = [
        'ide',
        'infNFe',
        'infProt',
        'ICMSTot',
        'emit',
        'dest',
        'prod',
        'imposto',
    ];

    constructor(private readonly _document: Document) {}

    makeInfo(): this {
        const path = this._document.getElementsByTagName(this._paths[0]);
        const keyPath = this._document.getElementsByTagName(this._paths[1]);

        // STRINGS
        this._operation =
            path[0].getElementsByTagName('natOp')[0]?.textContent || 'N/A';

        this._emission =
            path[0].getElementsByTagName('dhEmi')[0]?.textContent || 'N/A';

        // NUMBERS
        const number =
            path[0].getElementsByTagName('nNF')[0]?.textContent || 'N/A';
        this._number = Number(number);

        const serial =
            path[0].getElementsByTagName('serie')[0]?.textContent || 'N/A';
        this._serial = Number(serial);

        const rawKey = keyPath[0].getAttribute('Id');
        if (rawKey) {
            this._key = rawKey.substring(3);
        }

        return this;
    }

    private makeAddress(addressPath: Element): Address {
        const street =
            addressPath.getElementsByTagName('xLgr')[0]?.textContent || 'N/A';
        const neighborhood =
            addressPath.getElementsByTagName('xBairro')[0]?.textContent ||
            'N/A';
        const city =
            addressPath.getElementsByTagName('xMun')[0]?.textContent || 'N/A';
        const state =
            addressPath.getElementsByTagName('UF')[0]?.textContent || 'N/A';
        const zipcode =
            addressPath.getElementsByTagName('CEP')[0]?.textContent || 'N/A';
        const country =
            addressPath.getElementsByTagName('xPais')[0]?.textContent || 'N/A';

        const address = new Address(
            street,
            neighborhood,
            city,
            state,
            zipcode,
            country,
        );

        return address;
    }

    makeSender(): this {
        const pathEmit = this._document.getElementsByTagName(this._paths[4]);

        if (pathEmit[0].getElementsByTagName('CNPJ')) {
            const cnpj =
                pathEmit[0].getElementsByTagName('CNPJ')[0]?.textContent ||
                'N/A';
            const name =
                pathEmit[0].getElementsByTagName('xNome')[0]?.textContent ||
                'N/A';
            const fantasyName =
                pathEmit[0].getElementsByTagName('xFant')[0]?.textContent ||
                'N/A';

            // MAKE ADDRESS
            const addressPath =
                pathEmit[0].getElementsByTagName('enderEmit')[0];
            const address = this.makeAddress(addressPath);

            //RETURN PERSON
            this._sender = new LegalPerson(name, address, fantasyName, cnpj);
        } else {
            const cpf =
                pathEmit[0].getElementsByTagName('CNPJ')[0]?.textContent ||
                'N/A';
            const fullName =
                pathEmit[0].getElementsByTagName('xNome')[0]?.textContent ||
                'N/A';

            //  SPLIT NAME/LASTNAME
            const [firstName, ...lastNameArray] = fullName.split(' ');
            const lastName = lastNameArray.join(' ');

            // MAKE ADDRESS
            const addressPath =
                pathEmit[0].getElementsByTagName('enderEmit')[0];
            const address = this.makeAddress(addressPath);

            // RETURN PERSON
            this._sender = new FisicalPerson(firstName, address, lastName, cpf);
        }

        return this;
    }

    makeRecipient(): this {
        const pathEmit = this._document.getElementsByTagName(this._paths[5]);

        if (pathEmit[0].getElementsByTagName('CNPJ')) {
            const cnpj =
                pathEmit[0].getElementsByTagName('CNPJ')[0]?.textContent ||
                'N/A';
            const name =
                pathEmit[0].getElementsByTagName('xNome')[0]?.textContent ||
                'N/A';
            const fantasyName =
                pathEmit[0].getElementsByTagName('xFant')[0]?.textContent ||
                'N/A';

            // MAKE ADDRESS
            const addressPath =
                pathEmit[0].getElementsByTagName('enderDest')[0];
            const address = this.makeAddress(addressPath);

            //RETURN PERSON
            this._recipient = new LegalPerson(name, address, fantasyName, cnpj);
        } else {
            const cpf =
                pathEmit[0].getElementsByTagName('CNPJ')[0]?.textContent ||
                'N/A';
            const fullName =
                pathEmit[0].getElementsByTagName('xNome')[0]?.textContent ||
                'N/A';

            //  SPLIT NAME/LASTNAME
            const [firstName, ...lastNameArray] = fullName.split(' ');
            const lastName = lastNameArray.join(' ');

            // MAKE ADDRESS
            const addressPath =
                pathEmit[0].getElementsByTagName('enderDest')[0];
            const address = this.makeAddress(addressPath);

            // RETURN PERSON
            this._recipient = new FisicalPerson(
                firstName,
                address,
                lastName,
                cpf,
            );
        }

        return this;
    }

    makeProduct(): this {
        return this;
    }

    build(): void {
        if (this._sender !== null && this._recipient !== null) {
            const invoice = new Invoice(
                this._number,
                this._serial,
                this._key,
                this._operation,
                this._emission,
                this._sender,
                this._recipient,
            );

            console.log(invoice);
        }
    }
}
