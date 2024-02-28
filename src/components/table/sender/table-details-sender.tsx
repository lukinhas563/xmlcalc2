import { Person } from '@/interfaces/person-protocol';
import { cnpjFormarter, cpfFormat } from '@/services/formarter';

interface SenderProps {
    sender: Person;
}

export default function DetailsSender({ sender }: SenderProps) {
    if (sender.cnpj) {
        return (
            <div className="sender-container">
                <div className="sender-header">
                    <p className="infos-title2">EMITENTE</p>
                    <p className="simples">Simples</p>
                </div>
                <div className="sender-infos">
                    <span>
                        <p className="infos-title">Nome</p>
                        <p>{sender.name.toUpperCase()}</p>
                    </span>
                    <span>
                        <p className="infos-title">Nome Fantasia</p>
                        <p>{sender.fantasyName.toUpperCase()}</p>
                    </span>
                    <div className="sender-infos2">
                        <span>
                            <p className="infos-title">CNPJ</p>
                            <p>{cnpjFormarter(sender.cnpj)}</p>
                        </span>
                        <span className="uf">
                            <p className="infos-title">UF</p>
                            <p>{sender.address.state.toUpperCase()}</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="recipient-container">
                <p className="recipient-header infos-title2">EMITENTE</p>
                <div className="recipient-infos">
                    <span>
                        <p className="infos-title">Nome</p>
                        <p>{sender.name}</p>
                    </span>
                    <span>
                        <p className="infos-title">Sobrenome</p>
                        <p>{sender.lastName}</p>
                    </span>

                    <div className="recipient-infos2">
                        <span>
                            <p className="infos-title">CPF</p>
                            <p>{cpfFormat(sender.cpf)}</p>
                        </span>
                        <span className="uf2">
                            <p className="infos-title">UF</p>
                            <p>{sender.address.state}</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
