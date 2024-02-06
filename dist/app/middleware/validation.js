"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = exports.validate = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const validate = (validationName) => {
    switch (validationName) {
        case "blogs:search": {
            return [
                (0, express_validator_1.check)("query")
                    .exists()
                    .notEmpty()
                    .bail()
                    .withMessage("Search query is required"),
                (0, express_validator_1.check)("limit")
                    .optional({ checkFalsy: true })
                    .isNumeric()
                    .withMessage("Limit should be a valid number"),
                (0, express_validator_1.check)("skip")
                    .optional({ checkFalsy: true })
                    .isNumeric()
                    .withMessage("Skip should be a valid number"),
            ];
        }
        default:
            return [];
    }
};
exports.validate = validate;
exports.catchError = (0, express_async_handler_1.default)((req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const isError = errors.isEmpty();
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!isError) {
        const data = { errors: errors.array() };
        throw (0, http_errors_1.default)(400, {
            message: "Validation error!",
            data,
        });
    }
    else {
        next();
    }
});
