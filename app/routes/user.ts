import express from "express";
import passport from "passport";
import { getFeaturedBlogs } from "../controllers/Featured";

const router = express.Router();
router.get(
  "/featured-blogs",
  passport.authenticate("jwt", { session: false }),
  getFeaturedBlogs
);
export default router;
