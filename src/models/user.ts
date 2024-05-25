import {Schema, model, Document} from 'mongoose';
import {ICollegiate} from './collegiate';

export enum UserRole {
    LANDLORD = 'landlord',
    STUDENT = 'student'
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export interface IUser extends Document {
    _id: string;
    fullName: string;
    email: string;
    whatsapp: string;
    role: UserRole;
    collegiate: ICollegiate['_id'];  // Reference to Collegiate model
    gender: Gender;
    bornDate: string;
    studentId: string; // base64
    residenceId: string; // base64
    familyName: string;
    familyNumber: string;
    hasCompleteProfile: boolean;
}

const UserSchema = new Schema({
    _id: {type: String, required: true},
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    whatsapp: {type: String, required: true},
    role: {type: String, enum: Object.values(UserRole), required: true},
    collegiate: {type: Schema.Types.ObjectId, ref: 'Collegiate', required: true},  // Reference to Collegiate model
    gender: {type: String, enum: Object.values(Gender), required: true},
    bornDate: {type: String, required: true},
    studentId: {type: String, required: true},  // base64
    residenceId: {type: String, required: true},  // base64
    familyName: {type: String, required: true},
    familyNumber: {type: String, required: true},
    hasCompleteProfile: {type: Boolean, required: true}
});

export const User = model<IUser>('User', UserSchema);
