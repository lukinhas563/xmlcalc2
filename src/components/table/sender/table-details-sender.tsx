import { FisicalPerson, LegalPerson } from '@/classes/persons';
import { Person } from '@/interfaces/person-protocol';
import { cnpjFormarter, cpfFormat } from '@/services/formarter';

interface SenderProps {
    sender: Person;
}

export default function DetailsSender({ sender }: SenderProps) {
    if ('cnpj' in sender) {
        const company = sender as LegalPerson;

        return (
            <div className="sender-container">
                <div className="sender-header">
                    <p className="infos-title2">EMITENTE</p>
                    <p className="simples">Simples</p>
                </div>
                <div className="sender-infos">
                    <span>
                        <p className="infos-title">Nome</p>
                        <p>{company.name.toUpperCase()}</p>
                    </span>
                    <span>
                        <p className="infos-title">Nome Fantasia</p>
                        <p>{company.fantasyName.toUpperCase()}</p>
                    </span>
                    <div className="sender-infos2">
                        <span>
                            <p className="infos-title">CNPJ</p>
                            <p>{cnpjFormarter(company.cnpj)}</p>
                        </span>
                        <span className="uf">
                            <p className="infos-title">UF</p>
                            <p>{company.address.state.toUpperCase()}</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    } else {
        const costumer = sender as FisicalPerson;

        return (
            <div className="recipient-container">
                <p className="recipient-header infos-title2">EMITENTE</p>
                <div className="recipient-infos">
                    <span>
                        <p className="infos-title">Nome</p>
                        <p>{costumer.name}</p>
                    </span>
                    <span>
                        <p className="infos-title">Sobrenome</p>
                        <p>{costumer.lastName}</p>
                    </span>

                    <div className="recipient-infos2">
                        <span>
                            <p className="infos-title">CPF</p>
                            <p>{cpfFormat(costumer.cpf)}</p>
                        </span>
                        <span className="uf2">
                            <p className="infos-title">UF</p>
                            <p>{costumer.address.state}</p>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
