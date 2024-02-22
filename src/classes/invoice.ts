import { Person } from '@/interfaces/person-protocol';

export default class Invoice {
    constructor(
        private readonly _number: number,
        private readonly _serial: number,
        private readonly _key: number,
        private readonly _operation: string,
        private readonly _emission: string,
        private readonly _sender: Person,
        private readonly _recipient: Person,
        private readonly _products: string[] = [],
    ) {}

    get number(): number {
        return this._number;
    }

    get serial(): number {
        return this._serial;
    }

    get key(): number {
        return this._key;
    }

    get operation(): string {
        return this._operation;
    }

    get emission(): string {
        return this._emission;
    }

    get sender(): Person {
        return this._sender;
    }

    get recipient(): Person {
        return this._recipient;
    }

    get products(): string[] {
        return this._products;
    }
}
