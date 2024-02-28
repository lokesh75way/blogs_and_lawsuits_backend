import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";
import { ICategory } from "./Category";
import { IUser } from "./User";
import { IFaq } from "./Faq";

const Schema = mongoose.Schema;

export interface IComment extends BaseSchema {
  user_id: Types.ObjectId | IUser;
  email: string;
  first_name: string;
  last_name: string;
  parent_id: Types.ObjectId | null;
  comment: string;
  like_count: number;
  dislike_count: number;
}

const CommentSchema = new Schema<IComment>(
  {
    parent_id: {
      type: mongoose.Types.ObjectId,
      ref: "Comments",
      default: null,
    },
    comment: { type: String, required: true },
    like_count: { type: Number, default: 0 },
    dislike_count: { type: Number, default: 0 },
    user_id: { type: mongoose.Types.ObjectId, ref: "Users" },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, reuqired: true },
    last_name: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IComment>("Comments", CommentSchema);
