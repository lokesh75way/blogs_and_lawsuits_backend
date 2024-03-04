import express from "express";
import passport from "passport";
import {
  adminLogin,
  changePassword,
  forgetPassword,
  resetPassword,
  subadminProfileSetup,
} from "../controllers/Admin";
import { catchError, validate } from "../middleware/validation";

const router = express.Router();

router.post(
  "/login",
  validate("admin:login"),
  catchError,
  passport.authenticate("login", { session: false }),
  adminLogin
);
router.put(
  "/change-password",
  validate("admin:password"),
  catchError,
  passport.authenticate("jwt", { session: false }),
  changePassword
);
router.put(
  "/profile-setup",
  validate("staff:profilesetup"),
  catchError,
  subadminProfileSetup
);
router.post(
  "/forgot-password",
  validate("admin:forgotpassword"),
  catchError,
  forgetPassword
);
router.put(
  "/reset-password",
  validate("admin:resetpassword"),
  catchError,
  resetPassword
);

export default router;
