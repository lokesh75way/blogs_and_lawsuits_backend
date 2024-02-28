import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";

const Schema = mongoose.Schema;

export interface INewsLetter extends BaseSchema {
  email: string;
}

const NewsLetterSchema = new Schema<INewsLetter>(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<INewsLetter>("NewsLetters", NewsLetterSchema);
