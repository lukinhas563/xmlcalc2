export default class Product {
    constructor(
        private readonly _name: string,
        private readonly _ncm: string,
        private readonly _cfop: string,
        private readonly _un: string,
        private readonly _amount: number,
        private readonly _unitPrice: number,
        private readonly _totalPrice: number,
        private readonly _aliquotIcms: string,
        private readonly _aliquotIpi: string,

        private readonly _csosn?: number,
        private readonly _cst?: number,
    ) {}

    get name(): string {
        return this._name;
    }

    get ncm(): string {
        return this._ncm;
    }

    get cfop(): string {
        return this._cfop;
    }

    get unit(): string {
        return this._un;
    }

    get amount(): number {
        return this._amount;
    }

    get unitPrice(): number {
        return this._unitPrice;
    }

    get totalPrice(): number {
        return this._totalPrice;
    }

    get aliquotIcms(): string {
        return this._aliquotIcms;
    }

    get aliquotIpi(): string {
        return this._aliquotIpi;
    }

    get taxCode(): number | undefined {
        if (this._csosn) {
            return this._csosn;
        } else {
            return this._cst;
        }
    }
}
