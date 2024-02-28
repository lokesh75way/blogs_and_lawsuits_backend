import mongoose, { Schema, Types } from "mongoose";
import { BaseSchema } from ".";
import { IComment } from "./Comment";

interface ICommentStat extends BaseSchema {
  comment: Types.ObjectId | IComment; // Reference to the comment
  date: Date;
  like_count: number;
  dislike_count: number;
}

const CommentStatSchema = new Schema<ICommentStat>(
  {
    comment: { type: mongoose.Types.ObjectId, required: true, ref: "Comments" },
    date: { type: Date, required: true },
    like_count: { type: Number, default: 0 },
    dislike_count: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ICommentStat>("CommentStats", CommentStatSchema);
