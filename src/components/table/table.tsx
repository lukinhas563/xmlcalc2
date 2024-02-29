'use client';

import React, { useEffect, useState } from 'react';
import Invoice from '@/classes/invoice';
import { SaveService } from '@/services/save';
import TableLine from './line';
import ButtonDownload from '../buttons/button-download';
import './table.css';

export default function MainTable() {
    const [invoices, setInvoices] = useState<Invoice | Invoice[] | undefined>(
        undefined,
    );
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [tableRows, setTableRows] = useState<HTMLTableCellElement[]>([]);

    useEffect(() => {
        const saveService = new SaveService();
        const invoice = saveService.invoice;

        if (invoice !== undefined) {
            setInvoices(Array.isArray(invoice) ? invoice : [invoice]);
        }
    }, []);

    function handleSelectAll() {
        setSelectAll((prevSelectAll) => !prevSelectAll);
    }
    function captureTableRows(rows: HTMLTableCellElement[]) {
        setTableRows(rows);
    }

    return (
        <>
            <div className="config-table maxWidth">
                <div></div>
                <div className="config-buttons">
                    <ButtonDownload />
                </div>
            </div>
            <table className="main-table maxWidth">
                <thead className="table-header">
                    <tr className="table-header-line">
                        <th className="table-input">
                            <input
                                type="checkbox"
                                id="table-checkbox-all"
                                checked={selectAll}
                                className="table-check"
                                onChange={() => handleSelectAll()}
                            />
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
                    <TableLine
                        invoices={invoices}
                        setInvoices={setInvoices}
                        captureRows={captureTableRows}
                    />
                </tbody>
            </table>
        </>
    );
}
