import { Person } from '@/interfaces/person-protocol';

interface RecipientProps {
    recipient: Person;
}

export default function DetailsRecipient({ recipient }: RecipientProps) {
    if (recipient.cnpj) {
        return (
            <div className="sender-container">
                <div className="sender-header">
                    <p className="infos-title2">EMITENTE</p>
                    <p className="simples">Simples</p>
                </div>
                <div className="sender-infos">
                    <span>
                        <p className="infos-title">Nome</p>
                        <p>{recipient.name.toUpperCase()}</p>
                    </span>
                    <span>
                        <p className="infos-title">Nome Fantasia</p>
                        <p>{recipient.fantasyName.toUpperCase()}</p>
                    </span>
                    <div className="sender-infos2">
                        <span>
                            <p className="infos-title">CNPJ</p>
                            <p>{recipient.cnpj}</p>
                        </span>
                        <span className="uf">
                            <p className="infos-title">UF</p>
                            <p>{recipient.address.state.toUpperCase()}</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="recipient-container">
                <p className="recipient-header infos-title2">DESTINATARIO</p>
                <div className="recipient-infos">
                    <span>
                        <p className="infos-title">Nome</p>
                        <p>{recipient.name.toUpperCase()}</p>
                    </span>
                    <span>
                        <p className="infos-title">Sobrenome</p>
                        <p>{recipient.lastName.toUpperCase()}</p>
                    </span>

                    <div className="recipient-infos2">
                        <span>
                            <p className="infos-title">CPF</p>
                            <p>{recipient.cpf}</p>
                        </span>
                        <span className="uf2">
                            <p className="infos-title">UF</p>
                            <p>{recipient.address.state.toUpperCase()}</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
