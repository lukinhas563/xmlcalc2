export class FileReaderService {
    async readFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsText(file);
            reader.onload = (event) => {
                if (event.target) {
                    const text = event.target.result as string;
                    resolve(text);
                } else {
                    reject(new Error('Error reading the file.'));
                }
            };

            reader.onerror = (error) => {
                reject(new Error('Error reading the file.'));
            };
        });
    }
}

export class DocumentParserService {
    parserFile(file: string): Document {
        const parser = new DOMParser();
        const document = parser.parseFromString(file, 'text/xml');

        return document;
    }
}
