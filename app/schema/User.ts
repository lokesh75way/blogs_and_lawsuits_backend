import mongoose from "mongoose";
import { type BaseSchema } from "./index";

const Schema = mongoose.Schema;

export interface IUser extends BaseSchema {
  ip: string;
  first_name: string;
  last_name: string;
  email: string;
  state: string;
  is_active: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    ip: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    state: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IUser>("Users", UserSchema);
