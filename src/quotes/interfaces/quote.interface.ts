export interface IQuote {
    id?: string;
    _id?: string;
	author: string;
	text: string;
	source?: string;
	tags?: string[];
	createdBy?: string;
	createdAt?: string | Date;
	updatedAt?: string | Date;
	isDeleted: boolean;
}
