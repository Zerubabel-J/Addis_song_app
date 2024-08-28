const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const songRoutes = require("./src/routes/songRoutes");
const statisticsRoutes = require("./src/routes/statisticsRoutes");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API routes
app.use("/api", songRoutes);
// Add statistics API route
app.use("/api", statisticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
