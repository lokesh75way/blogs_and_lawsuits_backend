import Category from "../schema/Category";

const categoriesLabels = [
  "Featured Settlements",
  "Defective Products",
  "Cancer Lawsuits",
  "Auto Lawsuits",
  "Workplace & Employment",
  "Personal Injury Lawsuits",
];

// create mock data for categories
export const createMockCategories = async () => {
  const count = await Category.find({}).count();
  if (count != 0) {
    console.log("Skip mock data creation for categories");
    return;
  }
  const categories = categoriesLabels.map((label) => {
    return { label };
  });
  const data = await Category.insertMany(categories);
};
