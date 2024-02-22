import Address from '@/classes/address';

export abstract class Person {
    constructor(
        private readonly _name: string,
        private readonly _address: Address,
    ) {}

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }
}
