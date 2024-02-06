"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("./app/middleware/errorHandler"));
const initDB_1 = require("./app/services/initDB");
const blogs_1 = __importDefault(require("./app/routes/blogs"));
dotenv_1.default.config();
const port = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 5000;
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
const initApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // init mongodb
    yield (0, initDB_1.initDB)();
    // set base path to /api
    app.use("/api", router);
    app.get("/", (req, res) => {
        res.send({ status: "ok" });
    });
    // routes for blogs
    router.use("/blogs", blogs_1.default);
    // error handler
    app.use(errorHandler_1.default);
    http_1.default.createServer(app).listen(port, () => {
        console.log(`App is running on http://localhost:${port}`);
    });
});
void initApp();
