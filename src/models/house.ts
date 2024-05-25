import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { LocationSchema } from "./location";
import { IBaseUser } from "./user";

export interface IHouse extends Document {
    _id: ObjectId;
    location: Location;
    owner: IBaseUser['_id'];  // Reference to User model
    name: string;
    photos: string[];
    utilityCost: number;
    cost: number;
    bathrooms: number;
    rooms: number;
    furnished: boolean;
    sharedBathroom: boolean;
    allowsPets: boolean;
    allowsRentPlans: boolean;
    rentPlans: string[] | null;
    parking: boolean;
    allowsTransfers: boolean;
    allowsCrypto: boolean;
    bankAccount: string | null;
    cryptoWallet: string | null;
}

const HouseSchema = new Schema({
    location: { type: LocationSchema, required: true },
    owner: { type: String, ref: 'User', required: true },  // Reference to User model
    name: { type: String, required: true },
    photos: { type: [String], required: true },
    utilityCost: { type: Number, required: true },  // New property in English
    cost: { type: Number, required: true },  // New property in English
    bathrooms: { type: Number, required: true },  // New property in English
    rooms: { type: Number, required: true },  // New property in English
    furnished: { type: Boolean, required: true },
    sharedBathroom: { type: Boolean, required: true },
    allowsPets: { type: Boolean, required: true },
    allowsRentPlans: { type: Boolean, required: true },
    rentPlans: { type: [String], default: null },
    parking: { type: Boolean, required: true },
    allowsTransfers: { type: Boolean, required: true },
    allowsCrypto: { type: Boolean, required: true },
    bankAccount: { type: String, default: null },
    cryptoWallet: { type: String, default: null }
});

export const House = model<IHouse>('House', HouseSchema);
