'use client';
import { ChangeEvent, useState } from 'react';
import DocumentBuilder from '@/classes/document-builder';
import InvoiceDirector from '@/classes/invoice-director';
import { SaveService } from '@/services/save';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { BsX } from 'react-icons/bs';
import { AiOutlineFile } from 'react-icons/ai';
import { sizeFormat } from '@/services/formarter';
import './window-input.css';

export default function WindowInput() {
    const [files, setFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState<number[]>([]);

    function handleClosed(e: MouseEvent) {
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

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const filesData = e.target.files;

            for (const file of filesData) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onprogress = (e) => {
                    const progress = (e.loaded / e.total) * 100;

                    setProgress((prevProgress) => {
                        const newProgress = [...prevProgress];
                        newProgress.push(progress);

                        return newProgress;
                    });
                };
            }

            setFiles((prevFiles) => [...prevFiles, ...filesData]);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        const inputElement = e.currentTarget.querySelector(
            'input[type="file"]',
        ) as HTMLInputElement;

        if (files && files.length > 0) {
            const documentBuilder = new DocumentBuilder();

            const document = (await documentBuilder.readFile(files))
                .parseFile()
                .build();

            const director = new InvoiceDirector();
            const invoices = director.constructInvoice(document);

            if (invoices !== undefined) {
                const saveService = new SaveService();
                saveService.saveOnLocalStorage(invoices);
            }

            console.log(files);
        } else {
            e.preventDefault();
        }
    }

    function handleCancel(e: MouseEvent) {
        e.preventDefault();

        setFiles([]);
        setProgress([]);
        handleClosed(e);
    }

    function handleDelete(e: MouseEvent, i: number) {
        e.preventDefault();

        const newFiles = [...files];
        const newProgress = [...progress];
        newFiles.splice(i, 1);
        newProgress.splice(i, 1);

        setFiles(newFiles);
        setProgress(newProgress);
    }

    return (
        <div className="form-background ">
            <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                <div className="container-button">
                    <BsX
                        onClick={(e) => handleClosed(e)}
                        style={{
                            color: '#d1d3d7',
                            cursor: 'pointer',
                            width: '50px',
                            height: '50px',
                        }}
                    />
                </div>
                <div className="input-container">
                    <div>
                        <div className="messages">
                            <ul>
                                <li>
                                    <BsExclamationCircleFill
                                        style={{ color: '#00aaff' }}
                                    />
                                    <p>
                                        Somente arquivos <b>.xml</b>
                                    </p>
                                </li>
                                <li>
                                    <BsExclamationCircleFill
                                        style={{ color: '#ff4444' }}
                                    />
                                    <p>
                                        Arquivos de usuários não cadastrados não
                                        ficarão salvas
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <label className="main-label">
                            <h3>Upload your files</h3>
                            <input
                                type="file"
                                accept=".xml"
                                multiple
                                onChange={(e) => handleFile(e)}
                            />
                        </label>
                    </div>

                    <ul className="main-files">
                        {files.length > 0 ? (
                            files.map((file, index) => {
                                return (
                                    <li key={index} className="upload-list">
                                        <AiOutlineFile
                                            style={{
                                                height: '40px',
                                                width: '40px',
                                                color: '#bfbfbf',
                                            }}
                                        />
                                        <div className="upload-infos">
                                            <div className="upload-names">
                                                <p>{file.name.toUpperCase()}</p>
                                                <p className="upload-names-options">
                                                    <span>
                                                        {sizeFormat(file.size)}
                                                    </span>
                                                    <BsX
                                                        onClick={(e) =>
                                                            handleDelete(
                                                                e,
                                                                index,
                                                            )
                                                        }
                                                        style={{
                                                            display: 'flex',
                                                            height: '30px',
                                                            width: '30px',
                                                            cursor: 'pointer',
                                                            color: '#ff4444',
                                                        }}
                                                    />
                                                </p>
                                            </div>
                                            <div className="upload-progress-detail">
                                                <span>Progresso...</span>
                                                <span>{progress[index]}%</span>
                                            </div>
                                            <label className="upload-progress-container">
                                                <progress
                                                    value={progress[index]}
                                                    max="100"
                                                ></progress>
                                            </label>
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <li></li>
                        )}
                    </ul>
                </div>
                <div className="buttons-container">
                    <button
                        className="button-cancel"
                        onClick={(e) => handleCancel(e)}
                    >
                        Cancelar
                    </button>
                    <button type="submit" className="button-calculate">
                        Calcular
                    </button>
                </div>
            </form>
        </div>
    );
}
