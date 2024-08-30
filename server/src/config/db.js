const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("Database connection error:", err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

// src/config/db.js

const { MongoClient, ServerApiVersion } = require("mongodb");

// Ensure MONGO_URI is being read from process.env
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MongoDB URI is not defined. Please check your .env file.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  // try {
  //   await client.connect();
  //   await client.db("admin").command({ ping: 1 });
  //   console.log("Connected successfully to MongoDB!");
  // } catch (error) {
  //   console.error("Error connecting to MongoDB:", error);
  //   process.exit(1);
  // }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // These options can be removed
      useUnifiedTopology: true, // These options can be removed
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB;
