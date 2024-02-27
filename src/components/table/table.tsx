'use client';

import React, { useEffect, useState } from 'react';
import Invoice from '@/classes/invoice';
import { SaveService } from '@/services/save';
import TableLine from './line';
import './table.css';

export default function MainTable() {
    const [invoices, setInvoices] = useState<Invoice | Invoice[] | undefined>(
        undefined,
    );

    useEffect(() => {
        const saveService = new SaveService();
        const invoice = saveService.invoice;

        if (invoice !== undefined) {
            setInvoices(Array.isArray(invoice) ? invoice : [invoice]);
        }
    }, []);

    return (
        <table className="main-table maxWidth">
            <thead className="table-header">
                <tr className="table-header-line">
                    <th className="table-input">
                        <input type="checkbox" id="table-checkbox-all" />
                        <label htmlFor="table-checkbox-all"></label>
                    </th>
                    <th>N°</th>
                    <th>EMITENTE</th>
                    <th>CNPJ</th>
                    <th>EMISSÃO</th>
                    <th>VALOR</th>
                    <th>STATUS</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className="table-body">
                <TableLine invoices={invoices} />
            </tbody>
        </table>
    );
}
