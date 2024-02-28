import { NextFunction, Request, Response } from "express";
import { createResponse } from "../helper/response";
import createHttpError from "http-errors";
import Blog, { IBlog } from "../schema/Blog";
import slugify from "slugify";
import Lawsuit from "../schema/Lawsuit";

export const getLawBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalLawBlogs = await Lawsuit.find({});
    res.send(
      createResponse(totalLawBlogs, `Total Blogs:${totalLawBlogs.length}`)
    );
  } catch (error) {
    next(
      createHttpError(400, {
        message: error ?? "An error occurred while getting  the blogs",
        data: { user: null },
      })
    );
    return;
  }
};

export const addLawBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, ...rest } = req.body;
    const url_slug = slugify(title, { lower: true });
    const createLawBlog = await Lawsuit.create({
      url_slug,
      ...rest,
    });
    res.send(createResponse(createLawBlog, "Blog created successfully!"));
  } catch (error) {
    next(
      createHttpError(400, {
        message: error ?? "An error occurred while addign the blog",
        data: { user: null },
      })
    );
    return;
  }
};
export const updateLawBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;
    const { title, ...rest } = req.body;
    const url_slug = slugify(title, { lower: true });

    const updateLawData = await Lawsuit.findByIdAndUpdate(
      _id,
      {
        url_slug,
        ...rest,
      },
      { new: true }
    );

    if (!updateLawData) {
      next(
        createHttpError(400, {
          message: `Blog not updated!`,
        })
      );
      return;
    }

    res.send(createResponse(updateLawData, "Blogs Updated successfully!"));
  } catch (error) {
    next(
      createHttpError(400, {
        message: error ?? "An error occurred while updating the blog",
        data: { user: null },
      })
    );
    return;
  }
};
export const deleteLawBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;
    const deleteLawData = await Lawsuit.findByIdAndDelete(_id);

    if (!deleteLawData) {
      return next(
        createHttpError(404, {
          message: `Blog not found or already deleted.`,
        })
      );
    }

    return res
      .status(200)
      .send(createResponse({}, "Blog deleted successfully!"));
  } catch (error) {
    console.error("Error deleting blog:", error);
    return next(
      createHttpError(500, {
        message: "An error occurred while deleting the blog.",
        data: { user: null },
      })
    );
  }
};
