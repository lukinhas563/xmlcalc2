import { DocumentParserService, FileReaderService } from '@/services/readers';

export default class DocumentBuilder {
    private fileContent: string;
    private fileDocument: Document;

    private readonly readerService: FileReaderService = new FileReaderService();
    private readonly parserService: DocumentParserService =
        new DocumentParserService();

    async readFile(file: File): Promise<this> {
        this.fileContent = await this.readerService.readFile(file);
        return this;
    }

    parseFile(): this {
        if (this.fileContent) {
            this.fileDocument = this.parserService.parserFile(this.fileContent);
        }

        return this;
    }

    build(): Document {
        return this.fileDocument;
    }
}
