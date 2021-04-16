import { Schema, model } from 'mongoose';

export const QuoteSchema = new Schema({
	author: { type: String, required: true },
	text: { type: String, required: true },
	source: { type: String },
	tags: [{ type: String }],
	createdBy: { type: String },
	createdAt: { type: Schema.Types.Mixed }, // String | Date
	updatedAt: { type: Schema.Types.Mixed }, // String | Date
	isDeleted: { type: Boolean, required: true },
});

export const QuoteModel = model('Quote', QuoteSchema);
