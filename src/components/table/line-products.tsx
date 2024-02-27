import Product from '@/classes/product';

interface ProductsProps {
    products: Product[];
}

export default function TableLineProducts({ products }: ProductsProps) {
    return (
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
                {products.map((product, index) => (
                    <tr className="table-product-line" key={index}>
                        <td>{product.name.toUpperCase()}</td>
                        <td>{product.taxCode}</td>
                        <td>{product.cfop}</td>
                        <td>{product.ncm}</td>
                        <td>{product.unit}</td>
                        <td>{product.amount}</td>
                        <td>{product.unitPrice.toFixed(2)}</td>
                        <td>{product.totalPrice.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
