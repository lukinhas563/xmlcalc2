'use client';
import { ChangeEvent } from 'react';
import DocumentBuilder from '@/classes/document-builder';
import InvoiceDirector from '@/classes/invoice-director';
import './window-input.css';

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
            const files = e.target.files;

            const documentBuilder = new DocumentBuilder();

            const document = (await documentBuilder.readFile(files))
                .parseFile()
                .build();

            const director = new InvoiceDirector();
            const invoices = director.construct(document);

            console.log(invoices);
        }
    }

    return (
        <div className="form-background ">
            <form className="form-container">
                <button onClick={(e) => handleClosed(e)}>CLOSED</button>
                <input type="file" multiple onChange={(e) => handleFile(e)} />
            </form>
        </div>
    );
}
