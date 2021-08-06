import { Model, Schema } from 'mongoose';
import { injectable, inject } from 'tsyringe';
import { UserMapper } from '../mappers';
import { IUser, IMappedUser } from '../interfaces';
import { AnyObject } from '../../core/interfaces';
import { AlreadyExistsError } from '../../core/errors';
import { HashService } from './hash.service';

@injectable()
export class UserService {
    constructor(
        @inject('UserModel') private userModel: Model<any, Schema>,
        private userMapper: UserMapper,
    ) {}

    async findOne(properties: AnyObject): Promise<IMappedUser | null> {
        const user = await this.userModel.findOne(properties);
        return user && this.userMapper.toDomain(user);
    }

    async findOneById(id: string): Promise<IMappedUser> {
        const user = await this.userModel.findById(id);
        return this.userMapper.toDomain(user);
    }

    async create(user: IUser): Promise<IMappedUser> {
        const checkUser = await this.findOne({ username: user.username})
        if (checkUser) throw new AlreadyExistsError();

        user.password = await HashService.hash(user.password);
        const createdUser = await this.userModel.create(this.userMapper.toDalEntity(user));

        return this.userMapper.toDomain(createdUser);
    }

    async validateUser(username: string, password: string): Promise<IMappedUser| null> {
        const user = await this.userModel.findOne({ username });
        const isValid = await HashService.validate(password, user.password);
        return isValid ? this.userMapper.toDomain(user) : null;
    }
}
