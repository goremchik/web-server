import { singleton } from "tsyringe";
import { IMapper } from 'src/core/interfaces';
import { IUser, IMappedUser } from '../interfaces';

@singleton()
export class UserMapper implements IMapper {
    toDomain({ username, firstName, lastName, _id }: IUser): IMappedUser {
        return { username, firstName, lastName, id: _id };
    }

    toDalEntity(item: IMappedUser): IMappedUser {
        return item;
    }
}
