import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isDeleted: { type: Boolean },
});

export const UserModel = model('User', UserSchema);
