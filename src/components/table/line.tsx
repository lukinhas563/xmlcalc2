'use client';

import Invoice from '@/classes/invoice';
import React, { useEffect, useState } from 'react';
import TableLineProducts from './line-products';
import TableTaxList from './table-tax-list';
import TableDetailsList from './table-details-list';
import TableOptions from './table-options/table-option-list';
import { cnpjFormarter, cpfFormat, nameSizeFormat } from '@/services/formarter';
import { Person } from '@/interfaces/person-protocol';
import { FisicalPerson, LegalPerson } from '@/classes/persons';

interface TableLineProps {
    invoices: Invoice | Invoice[] | undefined;
    setInvoices: React.Dispatch<
        React.SetStateAction<Invoice | Invoice[] | undefined>
    >;
    captureRows: (row: HTMLTableCellElement[]) => void;
}

export default function TableLine({
    invoices,
    setInvoices,
    captureRows,
}: TableLineProps) {
    if (invoices !== undefined) {
        if (Array.isArray(invoices)) {
            const totalInvoices = invoices.length;

            return invoices.map((invoice, index) => (
                <TableLineItem
                    key={index}
                    index={index}
                    invoice={invoice}
                    total={totalInvoices}
                    invoices={invoices}
                    setInvoices={setInvoices}
                />
            ));
        }
    }
}

// TABLE ITENS

interface TableLineItemProps {
    invoice: Invoice;
    index: number;
    total: number;
    invoices: Invoice[];

    setInvoices: React.Dispatch<
        React.SetStateAction<Invoice | Invoice[] | undefined>
    >;
}

function TableLineItem({
    invoice,
    index,
    total,
    invoices,
    setInvoices,
}: TableLineItemProps) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false);

    const toggleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const toogleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMenuExpanded((prevExpanded) => !prevExpanded);
    };

    const returnSender = (sender: Person) => {
        if ('cnpj' in sender) {
            const company = sender as LegalPerson;
            return cnpjFormarter(company.cnpj);
        } else {
            const costumer = sender as FisicalPerson;
            return cpfFormat(costumer.cpf);
        }
    };

    const hasBorderBottom = index !== total - 1;

    return (
        <React.Fragment key={index}>
            <tr
                className={`table-line ${hasBorderBottom ? 'border-b border-d1d3d7' : ''} `}
                onClick={() => toggleExpansion()}
            >
                <td className="table-input table-line-input">
                    <input
                        type="checkbox"
                        id={`table-checkbox-${index}`}
                        className="table-check"
                    />
                    <label htmlFor={`table-checkbox-${index}`}></label>
                </td>
                <td>{invoice.number}</td>
                <td>{nameSizeFormat(invoice.sender.name.toUpperCase(), 30)}</td>
                <td>{returnSender(invoice.sender)}</td>
                <td>{invoice.emission}</td>
                <td>R$ {invoice.totalPrice.toFixed(2)}</td>
                <td>{invoice.status}</td>
                <td className="table-options" onClick={(e) => toogleMenu(e)}>
                    ⋮
                    <TableOptions
                        toggle={menuExpanded}
                        index={index}
                        invoices={invoices}
                        setInvoices={setInvoices}
                    />
                </td>
            </tr>
            <tr className="table-expansiveline ">
                <td colSpan={8}>
                    <div
                        className={`expansiveline ${expanded ? 'expansive' : ''}`}
                    >
                        <div className="expansiveline-container-content">
                            <TableDetailsList invoice={invoice} />
                            <TableTaxList invoice={invoice} />
                        </div>

                        <TableLineProducts products={invoice.products} />
                    </div>
                </td>
            </tr>
        </React.Fragment>
    );
}
