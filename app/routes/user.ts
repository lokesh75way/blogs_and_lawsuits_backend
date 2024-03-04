import express from "express";
import passport from "passport";
import { getFeaturedBlogs, likePost } from "../controllers/User";

const router = express.Router();
router.get("/featured-blogs", getFeaturedBlogs);
router.post("/like-post", likePost);
// router.post("/about-us", aboutUs);

export default router;
