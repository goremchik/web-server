import { Model, Schema } from 'mongoose';
import { injectable, inject } from 'tsyringe';
import { IQuote } from '../interfaces';
import { QuoteMapper } from '../mappers';
import { LoggerService } from '../../core/services';

@injectable()
export class QuoteService {
    constructor(
        @inject('QuoteModel') private quoteModel: Model<any, Schema>,
        private quoteMapper: QuoteMapper,
        private logger: LoggerService,
    ) {
        this.logger.setContext(QuoteService.name);
    }

    async find(): Promise<IQuote[]> {
        this.logger.log('Find all quotes');
        const data = await this.quoteModel.find({ isDeleted: false });
        return data.map(this.quoteMapper.toDomain);
    }

    async findRandom(tag: string): Promise<IQuote> {
        this.logger.log(`Find random quote with tag: ${tag}`);
        const condition = [
            { isDeleted: false },
            { $or:[{ tags: tag }, { text: { $regex: new RegExp(tag, 'i') } }] },
        ];

        const count = await this.quoteModel.countDocuments().and(condition);
        const item = await this.quoteModel
            .findOne()
            .and(condition)
            .skip(Math.floor(Math.random() * count));
        
        if (!item) {
            throw { message: 'Item not found'};
        }
        return this.quoteMapper.toDomain(item);
    }

    async findOne(id: string): Promise<IQuote> {
        this.logger.log(`Find quote by id: ${id}`);
        const item = await this.quoteModel.findOne({ _id: id, isDeleted: false });
        if (!item) {
            throw { message: 'Item not found'};
        }
        return this.quoteMapper.toDomain(item);
    }

    async create(inputItem: IQuote): Promise<IQuote> {
        this.logger.log('Create quote', inputItem);
        const item = await this.quoteModel
            .create(this.quoteMapper.toDalEntity(inputItem));
        return this.quoteMapper.toDomain(item);
    }

    async update(id: string, inputItem: IQuote): Promise<IQuote> {
        this.logger.log(`Update quote by id: ${id}`, inputItem);
        await this.findOne(id);
        const item = await this.quoteModel.findOneAndUpdate(
            {_id: id },
            this.quoteMapper.toDalEntity(inputItem),
            { new: true },
        );
        return this.quoteMapper.toDomain(item);
    }

    async delete(id: string): Promise<void> {
        this.logger.log(`Remove quote by id: ${id}`);
        await this.quoteModel.updateOne({ _id: id }, { isDeleted: true });
    }
}
