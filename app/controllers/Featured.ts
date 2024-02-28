import { NextFunction, Request, Response } from "express";
import { createResponse } from "../helper/response";
import createHttpError from "http-errors";
import Blog, { IBlog } from "../schema/Blog";
import Lawsuit, { ILawSuit } from "../schema/Lawsuit";

export const getFeaturedBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.query.category;
    const limit = parseInt(req.query.limit as string) || 6;
    let featuredItems: (IBlog | ILawSuit)[] = [];
    if (category === "Blog") {
      featuredItems = await Blog.aggregate([
        { $sort: { like_count: -1 } },
        { $limit: limit },
      ]);
    } else if (category === "Lawsuit") {
      featuredItems = await Lawsuit.aggregate([
        { $sort: { like_count: -1 } },
        { $limit: limit },
      ]);
    } else {
      next(
        createHttpError(400, {
          message: "Invalid category provided",
          data: { user: null },
        })
      );
    }
    res.send(
      createResponse(featuredItems, `Successfully found featured blogs`)
    );
  } catch (error) {
    next(
      createHttpError(500, {
        message: error ?? "An error occurred while getting  featured blogs",
        data: { user: null },
      })
    );
    return;
  }
};
