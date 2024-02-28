import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { type IAdmin, AdminRole } from "../schema/Admin";
import createHttpError from "http-errors";

export const roleAuth = (...roles: AdminRole[]): any =>
  expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as IAdmin;
      if (user.role == null || !Object.values(AdminRole).includes(user.role)) {
        throw createHttpError(401, { message: "Invalid user role" });
      }
      if (!roles.includes(user.role)) {
        const type =
          user.role.slice(0, 1) + user.role.slice(1).toLocaleLowerCase();

        throw createHttpError(401, {
          message: `${type} can not access this resource`,
        });
      }
      next();
    }
  );
