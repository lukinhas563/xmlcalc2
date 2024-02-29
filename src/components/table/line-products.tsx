import Product from '@/classes/product';
import { nameSizeFormat } from '@/services/formarter';

interface ProductsProps {
    products: Product[];
}

export default function TableLineProducts({ products }: ProductsProps) {
    return (
        <table className="table-product">
            <thead className="table-produt-header">
                <tr className="table-produt-header-line">
                    <th>Nome</th>
                    <th>
                        {products[0].taxCode !== undefined &&
                        products[0].taxCode > 100
                            ? 'CSOSN'
                            : 'CST'}
                    </th>
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
                        <td>
                            {nameSizeFormat(product.name.toUpperCase(), 30)}
                        </td>
                        <td>{product.taxCode}</td>
                        <td>{product.cfop}</td>
                        <td>{product.ncm}</td>
                        <td>{product.unit}</td>
                        <td>{product.amount}</td>
                        <td>R$ {product.unitPrice.toFixed(2)}</td>
                        <td>R$ {product.totalPrice.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
