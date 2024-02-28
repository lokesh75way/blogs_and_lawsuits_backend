import mongoose, { Types } from "mongoose";
import { type BaseSchema } from "./index";
import { IUser } from "./User";
import { ILawSuit } from "./Lawsuit";

const Schema = mongoose.Schema;

export interface ILawSuitsSignup extends BaseSchema {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  lawsuits_id: Types.ObjectId | ILawSuit;
}

const LawsuitSignupSchema = new Schema<ILawSuitsSignup>(
  {
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    lawsuits_id: { type: mongoose.Types.ObjectId, ref: "Lawsuits" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ILawSuitsSignup>(
  "LawsuitsSignup",
  LawsuitSignupSchema
);
