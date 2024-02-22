export default class Address {
    constructor(
        private readonly _street: string,
        private readonly _neighborhood: string,
        private readonly _city: string,
        private readonly _state: string,
        private readonly _zipCode: string,
        private readonly _country: string,
    ) {}

    get street(): string {
        return this._street;
    }

    get neighborhood(): string {
        return this._neighborhood;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    get country(): string {
        return this._country;
    }
}
