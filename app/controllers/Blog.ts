import { NextFunction, Request, Response } from "express";
import { createResponse } from "../helper/response";
import createHttpError from "http-errors";
import Blog, { IBlog } from "../schema/Blog";
import slugify from "slugify";

export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalBlogs = await Blog.find({});
    res.send(createResponse(totalBlogs, `Total Blogs:${totalBlogs.length}`));
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

export const addBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, ...rest } = req.body;
    const url_slug = slugify(title, { lower: true });
    const createBlog: IBlog = await Blog.create({ ...rest, url_slug });
    res.send(createResponse(createBlog, "Blog created successfully!"));
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
export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;
    const { title, ...rest } = req.body;
    const url_slug = slugify(title, { lower: true });

    const updateData = await Blog.findByIdAndUpdate(
      _id,
      {
        url_slug,
        ...rest,
      },
      { new: true }
    );

    if (!updateData) {
      next(
        createHttpError(400, {
          message: `Blog not updated!`,
        })
      );
      return;
    }

    res.send(createResponse(updateData, "Blogs Updated successfully!"));
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
export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;
    const deleteData = await Blog.findByIdAndDelete(_id);

    if (!deleteData) {
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
