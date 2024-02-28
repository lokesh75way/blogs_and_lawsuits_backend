import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";
import { IUser } from "./User";
import { IBlog } from "./Blog";
import { ILawSuit } from "./Lawsuit";
import { IGenralContent } from "./GeneralContent";

const Schema = mongoose.Schema;

export interface IAnalytics extends BaseSchema {
  user_id: Types.ObjectId | IUser;
  blog_id: Types.ObjectId | IBlog;
  lawsuit_id: Types.ObjectId | ILawSuit;
  general_content_id: Types.ObjectId | IGenralContent;
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "Users" },
    blog_id: { type: mongoose.Types.ObjectId, ref: "Blogs" },
    lawsuit_id: { type: mongoose.Types.ObjectId, ref: "Lawsuits" },
    general_content_id: {
      type: mongoose.Types.ObjectId,
      ref: "GenaralContents",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);
