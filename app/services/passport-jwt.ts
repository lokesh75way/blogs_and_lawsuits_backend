import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import User, { type IUser } from "../schema/User";
import createError from "http-errors";
import Admin, { AdminRole, IAdmin } from "../schema/Admin";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const initPassport = (): void => {
  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET as string,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await Admin.findOne({ email }).select(
            "_id password is_deleted is_active email first_name last_name role"
          );
          if (user == null) {
            done(createError(401, "User not found!"), false);
            return;
          }

          if (user.is_deleted) {
            done(
              createError(
                401,
                "Your account has been deleted! Please contact admin"
              ),
              false
            );
            return;
          }

          if (!user.is_active) {
            done(
              createError(
                401,
                "Your account is inactive! Please contact admin"
              ),
              false
            );
            return;
          }

          const validate = await user.isValidPassword(password);
          if (!validate) {
            done(createError(401, "Invalid email or password"), false);
            return;
          }

          user["password"] = "";
          done(null, user, { message: "Logged in Successfully" });
        } catch (error: any) {
          done(createError(500, error.message));
        }
      }
    )
  );
};

export const generateToken = (user: any) => {
  const tokenData = {
    id: user._id,
    role: user?.role,
  };
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const token = jwt.sign({ user: tokenData }, jwtSecret);

  return {
    user,
    token,
  };
};

export const isSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  if (req.user.role == AdminRole.ADMIN) {
    next();
  }
  return res.status(401).send({
    success: false,
    message: "Unauthorize access",
  });
};

export const generatePasswordToken = (user: IAdmin) => {
  const tokenData = {
    id: user._id,
  };
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const token = jwt.sign({ user: tokenData }, jwtSecret);

  return token;
};

export const verifyPasswordToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  const verify = jwt.verify(token, jwtSecret);
  return verify;
};

export const isUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const user = await User.findOne({ _id: req.user.id });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "Unauthorize access",
    });
  }
  next();
};
