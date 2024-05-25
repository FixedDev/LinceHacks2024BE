import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import {IUser} from "./user";
import {LocationSchema} from "./location";

export interface IHouse extends Document {
  _id: ObjectId;
  location: Location;
  owner: IUser;
  name: string;
  photos: string[];
}

const HouseSchema = new Schema({
  location: { type: LocationSchema, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  photos: { type: [String], required: true }
});

export const House = model<IHouse>('House', HouseSchema);
