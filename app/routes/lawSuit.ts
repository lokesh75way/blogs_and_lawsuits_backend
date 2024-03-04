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
router.get("/", getLawBlogs);
router.post("/", validate("add:lawsuit"), addLawBlog);
router.put("/:id", validate("update:lawsuit"), updateLawBlog);
router.delete("/:id", deleteLawBlog);

export default router;
