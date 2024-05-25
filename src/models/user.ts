import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export enum UserRole {
    LANDLORD = 'Arrendador',
    STUDENT = 'Estudiante'
}

export interface IUser extends Document {
    _id: ObjectId;
    authUserId: string;
    email: string;
    name: string;
    lastName: string;
    role: UserRole;
}

const UserSchema = new Schema({
    authUserId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true }
});

export const User = model<IUser>('User', UserSchema);
