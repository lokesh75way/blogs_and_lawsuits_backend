import express from "express";
import { catchError, validate } from "../middleware/validation";
import {
  addPermission,
  addStaff,
  deleteStaff,
  getAllStaff,
  updateStaff,
} from "../controllers/Staff";
const router = express.Router();

router.post("/", validate("staff:add"), catchError, addStaff);
router.put("/:id", validate("staff:update"), catchError, updateStaff);
router.delete("/:id", deleteStaff);
router.get("/", getAllStaff);
router.post(
  "/permission",
  validate("staff:permission"),
  catchError,
  addPermission
);
//staff access ->routes
export default router;
