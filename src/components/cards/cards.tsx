'use client';

import Invoice from '@/classes/invoice';
import { SaveService } from '@/services/save';
import { useEffect, useState } from 'react';
import './cards.css';

export default function TaxCards() {
    const [invoice, setInvoice] = useState<Invoice | Invoice[]>([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalIcms, setTotalIcms] = useState(0);
    const [totalPis, setTotalPis] = useState(0);
    const [totalCofins, setTotalCofins] = useState(0);

    const [totalTax, setTotalTax] = useState(0);

    useEffect(() => {
        const saveService = new SaveService();
        const invoice = saveService.invoice;

        if (invoice !== undefined) {
            if (Array.isArray(invoice)) {
                const totalValue = invoice.reduce(
                    (totalPrice, next) => totalPrice + next.totalPrice,
                    0,
                );

                const totalIcms = invoice.reduce(
                    (icms, next) => icms + next.icms,
                    0,
                );

                const totalPis = invoice.reduce(
                    (pis, next) => pis + next.pis,
                    0,
                );

                const totalCofins = invoice.reduce(
                    (cofins, next) => cofins + next.cofins,
                    0,
                );

                setTotalIcms(totalIcms);
                setTotalPrice(totalValue);
                setInvoice(invoice);
                setTotalPis(totalPis);
                setTotalCofins(totalCofins);

                setTotalTax(totalIcms + totalPis + totalCofins);
            } else {
                const totalIcms = invoice.icms;
                const totalPis = invoice.pis;
                const totalCofins = invoice.cofins;

                setTotalIcms(totalIcms);
                setTotalPrice(invoice.totalPrice);
                setInvoice(invoice);
                setTotalPis(totalPis);
                setTotalCofins(totalCofins);

                setTotalTax(totalIcms + totalPis + totalCofins);
            }
        }
    }, []);

    function returnInt(value: number): number {
        const firstValue = Math.floor(value);
        return firstValue;
    }

    function returnDec(value: number): string {
        const firstValue = Math.floor(value);
        const secondValue = value - firstValue;

        const secondValueString = parseFloat(secondValue.toFixed(2))
            .toString()
            .replace(/^0+\./, '');

        return secondValueString;
    }

    return (
        <>
            <div className="card">
                <div className="card-container-header">
                    <p>Total</p>
                    <p className="card-container-config">⋮</p>
                </div>
                <div className="card-container-content">
                    <p className="card-content-price">R$</p>
                    <p className="card-content-mainprice">
                        {returnInt(totalPrice)}
                    </p>
                    <p className="card-content-cents">
                        {returnDec(totalPrice)}
                    </p>
                </div>
            </div>
            <div className="card">
                <div className="card-container-header">
                    <p>ICMS</p>
                    <p className="card-container-config">⋮</p>
                </div>
                <div className="card-container-content">
                    <p className="card-content-price">R$</p>
                    <p className="card-content-mainprice">
                        {returnInt(totalIcms)}
                    </p>
                    <p className="card-content-cents">{returnDec(totalIcms)}</p>
                </div>
            </div>
            <div className="card">
                <div className="card-container-header">
                    <p>PIS</p>
                    <p className="card-container-config">⋮</p>
                </div>
                <div className="card-container-content">
                    <p className="card-content-price">R$</p>
                    <p className="card-content-mainprice">
                        {returnInt(totalPis)}
                    </p>
                    <p className="card-content-cents">{returnDec(totalPis)}</p>
                </div>
            </div>
            <div className="card">
                <div className="card-container-header">
                    <p>COFINS</p>
                    <p className="card-container-config">⋮</p>
                </div>
                <div className="card-container-content">
                    <p className="card-content-price">R$</p>
                    <p className="card-content-mainprice">
                        {returnInt(totalCofins)}
                    </p>
                    <p className="card-content-cents">
                        {returnDec(totalCofins)}
                    </p>
                </div>
            </div>
            <div className="card">
                <div className="card-container-header">
                    <p>Impostos</p>
                    <p className="card-container-config">⋮</p>
                </div>
                <div className="card-container-content">
                    <p className="card-content-price">R$</p>
                    <p className="card-content-mainprice">
                        {returnInt(totalTax)}
                    </p>
                    <p className="card-content-cents">{returnDec(totalTax)}</p>
                </div>
            </div>
        </>
    );
}
