import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";
import { ICategory } from "./Category";
import { IUser } from "./User";
import { IFaq } from "./Faq";

const Schema = mongoose.Schema;

interface IBanner {
  background: string;
  title: string;
}
type IContent = [
  {
    title: {
      text: string;
      align: string;
    };
    images: {
      align: string;
      url: [string];
    };
    description: string;
  },
];

export interface IGenralContent extends BaseSchema {
  banner: IBanner;
  page: string;
  contents: IContent;
  faq: [Types.ObjectId | IFaq];
  updated_by: Types.ObjectId | IUser;
}

const GeneralContentSchema = new Schema<IGenralContent>(
  {
    banner: {
      background: { type: String, required: true },
      title: { type: String, required: true },
    },
    page: {
      type: String,
      required: true,
    },
    contents: [
      {
        title: {
          text: { type: String, required: true },
          align: { type: String, required: true },
        },
        images: {
          align: { type: String, required: true },
          url: [{ type: String, required: true }],
        },
        description: { type: String, required: true },
      },
    ],
    faq: [{ type: mongoose.Types.ObjectId, ref: "Faqs" }],
    updated_by: { type: mongoose.Types.ObjectId, ref: "Users" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IGenralContent>(
  "GenaralContents",
  GeneralContentSchema
);
