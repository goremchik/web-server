import { injectable, inject } from 'tsyringe';
import { IEnv } from '../../core/interfaces';
import { StorageService } from '../../core/services';
import { IQuote } from '../interfaces';
import { QuoteStorageMapper } from '../mappers';

const fileName = 'quotes.json';

@injectable()
export class QuoteStorageService {
    storage: StorageService;
    quotes: IQuote[] = [];

    constructor(
        @inject('env') env: IEnv,
        private quoteMapper: QuoteStorageMapper,
    ) {
        this.storage = new StorageService(env.QUOTES_BUCKET_NAME);
        this.readQuotesFromFile();
    }

    async readQuotesFromFile(): Promise<void> {
        try {
            const data = await this.storage.read(fileName);
            this.quotes = JSON.parse(data.Body.toString('utf-8'));
        } catch (e) {
            console.log(e);
        }
    }

    async writeQuotesToFile(): Promise<void> {
        await this.storage.write(fileName, JSON.stringify(this.quotes));
    }

    async find(): Promise<IQuote[]> {
        return this.quotes.map(item => this.quoteMapper.toDomain(item));
    }

    async findRandom(tag: string): Promise<IQuote> {
        const quotes = this.quotes
            .filter(({ tags = [] }) => !tag || tags.includes(tag.toLowerCase()));

        const randomItem = quotes[Math.floor(Math.random() * quotes.length)];
        return this.quoteMapper.toDomain(randomItem);
    }

    async findOne(itemId: string): Promise<IQuote> {
        const item = this.quotes.find(({ id }) => id === itemId);
        return this.quoteMapper.toDomain(item);
    }

    async create(inputItem: IQuote): Promise<IQuote> {
        this.quotes = [ ...this.quotes, inputItem];
        await this.writeQuotesToFile();
        return this.quoteMapper.toDomain(inputItem);
    }

    async update(id: string, inputItem: IQuote): Promise<IQuote> {
        this.quotes = this.quotes
            .map(item => item.id === id ? { ...inputItem, id } : item);

        await this.writeQuotesToFile();
        return this.quoteMapper.toDomain(inputItem);
    }

    async delete(itemId: string): Promise<void> {
        this.quotes = this.quotes.filter(({ id }) => id !== itemId);
        await this.writeQuotesToFile();
    }
}
