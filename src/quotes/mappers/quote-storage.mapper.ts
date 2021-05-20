/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { singleton } from "tsyringe";
import { IMapper } from '../../core/interfaces';

@singleton()
export class QuoteStorageMapper implements IMapper {
    toDomain(item: any): any {
        return item;
    }

    toDalEntity(item: any): any {
        return item;
    }
}
