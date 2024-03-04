import passport from "passport";
import express from "express";
import { addFaq, deleteFaq, getFaqs, updateFaq } from "../controllers/Faq";
import { validate } from "../middleware/validation";

const router = express.Router();
router.post("/", validate("add:faq"), addFaq);
router.put("/:id", validate("update:faq"), updateFaq);
router.get("/", getFaqs);
router.delete("/:id", deleteFaq);

export default router;
