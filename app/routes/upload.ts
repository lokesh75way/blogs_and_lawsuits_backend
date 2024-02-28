import multer from "multer";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import createHttpError from "http-errors";
import { createResponse } from "../helper/response";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post(
  "/",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw createHttpError(400, "No file uploaded");
      }
      const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
      res.send(createResponse({ filePath }, "File uploaded successfully!"));
    } catch (error) {
      console.log("Error", error);
      next(error);
    }
  }
);

export default router;
