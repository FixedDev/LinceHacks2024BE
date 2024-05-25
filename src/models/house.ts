import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import {IUser} from "./user";
import {LocationSchema} from "./location";

export interface IHouse extends Document {
  _id: ObjectId;
  location: Location;
  owner: IUser['_id'];  // Reference to User model
  name: string;
  photos: string[];
  utilityCost: number;
  cost: number;
  bathrooms: number;
  rooms: number;
}

const HouseSchema = new Schema({
  location: { type: LocationSchema, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User model
  name: { type: String, required: true },
  photos: { type: [String], required: true },
  utilityCost: { type: Number, required: true },  // New property in English
  cost: { type: Number, required: true },  // New property in English
  bathrooms: { type: Number, required: true },  // New property in English
  rooms: { type: Number, required: true }  // New property in English
});

export const House = model<IHouse>('House', HouseSchema);
