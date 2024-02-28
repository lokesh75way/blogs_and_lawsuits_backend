import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";
import { IUser } from "./User";

const Schema = mongoose.Schema;

export interface ICategory extends BaseSchema {
  title: string;
  is_active: boolean;
  updated_by: Types.ObjectId | IUser;
}

const CategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true, unique: true },
    is_active: { type: Boolean, required: true },
    updated_by: { type: mongoose.Types.ObjectId, ref: "Users" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ICategory>("Categories", CategorySchema);
