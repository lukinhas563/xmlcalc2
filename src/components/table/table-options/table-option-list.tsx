import Invoice from '@/classes/invoice';
import { SaveService } from '@/services/save';
import React from 'react';

interface OptionsProps {
    toggle: boolean;
    index: number;
    invoices: Invoice[];
    setInvoices: React.Dispatch<
        React.SetStateAction<Invoice | Invoice[] | undefined>
    >;
}

export default function TableOptions({
    toggle,
    index,
    invoices,
    setInvoices,
}: OptionsProps) {
    const handleDelete = (e: React.MouseEvent) => {
        const newInvoice = [...invoices];
        newInvoice.splice(index, 1);

        setInvoices(newInvoice);

        const saveService = new SaveService();
        saveService.saveOnLocalStorage(newInvoice);
    };

    const handleDownload = () => {
        // Download invoice file
    };

    return (
        <div className={`table-menu ${toggle ? 'expansive-menu' : ''} `}>
            <ul className="table-menu-options">
                <li>
                    <span className="menu-download"></span>
                    Download
                </li>
                <li
                    className="menu-delete-content"
                    onClick={(e) => handleDelete(e)}
                >
                    <span className="menu-delete"></span>
                    Delete
                </li>
            </ul>
        </div>
    );
}
