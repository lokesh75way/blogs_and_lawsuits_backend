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
    case "update:blog": {
      return [
        check("thumbnail")
          .notEmpty()
          .bail()
          .withMessage("thumbnail is required"),
        check("url_slug").notEmpty().bail().withMessage("url_slug is required"),
        check("banner").notEmpty().bail().withMessage("banner is required"),
        check("caption").notEmpty().bail().withMessage("caption is required"),
        check("short_description")
          .notEmpty()
          .bail()
          .withMessage("short description is required"),
        check("description")
          .notEmpty()
          .bail()
          .withMessage("description is required"),
        check("lawsuit").notEmpty().bail().withMessage("lawsuit is required"),
        check("like_count")
          .optional()
          .isInt()
          .withMessage("Like count must be an integer"),
        check("share_count")
          .optional()
          .isInt()
          .withMessage("Share count must be an integer"),
        check("comment_count")
          .optional()
          .isInt()
          .withMessage("Comment count must be an integer"),
        check("category").notEmpty().bail().withMessage("category is required"),
        check("faq.*")
          .optional()
          .isMongoId()
          .withMessage("FAQ IDs must be valid IDs"),
        check("comments.*")
          .optional()
          .isMongoId()
          .withMessage("Comment IDs must be valid IDs"),
      ];
    }
    case "add:blog": {
      return [
        check("thumbnail")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("thumbnail is required"),
        check("url_slug")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("url_slug is required"),
        check("banner")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("banner is required"),
        check("caption")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("caption is required"),
        check("short_description")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("short description is required"),
        check("description")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("description is required"),
        check("lawsuit")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("lawsuit is required"),
        check("like_count")
          .optional()
          .isInt()
          .withMessage("Like count must be an integer"),
        check("share_count")
          .optional()
          .isInt()
          .withMessage("Share count must be an integer"),
        check("comment_count")
          .optional()
          .isInt()
          .withMessage("Comment count must be an integer"),
        check("category")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("category is required"),
        check("faq.*")
          .optional()
          .isMongoId()
          .withMessage("FAQ IDs must be valid IDs"),
        check("comments.*")
          .optional()
          .isMongoId()
          .withMessage("Comment IDs must be valid IDs"),
      ];
    }
    case "add:lawsuit": {
      return [
        check("thumbnail")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("thumbnail is required"),
        check("url_slug")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("url_slug is required"),
        check("banner")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("banner is required"),
        check("caption")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("caption is required"),
        check("timelines.*")
          .optional()
          .isMongoId()
          .withMessage("Timeline IDs must be valid  IDs"),
        check("qualify_description")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("qualify_description is required"),
        check("lower_qualify_description")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("lower_qualify_description is required"),
        check("upper_qualify_description")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("upper_qualify_description is required"),
        check("category")
          .optional()
          .isMongoId()
          .withMessage("Category ID must be a valid  ID"),
        check("like_count")
          .optional()
          .isInt()
          .withMessage("Like count must be an integer"),
        check("share_count")
          .optional()
          .isInt()
          .withMessage("Share count must be an integer"),
        check("comment_count")
          .optional()
          .isInt()
          .withMessage("Comment count must be an integer"),
        check("updated_by")
          .optional()
          .isMongoId()
          .withMessage("Updated by ID must be a valid  ID"),
        check("faq.*")
          .optional()
          .isMongoId()
          .withMessage("FAQ IDs must be valid  IDs"),
        check("comments.*")
          .optional()
          .isMongoId()
          .withMessage("Comment IDs must be valid  IDs"),
      ];
    }
    case "update:lawsuit": {
      return [
        check("thumbnail")
          .notEmpty()
          .bail()
          .withMessage("thumbnail is required"),
        check("url_slug").notEmpty().bail().withMessage("url_slug is required"),
        check("banner").notEmpty().bail().withMessage("banner is required"),
        check("caption").notEmpty().bail().withMessage("caption is required"),
        check("timelines.*")
          .optional()
          .isMongoId()
          .withMessage("Timeline IDs must be valid  IDs"),
        check("qualify_description")
          .notEmpty()
          .bail()
          .withMessage("qualify_description is required"),
        check("lower_qualify_description")
          .notEmpty()
          .bail()
          .withMessage("lower_qualify_description is required"),
        check("upper_qualify_description")
          .notEmpty()
          .bail()
          .withMessage("upper_qualify_description is required"),
        check("category")
          .optional()
          .isMongoId()
          .withMessage("Category ID must be a valid  ID"),
        check("like_count")
          .optional()
          .isInt()
          .withMessage("Like count must be an integer"),
        check("share_count")
          .optional()
          .isInt()
          .withMessage("Share count must be an integer"),
        check("comment_count")
          .optional()
          .isInt()
          .withMessage("Comment count must be an integer"),
        check("updated_by")
          .optional()
          .isMongoId()
          .withMessage("Updated by ID must be a valid  ID"),
        check("faq.*")
          .optional()
          .isMongoId()
          .withMessage("FAQ IDs must be valid  IDs"),
        check("comments.*")
          .optional()
          .isMongoId()
          .withMessage("Comment IDs must be valid  IDs"),
      ];
    }
    case "add:faq": {
      return [
        check("question")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("question is required"),
        check("answer")
          .exists({ values: "falsy" })
          .notEmpty()
          .bail()
          .withMessage("answer is required"),
        check("updated_by")
          .optional()
          .isMongoId()
          .withMessage("Updated by ID must be a valid  ID"),
      ];
    }
    case "update:faq": {
      return [
        check("question").notEmpty().bail().withMessage("question is required"),
        check("answer").notEmpty().bail().withMessage("answer is required"),
        check("updated_by")
          .optional()
          .isMongoId()
          .withMessage("Updated by ID must be a valid  ID"),
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
