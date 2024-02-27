'use client';

import Invoice from '@/classes/invoice';
import React, { useState } from 'react';
import TableLineProducts from './line-products';
import TableTaxList from './table-tax-list';
import TableDetailsList from './table-details-list';
import TableOptions from './table-options/table-option-list';

interface TableLineProps {
    invoices: Invoice | Invoice[] | undefined;
}

export default function TableLine({ invoices }: TableLineProps) {
    if (invoices !== undefined) {
        if (Array.isArray(invoices)) {
            const totalInvoices = invoices.length;

            return invoices.map((invoice, index) => (
                <TableLineItem
                    key={index}
                    index={index}
                    invoice={invoice}
                    total={totalInvoices}
                />
            ));
        }
    }
}

interface TableLineItemProps {
    invoice: Invoice;
    index: number;
    total: number;
}

function TableLineItem({ invoice, index, total }: TableLineItemProps) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false);

    const toggleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const toogleMenu = (e: MouseEvent) => {
        e.stopPropagation();
        setMenuExpanded((prevExpanded) => !prevExpanded);
    };

    const hasBorderBottom = index !== total - 1;

    return (
        <React.Fragment key={index}>
            <tr
                className={`table-line ${hasBorderBottom ? 'border-b border-d1d3d7' : ''} `}
                onClick={() => toggleExpansion()}
            >
                <td className="table-input table-line-input">
                    <input type="checkbox" id="table-checkbox-1" />
                    <label htmlFor="table-checkbox-1"></label>
                </td>
                <td>{invoice.number}</td>
                <td>{invoice.sender.name.toUpperCase()}</td>
                <td>
                    {invoice.sender.cnpj
                        ? invoice.sender.cnpj
                        : invoice.sender.cpf}
                </td>
                <td>25/12/2025</td>
                <td>{invoice.totalPrice.toFixed(2)}</td>
                <td>{invoice.status}</td>
                <td className="table-options" onClick={(e) => toogleMenu(e)}>
                    ⋮
                    <TableOptions toggle={menuExpanded} index={index} />
                </td>
            </tr>
            <tr className="table-expansiveline ">
                <td colSpan={8}>
                    <div
                        className={`expansiveline ${expanded ? 'expansive' : ''}`}
                    >
                        <div className="expansiveline-container-content">
                            <TableDetailsList invoice={invoice} />
                            <TableTaxList />
                        </div>

                        <TableLineProducts products={invoice.products} />
                    </div>
                </td>
            </tr>
        </React.Fragment>
    );
}
