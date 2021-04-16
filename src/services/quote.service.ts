import { IQuote } from '../interfaces';
import { injectable, inject } from 'tsyringe';
import { QuoteMapper } from '../mappers/quote.mapper';
import { Model, Schema } from 'mongoose';

@injectable()
export class QuoteService {
    constructor(
        @inject('QuoteModel') private quoteModel: Model<any, Schema>,
        private quoteMapper: QuoteMapper,
    ) {}

    async find(): Promise<IQuote[]> {
        const data = await this.quoteModel.find({ isDeleted: false });
        return data.map(this.quoteMapper.toDomain);
    }

    async findRandom(tag: string): Promise<IQuote> {
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
        const item = await this.quoteModel.findOne({ _id: id, isDeleted: false });
        if (!item) {
            throw { message: 'Item not found'};
        }
        return this.quoteMapper.toDomain(item);
    }

    async create(inputItem: IQuote): Promise<IQuote> {
        const item = await this.quoteModel
            .create(this.quoteMapper.toDalEntity(inputItem));
        return this.quoteMapper.toDomain(item);
    }

    async update(id: string, inputItem: IQuote): Promise<IQuote> {
        await this.findOne(id);
        const item = await this.quoteModel.findOneAndUpdate(
            {_id: id },
            this.quoteMapper.toDalEntity(inputItem),
            { new: true },
        );
        return this.quoteMapper.toDomain(item);
    }

    async delete(id: string): Promise<void> {
        await this.quoteModel.updateOne({ _id: id }, { isDeleted: true });
    }
}
