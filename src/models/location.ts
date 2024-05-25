import {Schema} from "mongoose";

export interface Location {
  latitude: number;
  longitude: number;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export const LocationSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true }
});
