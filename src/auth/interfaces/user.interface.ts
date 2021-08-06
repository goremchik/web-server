import { IAuth } from './auth.interface';

export interface IUser extends IAuth { 
	_id?: string;
	id?: string;
	firstName: string;
	lastName: string;
	isDeleted?: boolean;
}

export interface IMappedUser {
	id?: string;
	firstName: string;
	lastName: string;
	isDeleted?: boolean;
	username: string;
}
