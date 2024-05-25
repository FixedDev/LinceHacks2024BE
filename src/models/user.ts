import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUser extends Document {
    _id: ObjectId;
    authUserId: string;
    email: string;
    name: string;
    lastName: string;
}

const UserSchema = new Schema({
    authUserId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true }
});

export const User = model<IUser>('User', UserSchema);
