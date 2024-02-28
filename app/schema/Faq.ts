import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";
import { IUser } from "./User";

const Schema = mongoose.Schema;

export interface IFaq extends BaseSchema {
  question: string;
  answer: string;
  updated_by: Types.ObjectId | IUser;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: {
      type: String,
      unique: true,
    },
    answer: {
      type: String,
    },
    updated_by: { type: mongoose.Types.ObjectId },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IFaq>("Faqs", FaqSchema);
