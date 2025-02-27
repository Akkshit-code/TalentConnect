import mongoose from "mongoose";

const url = process.env.MONGO_URL;

if (!url) {
  console.error("MONGO_URL is not defined in environment variables.");
  process.exit(1); 
}
mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("Error while creating MongoDB connection", err);
    process.exit(1); // Exit process if connection fails
  });