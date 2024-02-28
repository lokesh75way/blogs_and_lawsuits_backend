import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";
import { ICategory } from "./Category";
import { IUser } from "./User";
import { IFaq } from "./Faq";
import { IComment } from "./Comment";
import { ILawSuitTimeLine } from "./LawSuitsTimeLines";

const Schema = mongoose.Schema;

export interface ILawSuit extends BaseSchema {
  thumbnail: string;
  banner: string;
  url_slug: string;
  caption: string;
  timelines: [Types.ObjectId | ILawSuitTimeLine];
  qualify_description: string;
  upper_qualify_description: string;
  lower_qualify_description: string;
  category: Types.ObjectId | ICategory;
  faq: [Types.ObjectId | IFaq];
  updated_by: Types.ObjectId | IUser;
  like_count: number;
  comment_count: number;
  share_count: number;
  comments: [Types.ObjectId | IComment];
}
const LawSuitSchema = new Schema<ILawSuit>(
  {
    thumbnail: { type: String, required: true },
    url_slug: { type: String, required: true, unique: true },
    banner: { type: String, required: true },
    caption: { type: String, required: true },
    timelines: [{ type: mongoose.Types.ObjectId, ref: "LawsuitsTimelines" }],
    qualify_description: { type: String, required: true },
    lower_qualify_description: { type: String, required: true },
    upper_qualify_description: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Categories" },
    like_count: { type: Number, default: 0 },
    share_count: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    updated_by: { type: mongoose.Types.ObjectId, ref: "Users" },
    faq: [{ type: mongoose.Types.ObjectId, ref: "Faqs" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ILawSuit>("Lawsuits", LawSuitSchema);
