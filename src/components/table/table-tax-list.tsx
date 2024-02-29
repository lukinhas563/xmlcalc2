import Invoice from '@/classes/invoice';

interface TaxProps {
    invoice: Invoice;
}

export default function TableTaxList({ invoice }: TaxProps) {
    const totalTax = (): number => {
        return invoice.icms + invoice.cofins + invoice.pis;
    };

    return (
        <div className="tax-container">
            <div className="tax-header">
                <p className="details-title">Impostos #{invoice.id}</p>
                <p className="infos-title">{invoice.createdAtBR}</p>
            </div>
            <table className="tax-list">
                <tbody>
                    <tr>
                        <td>BC</td>
                        <td>{invoice.totalPrice.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>DESCONTO</td>
                        <td>R$ 0,00</td>
                    </tr>
                    <tr>
                        <td>ICMS</td>
                        <td>R$ {invoice.icms.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>PIS</td>
                        <td>R$ {invoice.pis.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>COFINS</td>
                        <td>R$ {invoice.cofins.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="tax-sum">
                <p>Total</p>
                <p>R$ {totalTax().toFixed(2)}</p>
            </div>
        </div>
    );
}
