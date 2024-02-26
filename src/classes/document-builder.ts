import { DocumentParserService, FileReaderService } from '@/services/readers';

export default class DocumentBuilder {
    private fileContents: string[] = [];
    private fileDocuments: Document[] = [];

    private readonly readerService: FileReaderService = new FileReaderService();
    private readonly parserService: DocumentParserService =
        new DocumentParserService();

    async readFile(files: File | FileList): Promise<this> {
        if (files instanceof FileList) {
            for (let i = 0; i < files.length; i++) {
                const fileContent = await this.readerService.readFile(files[i]);
                this.fileContents.push(fileContent);
            }
        } else {
            const fileContent = await this.readerService.readFile(files);
            this.fileContents.push(fileContent);
        }

        return this;
    }

    parseFile(): this {
        this.fileContents.map((Content) => {
            const content = this.parserService.parserFile(Content);
            this.fileDocuments.push(content);
        });

        return this;
    }

    build(): Document | Document[] {
        if (this.fileDocuments.length === 1) {
            return this.fileDocuments[0];
        } else {
            return this.fileDocuments;
        }
    }
}
