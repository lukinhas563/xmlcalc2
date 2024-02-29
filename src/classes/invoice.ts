import { Person } from '@/interfaces/person-protocol';
import Product from './product';

export default class Invoice {
    constructor(
        private readonly _number: number,
        private readonly _serial: number,
        private readonly _key: string,
        private readonly _operation: string,
        private readonly _emission: string,
        private readonly _status: string,
        private readonly _sender: Person,
        private readonly _recipient: Person,
        private readonly _products: Product[] = [],
        private readonly _id: number = Math.floor(Math.random() * 999),
        private readonly _createdAt: Date = new Date(),
    ) {}

    get id(): number {
        return this._id;
    }

    get number(): number {
        return this._number;
    }

    get serial(): number {
        return this._serial;
    }

    get key(): string {
        return this._key;
    }

    get operation(): string {
        return this._operation;
    }

    get emission(): string {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'America/Sao_Paulo',
        };

        return new Date(this._emission).toLocaleDateString('pt-BR', options);
    }

    get status(): string {
        return this._status;
    }

    get sender(): Person {
        return this._sender;
    }

    get recipient(): Person {
        return this._recipient;
    }

    get products(): Product[] {
        return this._products;
    }

    get totalPrice(): number {
        if (this.products) {
            return this._products.reduce(
                (total, next) => total + next.totalPrice,
                0,
            );
        }

        return 0;
    }

    get icms(): number {
        return this._products.reduce((icms, next) => icms + next.icms, 0);
    }

    get pis(): number {
        return this._products.reduce((pis, next) => pis + next.pis, 0);
    }

    get cofins(): number {
        if (
            this._products.length > 0 &&
            this._products[0].taxRegime === 'presumido'
        ) {
            return this.totalPrice * (3 / 100);
        }

        return 0.0;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get createdAtBR(): string {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Sao_Paulo',
        };

        return new Date(this._createdAt).toLocaleDateString('pt-BR', options);
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }
}
