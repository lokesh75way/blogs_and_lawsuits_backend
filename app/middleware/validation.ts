import { type Response, type Request, type NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { check, validationResult } from "express-validator";
import createHttpError from "http-errors";

export const validate = (validationName: string) => {
  switch (validationName) {
    case "admin:login": {
      return [
        check("email")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("Email is required")
          .isEmail()
          .bail()
          .withMessage("Enter valid email"),
        check("password")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("Password is required"),
      ];
    }

    case "admin:password": {
      return [
        check("password")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("Current password is required"),
        check("newPassword")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("New password is required"),
      ];
    }

    case "staff:profilesetup": {
      return [
        check("name").notEmpty().bail().withMessage("Name is required"),
        check("password")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("Password is required"),
      ];
    }

    case "admin:forgotpassword": {
      return [
        check("email")
          .exists()
          .notEmpty()
          .bail()
          .withMessage("Email is required")
          .isEmail()
          .bail()
          .withMessage("Enter valid email"),
      ];
    }

    case "admin:resetpassword": {
      return [
        check("token")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("Token is required"),
        check("password")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("New password is required"),
      ];
    }

    case "staff:add": {
      return [
        check("email")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("Email is required")
          .isEmail()
          .bail()
          .withMessage("Enter valid email"),
      ];
    }
    case "staff:permission": {
      return [
        check("role")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("Role is required"),
        check("endPoint")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("EndPoint is required"),
        check("method")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("Method is required"),
      ];
    }

    case "staff:update": {
      return [
        check("email")
          .notEmpty()
          .bail()
          .withMessage("Email is required")
          .isEmail()
          .bail()
          .withMessage("Enter valid email"),
        check("name").notEmpty().bail().withMessage("Name is required"),
      ];
    }
    default:
      return [];
  }
};

export const catchError = expressAsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const isError = errors.isEmpty();
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!isError) {
      const data = { errors: errors.array() };
      throw createHttpError(400, {
        message: "User not authorized",
        data,
      });
    } else {
      next();
    }
  }
);
