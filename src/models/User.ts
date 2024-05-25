import {ObjectId} from "mongodb";

export interface User {
  _id: ObjectId;
  email: string;
  name: string;
  lastName: string;
}