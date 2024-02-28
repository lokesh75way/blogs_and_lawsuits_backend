import mongoose, { Schema, Types } from "mongoose";
import { BaseSchema } from ".";
import { IBlog } from "./Blog";

interface IBlogStat extends BaseSchema {
  blog: Types.ObjectId | IBlog;
  date: Date;
  like_count: number;
  comment_count: number;
  share_count: number;
}

const BlogStatSchema = new Schema<IBlogStat>(
  {
    blog: { type: mongoose.Types.ObjectId, required: true, ref: "Blogs" },
    date: { type: Date, required: true },
    like_count: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    share_count: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IBlogStat>("BlogStats", BlogStatSchema);
