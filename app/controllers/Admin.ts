import { NextFunction, Request, Response } from "express";
import Admin, { IAdmin } from "../schema/Admin";
import { createResponse } from "../helper/response";
import createHttpError from "http-errors";
import {
  generatePasswordToken,
  generateToken,
  verifyPasswordToken,
} from "../services/passport-jwt";
import bcrypt from "bcrypt";

import { forgetPasswordEmailTemplate, sendEmail } from "../services/email";

/**
 * Admin / SubAdmin login
 * @param { email, password } req.body
 * @param res
 */
export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IAdmin;
    const { user: userData, token } = await generateToken(user);
    const options = { new: true };

    const updateUserToken = await Admin.findByIdAndUpdate(
      { _id: user._id },
      { token: token },
      options
    );
    return res.send(
      createResponse({ user: userData, token }, "Admin login successfully!")
    );
  } catch (error) {
    throw createHttpError(400, {
      message: error ?? "An error occurred.",
      data: { user: null },
    });
  }
};

/**
 * Admin / SubAdmin change password
 * @param { password, newPassword} req.body
 * @param res
 */
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const id = req.user.id;
    const condition = { _id: id };
    const options = { new: true };

    const { password, newPassword } = req.body;

    const user = await Admin.findOne({ _id: id }).select("password");

    const validate = await user?.isValidPassword(password);
    if (!validate) {
      next(
        createHttpError(400, {
          message: `Current password did not match! Please try again.`,
          data: { user: null },
        })
      );
      return;
    }

    const hash = await bcrypt.hash(newPassword, 12);
    const updatePassword = await Admin.findOneAndUpdate(
      condition,
      { password: hash },
      options
    );

    return res.send(createResponse({}, "Password changes successfully!"));
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

/**
 * Subadmin profile setup by invitation link
 * @param { token, name, password } req.body
 * @param res
 */
export const subadminProfileSetup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, first_name, last_name, password, email, role } = req.body;
    const verify = verifyPasswordToken(token);
    if (!verify) {
      next(
        createHttpError(400, {
          message: `Invalid link or expired!`,
          data: { user: null },
        })
      );
      return;
    }

    // @ts-ignore
    const _id = verify.user.id;
    const options = { new: true };
    const hash = await bcrypt.hash(password, 12);

    const payload = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      role: role,
      password: hash,
    };

    const user = await Admin.findByIdAndUpdate(_id, payload, options);

    if (!user) {
      next(
        createHttpError(400, {
          message: `Failed to setup profile!`,
          data: { user: null },
        })
      );
      return;
    }

    return res.send(createResponse(user, `Profile setup successfully!`));
  } catch (error) {
    next(
      createHttpError(400, {
        message: error,
        data: { user: null },
      })
    );
    return;
  }
};

/**
 * Admin/SubAdmin forget password send link on email
 * @param { email } req
 * @param res
 */
export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await Admin.findOne({ email: email });
    if (!user) {
      next(
        createHttpError(400, {
          message: `Email does not exist! Please try again`,
        })
      );
      return;
    }

    const token = await generatePasswordToken(user);

    if (token) {
      const body = await forgetPasswordEmailTemplate(
        token,
        user.first_name ? user.first_name : user.email
      );
      const send = sendEmail({
        to: user.email,
        subject: "Password reset link",
        html: body,
      });
      return res.send(
        createResponse(
          {},
          `A password reset link send to your registered email`
        )
      );
    }
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

/**
 * Admin/SubAdmin password reset by reset link
 * @param { token, password } req
 * @param res
 */
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const verify = verifyPasswordToken(payload.token);

    if (!verify) {
      next(
        createHttpError(400, {
          message: `Invalid link or expired!`,
          data: { user: null },
        })
      );
      return;
    }

    // @ts-ignore
    const condition = { _id: verify.user.id };
    const options = { new: true };
    const hash = await bcrypt.hash(payload.password, 12);

    const updatePassword = await Admin.findOneAndUpdate(
      condition,
      { password: hash },
      options
    );

    if (!updatePassword) {
      next(
        createHttpError(400, {
          message: `Failed to set new password!`,
          data: { user: null },
        })
      );
      return;
    }

    return res.send(createResponse({}, `Password changed successfully!`));
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

/**
 * Admin/SubAdmin logged out
 * @param { token } req.heder
 * @param res
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const _id = req.user.id;
    const options = { new: true };

    const logoutUser = await Admin.findByIdAndUpdate(
      _id,
      { token: "" },
      options
    );

    return res.send(createResponse({}, `Logout successful!`));
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
