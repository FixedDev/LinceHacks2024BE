import { Schema, model, Document } from 'mongoose';

// Enumeración para el campo 'role'
export enum UserRole {
    LANDLORD = 'arrendador',
    STUDENT = 'estudiante',
}

export enum Gender {
    MALE = 'masculino',
    FEMALE = 'femenino',
    OTHER = 'otro'
}
// Interfaz base para los atributos comunes
export interface IBaseUser extends Document {
    _id: string;
    fullName: string;
    email: string;
    whatsapp: string;
    role: UserRole;
    gender: Gender;
    bornDate: string;
    hasCompleteProfile: boolean;
}

// Esquema base
const BaseUserSchema = new Schema<IBaseUser>({
    _id: String,
    fullName: String,
    email: {
        type: String,
        unique: true,
    },
    whatsapp: String,
    role: {
        type: String,
        enum: [UserRole.LANDLORD, UserRole.STUDENT],
    },
    gender: String,
    bornDate: String,
    hasCompleteProfile: Boolean,
}, { discriminatorKey: 'role' });

// Esquema para arrendador
interface ILandlord extends IBaseUser {
    // Agregar atributos específicos para arrendador si es necesario
}

const LandlordSchema = new Schema<ILandlord>({
    // Atributos específicos para arrendador
}, { discriminatorKey: 'role' });

// Esquema para estudiante
export interface IStudent extends IBaseUser {
    studentId: string;
    residenceId: string;
    familyName: string;
    familyNumber: string;
    collegiate: string;  // Reference to Collegiate model
}

const StudentSchema = new Schema<IStudent>({
    studentId: String,
    residenceId: String,
    familyName: String,
    familyNumber: String,
    collegiate: String,  // Reference to Collegiate model
}, { discriminatorKey: 'role' });

// Modelo base
const BaseUser = model<IBaseUser>('BaseUser', BaseUserSchema);

// Modelo para arrendador
const Landlord = BaseUser.discriminator<ILandlord>('arrendador', LandlordSchema);

// Modelo para estudiante
const Student = BaseUser.discriminator<IStudent>('estudiante', StudentSchema);

export { BaseUser, Landlord, Student };
