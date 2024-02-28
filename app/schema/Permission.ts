import mongoose, { type Types } from "mongoose";
import { type BaseSchema } from "./index";
import { IUser } from "./User";

const Schema = mongoose.Schema;

export interface IPermission extends BaseSchema {
  userId: Types.ObjectId | IUser;
  role: string;
  endPoint: string;
  method: string;
}

const PermissionSchema = new Schema<IPermission>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
    },
    role: {
      type: String,
    },
    endPoint: {
      type: String,
    },
    method: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPermission>("permission", PermissionSchema);
