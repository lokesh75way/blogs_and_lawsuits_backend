// import { getRandomArbitrary } from "../helper/number";
// import BlogAndLawsuit, { IBlog } from "../schema/Blog";
// import Category from "../schema/Category";

// const blogs_lawsuits = [
//   {
//     thumbnail:
//       "https://source.unsplash.com/random/100x100/?wallpaper,landscape",
//     url_slug: "roundup-class-action-lawsuit",
//     banner: "path/to/banner.jpg",
//     caption:
//       "Affected by Roundup? Learn how you could join the fight for justice and potentially receive financial relief.",
//     short_description: "Brief description of the blog post.",
//     description: "Detailed description of the blog post content.",
//     lawsuit: "5fbc2a65b341ea174c3be712",
//     likes_count: 10,
//     share_count: 5,
//     comments_count: 20,
//     category: "5fbc2a65b341ea174c3be713",
//     updated_by: "5fbc2a65b341ea174c3be714",
//     faq: ["5fbc2a65b341ea174c3be715", "5fbc2a65b341ea174c3be716"],
//     comments: ["5fbc2a65b341ea174c3be717", "5fbc2a65b341ea174c3be718"],
//   },
// ];

// type searchBlogsAndLawsuitsArgs = {
//   query: string;
//   limit?: number;
//   skip?: number;
// };

// // create mock data for blogs
// export const createMockBlogs = async () => {
//   const count = await BlogAndLawsuit.find({
//     type: IBlogAndLawsuitType.blog,
//   }).count();

//   if (count != 0) {
//     console.log("Skip mock data creation for blogs");
//     return;
//   }

//   const categories = await Category.find({});
//   const result = blogs_lawsuits.map((blog) => {
//     const index = getRandomArbitrary(0, categories.length);
//     const category = categories[index];
//     if (category) {
//       return {
//         ...blog,
//         category: category._id,
//         type: IBlogAndLawsuitType.blog,
//       };
//     }
//   });
//   await BlogAndLawsuit.insertMany(result);
// };

// // create mock data for lawsuits
// export const createMockLawsuits = async () => {
//   const count = await BlogAndLawsuit.find({
//     type: IBlogAndLawsuitType.lawSuit,
//   }).count();
//   if (count != 0) {
//     console.log("Skip mock data creation for lawsuit");
//     return;
//   }
//   const categories = await Category.find({});
//   const result = blogs_lawsuits.map((lawsuit) => {
//     const index = getRandomArbitrary(0, categories.length);
//     const category = categories[index];
//     if (category) {
//       return {
//         ...lawsuit,
//         category: category._id,
//         type: IBlogAndLawsuitType.lawSuit,
//       };
//     }
//   });
//   await BlogAndLawsuit.insertMany(result);
// };

// // search blogs and lawsuits by title
// export const searchBlogsAndLawsuits = async (
//   args: searchBlogsAndLawsuitsArgs
// ) => {
//   const { query, limit, skip } = args;

//   // search case insensitive
//   const where = {
//     title: { $regex: query, $options: "i" },
//   };

//   // select only required fields
//   const select = {
//     title: true,
//     thumbnail: true,
//     caption: true,
//     category: true,
//     type: true,
//   };

//   // get number of searched items (for pagination)
//   const count = await BlogAndLawsuit.find({}).where(where).count();

//   // search all items if pagination (skip and limit) are not provided to api
//   if (typeof limit == "undefined" || typeof skip == "undefined") {
//     const items = await BlogAndLawsuit.find({})
//       .where(where)
//       .populate("category")
//       .select(select)
//       .lean();
//     return { items, count };
//   }

//   // search with pagination
//   const items = await BlogAndLawsuit.find({})
//     .where(where)
//     .limit(limit)
//     .skip(skip)
//     .populate("category")
//     .select(select)
//     .lean();

//   return { items, count };
// };
