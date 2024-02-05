import express from "express";
import expressAsyncHandler from "express-async-handler";
import { createResponse } from "../helper/response";
import { catchError, validate } from "../middleware/validation";
import { searchBlogsAndLawsuits } from "../services/blog_lawsuit";

const router = express.Router();

router.get(
  "/search",
  validate("blogs:search"),
  catchError,
  expressAsyncHandler(async (req, res, next) => {
    const { query, skip: skipQP, limit: limitQP } = req.query;

    const skip =
      typeof skipQP != "undefined" ? parseInt(skipQP as string) : undefined;

    const limit =
      typeof limitQP != "undefined" ? parseInt(limitQP as string) : undefined;

    const result = await searchBlogsAndLawsuits({
      query: query as string,
      skip,
      limit,
    });

    res.send(createResponse(result));
  })
);

export default router;
