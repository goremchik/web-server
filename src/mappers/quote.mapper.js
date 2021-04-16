import { EntityMapper } from './entity.mapper';

export class QuoteMapper extends EntityMapper {
    toDomain({ _id, author, text, source, tags, createdBy, createdAt, updatedAt }) {
        return { id: _id, author, text, source, tags, createdBy, createdAt, updatedAt };
    }
}
