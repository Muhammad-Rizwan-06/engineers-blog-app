import mongoose from "mongoose";

const Connection = async () => {
  const URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/blog";

  try {
    mongoose.set('strictQuery', false); // Suppress deprecation warning
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connecting to the database:", error);
    process.exit(1); // Exit if DB connection fails
  }
};

export default Connection;
