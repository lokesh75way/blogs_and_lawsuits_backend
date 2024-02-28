import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";
import { ICategory } from "./Category";
import { IUser } from "./User";
import { IFaq } from "./Faq";
import { IComment } from "./Comment";

const Schema = mongoose.Schema;

export interface ILawSuitTimeLine extends BaseSchema {
  description: string;
  date: Date;
  order: number;
  updated_by: Types.ObjectId | IUser;
}

const LawSuitTimeLineSchema = new Schema<ILawSuitTimeLine>(
  {
    description: { type: String, required: true },
    date: { type: Date, required: true },
    order: { type: Number, required: true },
    updated_by: { type: mongoose.Types.ObjectId, ref: "Users" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ILawSuitTimeLine>(
  "LawsuitsTimelines",
  LawSuitTimeLineSchema
);
