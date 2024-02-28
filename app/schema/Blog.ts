import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";
import { ICategory } from "./Category";
import { IUser } from "./User";
import { IFaq } from "./Faq";
import { IComment } from "./Comment";
import { ILawSuit } from "./Lawsuit";

const Schema = mongoose.Schema;

export interface IBlog extends BaseSchema {
  thumbnail: string;
  url_slug: string;
  banner: string;
  caption: string;
  short_description: string;
  description: string;
  lawsuit: Types.ObjectId | ILawSuit;
  category: Types.ObjectId | ICategory;
  faq: [Types.ObjectId | IFaq];
  updated_by: Types.ObjectId | IUser;
  like_count: number;
  comment_count: number;
  share_count: number;
  comments: [Types.ObjectId | IComment];
}

const BlogSchema = new Schema<IBlog>(
  {
    thumbnail: { type: String, required: true },
    url_slug: { type: String, required: true, unique: true },
    banner: { type: String, required: true },
    caption: { type: String, required: true },
    short_description: { type: String, required: true },
    description: { type: String, required: true },
    lawsuit: { type: mongoose.Types.ObjectId, required: true, ref: "Lawsuits" },
    like_count: { type: Number, default: 0 },
    share_count: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Categories",
    },
    updated_by: { type: mongoose.Types.ObjectId, ref: "Users" },
    faq: [{ type: mongoose.Types.ObjectId, ref: "Faqs" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IBlog>("Blogs", BlogSchema);
