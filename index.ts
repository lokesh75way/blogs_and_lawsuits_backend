import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import adminRoutes from "./app/routes/admin";
import blogRoutes from "./app/routes/blogs";
import lawSuitsBlog from "./app/routes/lawSuit";
import faqRoutes from "./app/routes/faq";
import userRoutes from "./app/routes/user";
import uploadFile from "./app/routes/upload";
import errorHandler from "./app/middleware/errorHandler";
import { initDB } from "./app/services/initDB";
import staffRoutes from "./app/routes/staff";
import { initPassport } from "./app/services/passport-jwt";
import passport from "passport";
import { roleAuth } from "./app/middleware/roleAuth";
import { AdminRole } from "./app/schema/Admin";
import { checkPermission } from "./app/middleware/permissions";

dotenv.config();

const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const initApp = async (): Promise<void> => {
  // init mongodb
  await initDB();

  //passport init
  initPassport();
  // set base path to /api
  app.use("/api", router);

  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });
  const adminAccess = [
    passport.authenticate("jwt", { session: false }),
    roleAuth(AdminRole.ADMIN, AdminRole.STAFF),
  ];
  // routes for admin
  router.use("/admin", adminRoutes);
  router.use("/staff", adminAccess, checkPermission, staffRoutes);
  router.use("/blogs", adminAccess, blogRoutes);
  router.use("/lawsuit", adminAccess, lawSuitsBlog);
  router.use("/upload", adminAccess, uploadFile);
  router.use("/faq", adminAccess, faqRoutes);

  //routes for user
  router.use("/user", userRoutes);
  // error handler
  app.use(errorHandler);

  http.createServer(app).listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
  });
};

void initApp();
