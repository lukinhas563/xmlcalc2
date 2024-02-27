import Address from '@/classes/address';
import Invoice from '@/classes/invoice';
import { LegalPerson } from '@/classes/persons';

const addressMock = new Address(
    'Navalho',
    'Jardim',
    'São Paulo',
    'SP',
    '11111111',
    'Brasil',
);
const legalPersonMock = new LegalPerson(
    'Itau',
    addressMock,
    'Itau Unibanco',
    '111.111.111/0001-11',
);
const invoiceMock = new Invoice(
    123,
    123456789,
    '2',
    'venda',
    '20/09/2025',
    legalPersonMock,
    legalPersonMock,
);

export default invoiceMock;
