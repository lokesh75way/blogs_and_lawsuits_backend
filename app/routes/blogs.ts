import express from "express";
import { catchError, validate } from "../middleware/validation";
import passport from "passport";
import { addBlog, deleteBlog, getBlogs, updateBlog } from "../controllers/Blog";

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), getBlogs);
router.post("/", passport.authenticate("jwt", { session: false }), addBlog);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateBlog
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteBlog
);

export default router;
