import mongoose, { Schema } from 'mongoose'

export const QuoteSchema = new Schema({
	id: { type: String, index: true },
	author: { type: String, required: true },
	text: { type: String, required: true },
	source: { type: String },
	tags: [{ type: String }],
	createdBy: { type: String },
	createdAt: { type: Schema.Types.Mixed }, // String | Date
	updatedAt: { type: Schema.Types.Mixed }, // String | Date
	isDeleted: { type: Boolean, required: true },
});

export const quoteModel = mongoose.model('Quote', QuoteSchema)
