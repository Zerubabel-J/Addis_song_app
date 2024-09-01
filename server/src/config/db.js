const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MongoDB URI is not defined. Please check your .env file.");
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB;
