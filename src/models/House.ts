import {Location} from './Location';
import {User} from "./User";
import {ObjectId} from "mongodb";

export interface House {
  _id: ObjectId;
  location: Location;
  owner: User;
  name: string;
  photos: string[];
}