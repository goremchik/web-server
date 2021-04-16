import { singleton } from "tsyringe";
import { IQuote, IMapper } from '../interfaces';

@singleton()
export class QuoteMapper implements IMapper {
    toDomain({ _id, author, text, source, tags, createdBy, createdAt, updatedAt, isDeleted }: IQuote): IQuote {
        return { id: _id, author, text, source, tags, createdBy, createdAt, updatedAt, isDeleted };
    }

    toDalEntity(item: IQuote): IQuote {
        return item;
    }
}
