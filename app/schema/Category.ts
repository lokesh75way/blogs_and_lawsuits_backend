import mongoose from "mongoose";
import { type BaseSchema } from "./index";

const Schema = mongoose.Schema;

export interface ICategory extends BaseSchema {
  label: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    label: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("category", CategorySchema);
