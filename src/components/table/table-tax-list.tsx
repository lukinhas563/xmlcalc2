export default function TableTaxList() {
    return (
        <div className="tax-container">
            <div className="tax-header">
                <p className="details-title">Impostos #321</p>
                <p className="infos-title">32 de Dez. de 2025</p>
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
    );
}
