import { type Response, type Request, type NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { check, validationResult } from "express-validator";
import createHttpError from "http-errors";

export const validate = (validationName: string): any[] => {
  switch (validationName) {
    case "blogs:search": {
      return [
        check("query")
          .exists()
          .notEmpty()
          .bail()
          .withMessage("Search query is required"),
        check("limit")
          .optional({ checkFalsy: true })
          .isNumeric()
          .withMessage("Limit should be a valid number"),
        check("skip")
          .optional({ checkFalsy: true })
          .isNumeric()
          .withMessage("Skip should be a valid number"),
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
        message: "Validation error!",
        data,
      });
    } else {
      next();
    }
  }
);
