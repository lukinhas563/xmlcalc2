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
    ) {}

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
        return this._emission;
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
    }

    addProduct(product: Product): void {
        this.products.push(product);
    }
}
