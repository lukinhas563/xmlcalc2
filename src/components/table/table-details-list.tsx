import Invoice from '@/classes/invoice';
import DetailsRecipient from './recipient/table.details.recipient';
import DetailsSender from './sender/table-details-sender';

interface DetailsProps {
    invoice: Invoice;
}

export default function TableDetailsList({ invoice }: DetailsProps) {
    return (
        <div className="details-container">
            <div className="details-header">
                <p className="details-title">Detalhes #{invoice.id}</p>
                <p className="details-title-data">{invoice.createdAtBR}</p>
            </div>
            <div className="details-infos">
                <span className="infos-key">
                    <p className="infos-title">Chave:</p>
                    <p>1521365465213546543213546213</p>
                </span>
                <span className="details-operation">
                    <p className="infos-title">Operação:</p>
                    <p>{invoice.operation}</p>
                </span>
                <span>
                    <p className="infos-title">Serie:</p>
                    <p>{invoice.serial}</p>
                </span>
                <span>
                    <p className="infos-title">Valor:</p>
                    <p>R$ {invoice.totalPrice.toFixed(2)}</p>
                </span>
                <span>
                    <p className="infos-title">Emissão:</p>
                    <p>{invoice.emission}</p>
                </span>
                <span>
                    <p className="infos-title">Status:</p>
                    <p>{invoice.status}</p>
                </span>
            </div>
            <div className="details-send-container">
                <DetailsSender sender={invoice.sender} />
                <DetailsRecipient recipient={invoice.recipient} />
            </div>
        </div>
    );
}
