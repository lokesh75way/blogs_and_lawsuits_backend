import { Request, Response, NextFunction } from "express";
import Faq from "../schema/Faq";
import { createResponse } from "../helper/response";
import createHttpError from "http-errors";

export const getFaqs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getFaq = await Faq.find({});
    res.send(createResponse(getFaq, ""));
  } catch (error) {
    next(
      createHttpError(400, {
        message: error ?? "An error occurred while Getting the faq",
        data: { user: null },
      })
    );
    return;
  }
};

export const addFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { question, answer } = req.body;
    const createFaq = await Faq.create({
      question,
      answer,
    });
    res.send(createResponse(createFaq, "Faq created successfully!"));
  } catch (error) {
    next(
      createHttpError(400, {
        message: error ?? "An error occurred while adding the faq",
        data: { user: null },
      })
    );
    return;
  }
};
export const updateFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;
    const { question, answer } = req.body;
    const updateFaq = await Faq.findByIdAndUpdate(
      _id,
      {
        question,
        answer,
      },
      { new: true }
    );
    if (!updateFaq) {
      next(
        createHttpError(400, {
          message: `Faq not updated!`,
        })
      );
      return;
    }
    res.send(createResponse(updateFaq, "Faq created successfully!"));
  } catch (error) {
    next(
      createHttpError(400, {
        message: error ?? "An error occurred while Updating the faq",
        data: { user: null },
      })
    );
    return;
  }
};
export const deleteFaq = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;
    const updateFaq = await Faq.findByIdAndDelete(_id);
    if (!updateFaq) {
      next(
        createHttpError(400, {
          message: `Faq not Deleted!`,
        })
      );
      return;
    }
    res.send(createResponse(updateFaq, "Faq Deleted successfully!"));
  } catch (error) {
    next(
      createHttpError(400, {
        message: error ?? "An error occurred while Deleting the faq",
        data: { user: null },
      })
    );
    return;
  }
};
