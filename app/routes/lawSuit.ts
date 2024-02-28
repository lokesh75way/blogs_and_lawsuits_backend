import express from "express";
import { catchError, validate } from "../middleware/validation";
import passport from "passport";
import {
  addLawBlog,
  deleteLawBlog,
  getLawBlogs,
  updateLawBlog,
} from "../controllers/LawSuit";

const router = express.Router();

// router.post("/", validate("staff:add"), catchError, addStaff);
router.get("/", passport.authenticate("jwt", { session: false }), getLawBlogs);
router.post("/", passport.authenticate("jwt", { session: false }), addLawBlog);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateLawBlog
);
router.delete(
  "/:id",

  passport.authenticate("jwt", { session: false }),
  deleteLawBlog
);

export default router;
