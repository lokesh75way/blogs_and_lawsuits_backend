import mongoose from "mongoose";
import { type BaseSchema } from "./index";
import { ICategory } from "./Category";

const Schema = mongoose.Schema;

export const enum IBlogAndLawsuitType {
  blog = "BLOG",
  lawSuit = "LAWSUIT",
}

export interface IBlogAndLawsuit extends BaseSchema {
  title: string;
  caption: string;
  coverImage: string;
  thumbnail: string;
  description: string;
  publishedAt?: Date;
  likes?: string[];
  share?: string[];
  type: IBlogAndLawsuitType;
  category: ICategory;
}

const BlogAndLawsuitSchema = new Schema<IBlogAndLawsuit>(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    coverImage: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    publishedAt: { type: Date },
    likes: { type: [String] }, // need to store user's ids
    share: { type: [String] }, // need to store user's ids
    type: {
      type: String,
      enum: [IBlogAndLawsuitType.blog, IBlogAndLawsuitType.lawSuit],
      default: IBlogAndLawsuitType.blog,
    },
    category: { type: Schema.Types.ObjectId, ref: "category" },
  },
  { timestamps: true }
);

export default mongoose.model<IBlogAndLawsuit>("blog", BlogAndLawsuitSchema);
