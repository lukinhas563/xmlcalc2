'use client';
import { ChangeEvent } from 'react';
import './window-input.css';
import DocumentBuilder from '@/classes/document-builder';
import InvoiceBuilder from '@/classes/invoice-builder';

export default function WindowInput() {
    function handleClosed(e) {
        e.preventDefault();

        const windowInput = document.querySelector(
            '.form-background',
        ) as HTMLDivElement;

        if (windowInput.classList[1] === 'open-closed') {
            windowInput.classList.remove('open-closed');
        } else {
            windowInput.classList.add('open-closed');
        }
    }

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            const documentBuilder = new DocumentBuilder();
            const document = (await documentBuilder.readFile(file))
                .parseFile()
                .build();

            const invoiceBuilder = new InvoiceBuilder(document);
            invoiceBuilder.makeInfo().makeSender().makeRecipient();
            invoiceBuilder.build();
        }
    }

    return (
        <div className="form-background ">
            <form className="form-container">
                <button onClick={(e) => handleClosed(e)}>CLOSED</button>
                <input type="file" onChange={(e) => handleFile(e)} />
            </form>
        </div>
    );
}
