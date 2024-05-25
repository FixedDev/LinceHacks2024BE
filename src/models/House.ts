import {Location} from './Location';
import {User} from "./User";

export interface House {
  id: string;
  location: Location;
  owner: User;
  name: string;
  photos: string[];
}