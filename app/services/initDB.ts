import mongoose from "mongoose";
import { createMockCategories } from "./category";

export const initDB = async (): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    const mongodbUri = process.env.MONGODB_URI ?? "";

    if (mongodbUri === "") throw new Error("mongod db uri not found!");
    // mongoose.set("debug", true);
    mongoose.set("strictQuery", false);
    mongoose
      .connect(mongodbUri)
      .then(async () => {
        console.log("DB Connected!");
        resolve(true);
      })
      .catch(reject);
  });
};
