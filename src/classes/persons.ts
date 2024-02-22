import { Person } from '@/interfaces/person-protocol';
import Address from './address';

export class FisicalPerson extends Person {
    constructor(
        _name: string,
        _address: Address,
        private readonly _lastName: string,
        private readonly _cpf: string,
    ) {
        super(_name, _address);
    }

    get lastName(): string {
        return this._lastName;
    }

    get cpf(): string {
        return this._cpf;
    }
}

export class LegalPerson extends Person {
    constructor(
        _name: string,
        _address: Address,
        private readonly _fantasyName: string,
        private readonly _cnpj: string,
    ) {
        super(_name, _address);
    }

    get fantasyName() {
        return this._fantasyName;
    }

    get cnpj(): string {
        return this._cnpj;
    }
}
