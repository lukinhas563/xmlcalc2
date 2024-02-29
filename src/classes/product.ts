export default class Product {
    constructor(
        private readonly _name: string,
        private readonly _ncm: string,
        private readonly _cfop: string,
        private readonly _un: string,
        private readonly _amount: number,
        private readonly _unitPrice: number,
        private readonly _totalPrice: number,
        private readonly _aliquotIcms: number,
        private readonly _aliquotPis: number,

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

    get aliquotIcms(): number {
        return this._aliquotIcms;
    }

    get aliquotPis(): number {
        return this._aliquotPis;
    }

    get taxCode(): number | undefined {
        if (this._csosn) {
            return this._csosn;
        } else {
            return this._cst;
        }
    }

    get icms(): number {
        return this._aliquotIcms
            ? this._totalPrice * (this._aliquotIcms / 100)
            : 0.0;
    }

    get pis(): number {
        return this._aliquotPis
            ? this._totalPrice * (this._aliquotPis / 100)
            : 0.0;
    }

    get taxRegime(): string {
        if (this._csosn) {
            return 'simples';
        } else {
            return 'presumido';
        }
    }
}
