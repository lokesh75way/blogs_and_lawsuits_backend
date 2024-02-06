"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BlogAndLawsuitSchema = new Schema({
    title: { type: String, required: true },
    caption: { type: String, required: true },
    coverImage: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    publishedAt: { type: Date },
    likes: { type: [String] }, // need to store user's ids
    share: { type: [String] }, // need to store user's ids
    type: {
        type: String,
        enum: ["BLOG" /* IBlogAndLawsuitType.blog */, "LAWSUIT" /* IBlogAndLawsuitType.lawSuit */],
        default: "BLOG" /* IBlogAndLawsuitType.blog */,
    },
    category: { type: Schema.Types.ObjectId, ref: "category" },
}, { timestamps: true });
exports.default = mongoose_1.default.model("blog", BlogAndLawsuitSchema);
