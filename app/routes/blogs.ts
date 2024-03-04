import express from "express";
import { catchError, validate } from "../middleware/validation";
import passport from "passport";
import { addBlog, deleteBlog, getBlogs, updateBlog } from "../controllers/Blog";

const router = express.Router();
//router.use(passport.authenticate)
router.get("/", getBlogs);
router.post("/", validate("add:blog"), addBlog);
router.put("/:id", validate("update:blog"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
