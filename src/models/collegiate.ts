import {Schema, model, Document} from 'mongoose';
import {LocationSchema, Location} from './location';

export interface ICollegiate extends Document {
    name: string;
    location: Location;
}

const CollegiateSchema = new Schema({
    name: {type: String, required: true},
    location: {type: LocationSchema, required: true},
});

export const Collegiate = model<ICollegiate>('Collegiate', CollegiateSchema);
