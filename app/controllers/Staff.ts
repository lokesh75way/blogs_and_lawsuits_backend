import { NextFunction, Request, Response } from "express";
import Admin, { AdminRole, IAdmin } from "../schema/Admin";
import { createResponse } from "../helper/response";
import createHttpError from "http-errors";
import { sendEmail, subadminInvitationEmailTemplate } from "../services/email";
import { generatePasswordToken } from "../services/passport-jwt";
import Permission from "../schema/Permission";

export const addStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    payload.email = payload.email.trim().toLocaleLowerCase();
    payload.password = "";

    const checkIfExist = await Admin.findOne({ email: payload.email });

    if (checkIfExist) {
      next(
        createHttpError(400, {
          message: `Staff Member already exist with this email!`,
        })
      );
      return;
    }

    const createSubadmin = await new Admin(payload).save();
    createSubadmin["password"] = "";

    const token = await generatePasswordToken(createSubadmin);
    const html = subadminInvitationEmailTemplate(token, payload.email);
    const send = sendEmail({
      to: payload.email,
      subject: "Registration For OnlyClassactions",
      html: html,
    });

    res.send(createResponse(createSubadmin, "Staff created successfully!"));
  } catch (error) {
    next(
      createHttpError(400, {
        message: error ?? "An error occurred.",
        data: { user: null },
      })
    );
    return;
  }
};

export const updateStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const condition = { _id: req.params.id };
    const options = { new: true };

    const updateData = await Admin.findOneAndUpdate(
      condition,
      payload,
      options
    ).select("-password");

    if (!updateData) {
      next(
        createHttpError(400, {
          message: `Failed to update staffadmin!`,
          data: { user: null },
        })
      );
      return;
    }
    return res.send(createResponse(updateData, `Staff updated successfully!`));
  } catch (error) {
    throw createHttpError(400, {
      message: error,
      data: { user: null },
    });
  }
};

export const deleteStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const condition = { _id: req.params.id };

    const updateData = await Admin.findOneAndDelete(condition, {
      is_deleted: true,
    }).select("-password");
    if (!updateData) {
      next(
        createHttpError(400, {
          message: `Failed to update staff!`,
          data: { user: null },
        })
      );
      return;
    }

    res.send(createResponse({}, `Staff updated successfully!`));
  } catch (error) {
    throw createHttpError(400, {
      message: error ?? "An error occurred.",
      data: { user: null },
    });
  }
};

export const getAllStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const condition = {
      is_deleted: false,
      role: AdminRole.STAFF,
    };
    const data = await Admin.find(condition)
      .select("_id email first_name last_name is_active created_at")
      .sort({
        createdAt: -1,
      });
    const count = await Admin.count(condition);

    res.send(createResponse({ data, count }, `Staff found successfully!`));
  } catch (error) {
    throw createHttpError(400, {
      message: error ?? "An error occurred.",
      data: { user: null },
    });
  }
};

export const addPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;

    const checkIfExist = await Permission.findOne({
      role: payload.role,
      endPoint: payload.endPoint,
      method: payload.method,
    });

    if (checkIfExist) {
      next(
        createHttpError(400, {
          message: `Permission already given!`,
        })
      );
      return;
    }

    const savePermission = await Permission.create(payload);

    res.send(createResponse(savePermission, "Permission given successfully!"));
  } catch (error) {
    next(
      createHttpError(400, {
        message: error ?? "An error occurred.",
        data: { user: null },
      })
    );
    return;
  }
};
