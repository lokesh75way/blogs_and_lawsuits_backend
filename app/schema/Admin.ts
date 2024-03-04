import mongoose from "mongoose";
import { type BaseSchema } from "./index";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
export enum AdminRole {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
}
export interface IAdmin extends BaseSchema {
  first_name: string;
  last_name: string;
  email: string;
  role: AdminRole;
  is_active: boolean;
  is_deleted: boolean;
  password: string;
  isValidPassword: (password: string) => Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    password: { type: String, select: false },
    role: { type: String, enum: AdminRole, default: AdminRole.STAFF },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

AdminSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

// compare passwords
AdminSchema.methods.isValidPassword = async function (password: string) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};
export default mongoose.model<IAdmin>("Admins", AdminSchema);
