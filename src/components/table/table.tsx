'use client';

import React, { useEffect, useState } from 'react';
import { SaveService } from '@/services/save';
import './table.css';
import Invoice from '@/classes/invoice';

export default function MainTable() {
    const [expanded, setExpanded] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const [invoices, setInvoices] = useState<Invoice | Invoice[]>();

    useEffect(() => {
        const saveService = new SaveService();
        const getInvoices = saveService.invoice;

        if (getInvoices !== undefined) {
            setInvoices(getInvoices);
        }
    }, []);

    function handleTableClick() {
        if (typeof window !== 'undefined') {
            setExpanded((prevExpanded) => !prevExpanded);
        }
    }

    function handleOptionClick(e: React.MouseEvent) {
        if (typeof window !== 'undefined') {
            e.stopPropagation();
            setMenuVisible((prevExpanded) => !prevExpanded);
        }
    }

    function makeTableLine() {
        return (
            <>
                <tr
                    className="table-line"
                    onClick={(e) => {
                        handleTableClick(e);
                    }}
                >
                    <td className="table-input table-line-input">
                        <input type="checkbox" id="table-checkbox-1" />
                        <label htmlFor="table-checkbox-1"></label>
                    </td>
                    <td>321</td>
                    <td>CARLOS MANUEL COSTA SILVA</td>
                    <td>11.111.111/0001-11</td>
                    <td>32 de Dez. de 2025</td>
                    <td>120,50</td>
                    <td>Autorizado</td>
                    <td
                        className="table-options"
                        onClick={(e) => handleOptionClick(e)}
                    >
                        ⋮{' '}
                        <div
                            className={`table-menu ${menuVisible && 'expansive-menu'}`}
                        >
                            <ul className="table-menu-options">
                                <li>
                                    <span className="menu-download"></span>
                                    Download
                                </li>
                                <li>
                                    <span className="menu-edit"></span>Edit
                                </li>
                                <li className="menu-delete-content">
                                    <span className="menu-delete"></span>Delete
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr className="table-expansiveline ">
                    <td colSpan={8}>
                        <div
                            className={`expansiveline ${expanded && 'expansive'}`}
                        >
                            <div className="expansiveline-container-content">
                                <div className="details-container">
                                    <div className="details-header">
                                        <p className="details-title">
                                            Detalhes #321
                                        </p>
                                        <p className="details-title-data">
                                            32 de Dez. de 2025 3:35PM
                                        </p>
                                    </div>
                                    <div className="details-infos">
                                        <span className="infos-key">
                                            <p className="infos-title">
                                                Chave:
                                            </p>
                                            <p>1521365465213546543213546213</p>
                                        </span>
                                        <span className="details-operation">
                                            <p className="infos-title">
                                                Operação:
                                            </p>
                                            <p>Compra e venda de mercadoria</p>
                                        </span>
                                        <span>
                                            <p className="infos-title">
                                                Serie:
                                            </p>
                                            <p>2</p>
                                        </span>
                                        <span>
                                            <p className="infos-title">
                                                Valor:
                                            </p>
                                            <p>R$ 120,50</p>
                                        </span>
                                        <span>
                                            <p className="infos-title">
                                                Emissão:
                                            </p>
                                            <p>32/12/2025</p>
                                        </span>
                                        <span>
                                            <p className="infos-title">
                                                Status:
                                            </p>
                                            <p>Autorizado</p>
                                        </span>
                                    </div>
                                    <div className="details-send-container">
                                        <div className="sender-container">
                                            <div className="sender-header">
                                                <p className="infos-title2">
                                                    EMITENTE
                                                </p>
                                                <p className="simples">
                                                    Simples
                                                </p>
                                            </div>
                                            <div className="sender-infos">
                                                <span>
                                                    <p className="infos-title">
                                                        Nome
                                                    </p>
                                                    <p>
                                                        CARLOS MANUEL COSTA
                                                        SILVA
                                                    </p>
                                                </span>
                                                <span>
                                                    <p className="infos-title">
                                                        Nome Fantasia
                                                    </p>
                                                    <p>WEB DESIGN PLANNER</p>
                                                </span>
                                                <div className="sender-infos2">
                                                    <span>
                                                        <p className="infos-title">
                                                            CNPJ
                                                        </p>
                                                        <p>
                                                            11.111.111/0001-11
                                                        </p>
                                                    </span>
                                                    <span className="uf">
                                                        <p className="infos-title">
                                                            UF
                                                        </p>
                                                        <p>SP</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="recipient-container">
                                            <p className="recipient-header infos-title2">
                                                DESTINATARIO
                                            </p>
                                            <div className="recipient-infos">
                                                <span>
                                                    <p className="infos-title">
                                                        Nome
                                                    </p>
                                                    <p>CARLOS</p>
                                                </span>
                                                <span>
                                                    <p className="infos-title">
                                                        Sobrenome
                                                    </p>
                                                    <p>MANUEL COSTA SILVA</p>
                                                </span>

                                                <div className="recipient-infos2">
                                                    <span>
                                                        <p className="infos-title">
                                                            CPF
                                                        </p>
                                                        <p>
                                                            11.111.111/0001-11
                                                        </p>
                                                    </span>
                                                    <span className="uf2">
                                                        <p className="infos-title">
                                                            UF
                                                        </p>
                                                        <p>SP</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tax-container">
                                    <div className="tax-header">
                                        <p className="details-title">
                                            Impostos #321
                                        </p>
                                        <p className="infos-title">
                                            32 de Dez. de 2025
                                        </p>
                                    </div>
                                    <table className="tax-list">
                                        <tbody>
                                            <tr>
                                                <td>BC</td>
                                                <td>R$ 120,50</td>
                                            </tr>
                                            <tr>
                                                <td>DESCONTO</td>
                                                <td>R$ 0,00</td>
                                            </tr>
                                            <tr>
                                                <td>ICMS</td>
                                                <td>R$ 15,00</td>
                                            </tr>
                                            <tr>
                                                <td>DIFAL</td>
                                                <td>R$ 05,00</td>
                                            </tr>
                                            <tr>
                                                <td>IPI</td>
                                                <td>R$ 0,00</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="tax-sum">
                                        <p>Total</p>
                                        <p>R$ 250,00</p>
                                    </div>
                                </div>
                            </div>
                            <table className="table-product">
                                <thead className="table-produt-header">
                                    <tr className="table-produt-header-line">
                                        <th>Nome</th>
                                        <th>CSOSN</th>
                                        <th>CFOP</th>
                                        <th>NCM</th>
                                        <th>Un</th>
                                        <th>Qtd</th>
                                        <th>Valor Uni.</th>
                                        <th>Valor Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-product-line">
                                        <td>PRATELEIRA DE VIDRO</td>
                                        <td>321</td>
                                        <td>5010</td>
                                        <td>52.152.152.152.1235</td>
                                        <td>Un.</td>
                                        <td>5</td>
                                        <td>R$ 05,00</td>
                                        <td>R$ 25,50</td>
                                    </tr>
                                    <tr className="table-product-line">
                                        <td>PRATELEIRA DE VIDRO</td>
                                        <td>321</td>
                                        <td>5010</td>
                                        <td>52.152.152.152.1235</td>
                                        <td>Un.</td>
                                        <td>5</td>
                                        <td>R$ 05,00</td>
                                        <td>R$ 25,50</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </>
        );
    }

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
                <tr
                    className="table-line"
                    onClick={(e) => {
                        handleTableClick(e);
                    }}
                >
                    <td className="table-input table-line-input">
                        <input type="checkbox" id="table-checkbox-1" />
                        <label htmlFor="table-checkbox-1"></label>
                    </td>
                    <td>321</td>
                    <td>CARLOS MANUEL COSTA SILVA</td>
                    <td>11.111.111/0001-11</td>
                    <td>32 de Dez. de 2025</td>
                    <td>120,50</td>
                    <td>Autorizado</td>
                    <td
                        className="table-options"
                        onClick={(e) => handleOptionClick(e)}
                    >
                        ⋮{' '}
                        <div
                            className={`table-menu ${menuVisible && 'expansive-menu'}`}
                        >
                            <ul className="table-menu-options">
                                <li>
                                    <span className="menu-download"></span>
                                    Download
                                </li>
                                <li>
                                    <span className="menu-edit"></span>Edit
                                </li>
                                <li className="menu-delete-content">
                                    <span className="menu-delete"></span>Delete
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <tr className="table-expansiveline ">
                    <td colSpan={8}>
                        <div
                            className={`expansiveline ${expanded && 'expansive'}`}
                        >
                            <div className="expansiveline-container-content">
                                <div className="details-container">
                                    <div className="details-header">
                                        <p className="details-title">
                                            Detalhes #321
                                        </p>
                                        <p className="details-title-data">
                                            32 de Dez. de 2025 3:35PM
                                        </p>
                                    </div>
                                    <div className="details-infos">
                                        <span className="infos-key">
                                            <p className="infos-title">
                                                Chave:
                                            </p>
                                            <p>1521365465213546543213546213</p>
                                        </span>
                                        <span className="details-operation">
                                            <p className="infos-title">
                                                Operação:
                                            </p>
                                            <p>Compra e venda de mercadoria</p>
                                        </span>
                                        <span>
                                            <p className="infos-title">
                                                Serie:
                                            </p>
                                            <p>2</p>
                                        </span>
                                        <span>
                                            <p className="infos-title">
                                                Valor:
                                            </p>
                                            <p>R$ 120,50</p>
                                        </span>
                                        <span>
                                            <p className="infos-title">
                                                Emissão:
                                            </p>
                                            <p>32/12/2025</p>
                                        </span>
                                        <span>
                                            <p className="infos-title">
                                                Status:
                                            </p>
                                            <p>Autorizado</p>
                                        </span>
                                    </div>
                                    <div className="details-send-container">
                                        <div className="sender-container">
                                            <div className="sender-header">
                                                <p className="infos-title2">
                                                    EMITENTE
                                                </p>
                                                <p className="simples">
                                                    Simples
                                                </p>
                                            </div>
                                            <div className="sender-infos">
                                                <span>
                                                    <p className="infos-title">
                                                        Nome
                                                    </p>
                                                    <p>
                                                        CARLOS MANUEL COSTA
                                                        SILVA
                                                    </p>
                                                </span>
                                                <span>
                                                    <p className="infos-title">
                                                        Nome Fantasia
                                                    </p>
                                                    <p>WEB DESIGN PLANNER</p>
                                                </span>
                                                <div className="sender-infos2">
                                                    <span>
                                                        <p className="infos-title">
                                                            CNPJ
                                                        </p>
                                                        <p>
                                                            11.111.111/0001-11
                                                        </p>
                                                    </span>
                                                    <span className="uf">
                                                        <p className="infos-title">
                                                            UF
                                                        </p>
                                                        <p>SP</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="recipient-container">
                                            <p className="recipient-header infos-title2">
                                                DESTINATARIO
                                            </p>
                                            <div className="recipient-infos">
                                                <span>
                                                    <p className="infos-title">
                                                        Nome
                                                    </p>
                                                    <p>CARLOS</p>
                                                </span>
                                                <span>
                                                    <p className="infos-title">
                                                        Sobrenome
                                                    </p>
                                                    <p>MANUEL COSTA SILVA</p>
                                                </span>

                                                <div className="recipient-infos2">
                                                    <span>
                                                        <p className="infos-title">
                                                            CPF
                                                        </p>
                                                        <p>
                                                            11.111.111/0001-11
                                                        </p>
                                                    </span>
                                                    <span className="uf2">
                                                        <p className="infos-title">
                                                            UF
                                                        </p>
                                                        <p>SP</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tax-container">
                                    <div className="tax-header">
                                        <p className="details-title">
                                            Impostos #321
                                        </p>
                                        <p className="infos-title">
                                            32 de Dez. de 2025
                                        </p>
                                    </div>
                                    <table className="tax-list">
                                        <tbody>
                                            <tr>
                                                <td>BC</td>
                                                <td>R$ 120,50</td>
                                            </tr>
                                            <tr>
                                                <td>DESCONTO</td>
                                                <td>R$ 0,00</td>
                                            </tr>
                                            <tr>
                                                <td>ICMS</td>
                                                <td>R$ 15,00</td>
                                            </tr>
                                            <tr>
                                                <td>DIFAL</td>
                                                <td>R$ 05,00</td>
                                            </tr>
                                            <tr>
                                                <td>IPI</td>
                                                <td>R$ 0,00</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="tax-sum">
                                        <p>Total</p>
                                        <p>R$ 250,00</p>
                                    </div>
                                </div>
                            </div>
                            <table className="table-product">
                                <thead className="table-produt-header">
                                    <tr className="table-produt-header-line">
                                        <th>Nome</th>
                                        <th>CSOSN</th>
                                        <th>CFOP</th>
                                        <th>NCM</th>
                                        <th>Un</th>
                                        <th>Qtd</th>
                                        <th>Valor Uni.</th>
                                        <th>Valor Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="table-product-line">
                                        <td>PRATELEIRA DE VIDRO</td>
                                        <td>321</td>
                                        <td>5010</td>
                                        <td>52.152.152.152.1235</td>
                                        <td>Un.</td>
                                        <td>5</td>
                                        <td>R$ 05,00</td>
                                        <td>R$ 25,50</td>
                                    </tr>
                                    <tr className="table-product-line">
                                        <td>PRATELEIRA DE VIDRO</td>
                                        <td>321</td>
                                        <td>5010</td>
                                        <td>52.152.152.152.1235</td>
                                        <td>Un.</td>
                                        <td>5</td>
                                        <td>R$ 05,00</td>
                                        <td>R$ 25,50</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                {makeTableLine()}
            </tbody>
        </table>
    );
}
