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
export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id;
    const likePost = await Blog.findByIdAndUpdate(id, {
      $inc: { like_count: 1 },
    });
    if (likePost)
      res.send(createResponse(likePost, `Successfully Increased likes`));
  } catch (error) {
    next(
      createHttpError(500, {
        message: error ?? "An error occurred while liking blogs",
        data: { user: null },
      })
    );
    return;
  }
};
// export const aboutUs = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//    const aboutUs=
//   } catch (error) {
//     next(
//       createHttpError(500, {
//         message: error ?? "An error occurred while liking blogs",
//         data: { user: null },
//       })
//     );
//     return;
//   }
// };
