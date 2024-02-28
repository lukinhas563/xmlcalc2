export function cnpjFormarter(cnpj: string): string {
    cnpj = cnpj.replace(/\D/g, '');

    cnpj = cnpj.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
    );

    return cnpj;
}

export const cpfFormat = (cpf: string): string => {
    cpf = cpf.replace(/\D/g, '');

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    return cpf;
};

export const sizeFormat = (size: number): string => {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    const gigabyte = megabyte * 1024;

    if (size < kilobyte) {
        return `${size} B`;
    } else if (size < megabyte) {
        return `${(size / kilobyte).toFixed(2)} KB`;
    } else if (size < gigabyte) {
        return `${(size / megabyte).toFixed(2)} MB`;
    } else {
        return `${(size / gigabyte).toFixed(2)} GB`;
    }
};
