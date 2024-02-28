import { type Types } from "mongoose";

export interface BaseSchema {
  _id: Types.ObjectId;
  created_at: string;
  updated_at: string;
}
