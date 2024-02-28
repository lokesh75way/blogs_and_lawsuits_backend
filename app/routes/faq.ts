import passport from "passport";
import express from "express";
import { addFaq, deleteFaq, getFaqs, updateFaq } from "../controllers/Faq";

const router = express.Router();
router.post("/", passport.authenticate("jwt", { session: false }), addFaq);
router.get("/", passport.authenticate("jwt", { session: false }), getFaqs);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteFaq
);

router.put("/:id", passport.authenticate("jwt", { session: false }), updateFaq);

export default router;
