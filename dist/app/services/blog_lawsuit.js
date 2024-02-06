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
exports.searchBlogsAndLawsuits = exports.createMockLawsuits = exports.createMockBlogs = void 0;
const number_1 = require("../helper/number");
const BlogAndLawsuit_1 = __importDefault(require("../schema/BlogAndLawsuit"));
const Category_1 = __importDefault(require("../schema/Category"));
const blogs_lawsuits = [
    {
        title: "Roundup Class Action Lawsuit: How to Seek Compensation for Your Injuries",
        caption: "Affected by Roundup? Learn how you could join the fight for justice and potentially receive financial relief.",
        likes: [],
        share: [],
        publishedAt: new Date(),
        coverImage: "https://source.unsplash.com/random/1280x800/?wallpaper,landscape",
        thumbnail: "https://source.unsplash.com/random/100x100/?wallpaper,landscape",
        description: `Roundup is one of the most well-known products on the market that kills weeds in your yard. The product uses a chemical called glyphosate, which is particularly toxic to plants that fall into the broadleaf grouping. This makes it a good option for killing weeds without harming the grass in your yard or other kinds of plants that you don’t want to kill.
    A company called Monsanto developed the product and helped to make it highly visible and commonly sold for this need. The company indicated that the product was not harmful to humans and did not expressly state that people using it or keeping it in their homes should handle it with caution.`,
    },
    {
        title: "Another Harmful Weed Killer? Paraquat's Toxic Chemical Lawsuit",
        caption: "“Did you develop Parkinson's disease after exposure to Paraquat? If so, you might be entitled to compensation.”",
        likes: [],
        share: [],
        publishedAt: new Date(),
        thumbnail: "https://source.unsplash.com/random/100x100/?wallpaper,landscape",
        coverImage: "https://source.unsplash.com/random/1280x800/?wallpaper,landscape",
        description: `Paraquat dichloride is a chemical compound that has been present in many herbicides since the 1950s. Those who work with this herbicide must be trained in the correct handling of it and certified for its use.
    Paraquat has been linked with a high incidence of Parkinson's Disease in those who have handled the chemical. Despite proper care and training in the use of this chemical compound, many people who have been exposed to it have suffered negative health effects. If you have worked with Paraquat in the past and have developed Parkinson's, you might be able to seek compensation.`,
    },
    {
        title: "Philips CPAP Class Action Recall Case: Can You Seek Compensation for Your Injuries?",
        caption: "“Have you used a Philips CPAP or BiPAP machine between 2009 and 2023? If so, you might be entitled to compensation.”",
        likes: [],
        share: [],
        publishedAt: new Date(),
        thumbnail: "https://source.unsplash.com/random/100x100/?wallpaper,landscape",
        coverImage: "https://source.unsplash.com/random/1280x800/?wallpaper,landscape",
        description: `If you used a Philips CPAP machine between 2009 and 2021, and you have developed a respiratory condition, have lung damage, or have developed cancer as a result of the faulty performance of the device, you could be entitled to compensation. Philips sleep apnea machines made during the period named in the class action cases spewed harmful gasses and foam particulate into the mouths and lungs of the people who used them. Those patients have since developed health conditions that led to a recall of the products in 2021.
    Fifty new cases are added to this class action lawsuit per month. Philips has set aside $15 million to pay out on claims and recalls related to the class action case. While millions of Philips CPAP machines were recalled, many people were not aware of the risks associated with the device that they were using to support healthy sleep.
    `,
    },
];
// create mock data for blogs
const createMockBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield BlogAndLawsuit_1.default.find({
        type: "BLOG" /* IBlogAndLawsuitType.blog */,
    }).count();
    if (count != 0) {
        console.log("Skip mock data creation for blogs");
        return;
    }
    const categories = yield Category_1.default.find({});
    const result = blogs_lawsuits.map((blog) => {
        const index = (0, number_1.getRandomArbitrary)(0, categories.length);
        const category = categories[index];
        if (category) {
            return Object.assign(Object.assign({}, blog), { category: category._id, type: "BLOG" /* IBlogAndLawsuitType.blog */ });
        }
    });
    yield BlogAndLawsuit_1.default.insertMany(result);
});
exports.createMockBlogs = createMockBlogs;
// create mock data for lawsuits
const createMockLawsuits = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield BlogAndLawsuit_1.default.find({
        type: "LAWSUIT" /* IBlogAndLawsuitType.lawSuit */,
    }).count();
    if (count != 0) {
        console.log("Skip mock data creation for lawsuit");
        return;
    }
    const categories = yield Category_1.default.find({});
    const result = blogs_lawsuits.map((lawsuit) => {
        const index = (0, number_1.getRandomArbitrary)(0, categories.length);
        const category = categories[index];
        if (category) {
            return Object.assign(Object.assign({}, lawsuit), { category: category._id, type: "LAWSUIT" /* IBlogAndLawsuitType.lawSuit */ });
        }
    });
    yield BlogAndLawsuit_1.default.insertMany(result);
});
exports.createMockLawsuits = createMockLawsuits;
// search blogs and lawsuits by title
const searchBlogsAndLawsuits = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, limit, skip } = args;
    // search case insensitive
    const where = {
        title: { $regex: query, $options: "i" },
    };
    // select only required fields
    const select = {
        title: true,
        thumbnail: true,
        caption: true,
        category: true,
        type: true,
    };
    // get number of searched items (for pagination)
    const count = yield BlogAndLawsuit_1.default.find({}).where(where).count();
    // search all items if pagination (skip and limit) are not provided to api
    if (typeof limit == "undefined" || typeof skip == "undefined") {
        const items = yield BlogAndLawsuit_1.default.find({})
            .where(where)
            .populate("category")
            .select(select)
            .lean();
        return { items, count };
    }
    // search with pagination
    const items = yield BlogAndLawsuit_1.default.find({})
        .where(where)
        .limit(limit)
        .skip(skip)
        .populate("category")
        .select(select)
        .lean();
    return { items, count };
});
exports.searchBlogsAndLawsuits = searchBlogsAndLawsuits;
