export class QuoteService {
    constructor(quoteModel, quoteMapper) {
        this.quoteModel = quoteModel;
        this.quoteMapper = quoteMapper;
    }

    async find() {
        const data = await this.quoteModel.find({ isDeleted: false });
        return data.map(this.quoteMapper.toDomain);
    }

    async findRandom(tag) {
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

    async findOne(id) {
        const item = await this.quoteModel.findOne({ _id: id, isDeleted: false });
        if (!item) {
            throw { message: 'Item not found'};
        }
        return this.quoteMapper.toDomain(item);
    }

    async create(inputItem) {
        const item = await this.quoteModel
            .create(this.quoteMapper.toDalEntity(inputItem));
        return this.quoteMapper.toDomain(item);
    }

    async update(id, inputItem) {
        await this.findOne(id);
        const item = await this.quoteModel.findOneAndUpdate(
            {_id: id },
            this.quoteMapper.toDalEntity(inputItem),
            { new: true },
        );
        return this.quoteMapper.toDomain(item);
    }

    async delete(id) {
        await this.quoteModel.updateOne({ _id: id }, { isDeleted: true });
    }
}
