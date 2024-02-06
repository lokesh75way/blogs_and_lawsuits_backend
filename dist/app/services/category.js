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
exports.createMockCategories = void 0;
const Category_1 = __importDefault(require("../schema/Category"));
const categoriesLabels = [
    "Featured Settlements",
    "Defective Products",
    "Cancer Lawsuits",
    "Auto Lawsuits",
    "Workplace & Employment",
    "Personal Injury Lawsuits",
];
// create mock data for categories
const createMockCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield Category_1.default.find({}).count();
    if (count != 0) {
        console.log("Skip mock data creation for categories");
        return;
    }
    const categories = categoriesLabels.map((label) => {
        return { label };
    });
    const data = yield Category_1.default.insertMany(categories);
});
exports.createMockCategories = createMockCategories;
