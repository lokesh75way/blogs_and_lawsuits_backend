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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const response_1 = require("../helper/response");
const validation_1 = require("../middleware/validation");
const blog_lawsuit_1 = require("../services/blog_lawsuit");
const router = express_1.default.Router();
router.get("/search", (0, validation_1.validate)("blogs:search"), validation_1.catchError, (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, skip: skipQP, limit: limitQP } = req.query;
    const skip = typeof skipQP != "undefined" ? parseInt(skipQP) : undefined;
    const limit = typeof limitQP != "undefined" ? parseInt(limitQP) : undefined;
    const result = yield (0, blog_lawsuit_1.searchBlogsAndLawsuits)({
        query: query,
        skip,
        limit,
    });
    res.send((0, response_1.createResponse)(result));
})));
exports.default = router;
