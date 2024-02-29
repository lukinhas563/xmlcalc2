'use client';

import Invoice from '@/classes/invoice';
import { SaveService } from '@/services/save';
import { useEffect, useState } from 'react';
import './cards.css';

export default function TaxCards() {
    const [invoice, setInvoice] = useState<Invoice | Invoice[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const saveService = new SaveService();
        const invoice = saveService.invoice;

        if (invoice !== undefined) {
            if (Array.isArray(invoice)) {
                const totalValue = invoice.reduce(
                    (totalPrice, next) => totalPrice + next.totalPrice,
                    0,
                );

                setTotalPrice(totalValue);
                setInvoice(invoice);
            } else {
                setTotalPrice(invoice.totalPrice);
                setInvoice(invoice);
            }
            console.log(invoice);
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
                    <p className="card-content-mainprice">50</p>
                    <p className="card-content-cents">90</p>
                </div>
            </div>
            <div className="card">
                <div className="card-container-header">
                    <p>Total</p>
                    <p className="card-container-config">⋮</p>
                </div>
                <div className="card-container-content">
                    <p className="card-content-price">R$</p>
                    <p className="card-content-mainprice">50</p>
                    <p className="card-content-cents">90</p>
                </div>
            </div>
            <div className="card">
                <div className="card-container-header">
                    <p>Total</p>
                    <p className="card-container-config">⋮</p>
                </div>
                <div className="card-container-content">
                    <p className="card-content-price">R$</p>
                    <p className="card-content-mainprice">50</p>
                    <p className="card-content-cents">90</p>
                </div>
            </div>
            <div className="card">
                <div className="card-container-header">
                    <p>Total</p>
                    <p className="card-container-config">⋮</p>
                </div>
                <div className="card-container-content">
                    <p className="card-content-price">R$</p>
                    <p className="card-content-mainprice">50</p>
                    <p className="card-content-cents">90</p>
                </div>
            </div>
        </>
    );
}
