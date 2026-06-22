// ============================================================
// Load environment variables FIRST — before anything else
// This makes process.env.MONGO_URI and process.env.PORT available
// ============================================================
const dotenv = require("dotenv");
dotenv.config();

// Import required packages
const express = require("express"); // Web framework
const mongoose = require("mongoose"); // MongoDB ODM
const cors = require("cors"); // Cross-Origin Resource Sharing

// Import our routes
const dishRoutes = require("./routes/dishes");

// Create the Express application
const app = express();

// ============================================================
// MIDDLEWARE — runs on EVERY request before hitting routes
// ============================================================

// Enable CORS — allows our React frontend (different port) to make API calls
// Without this, the browser would block requests from localhost:5173 to localhost:5000
app.use(cors());

// Parse JSON request bodies — so we can read req.body in our routes
app.use(express.json());

// ============================================================
// MOUNT ROUTES
// Any request starting with "/api/dishes" will be handled by dishRoutes
// e.g., GET /api/dishes → dishRoutes handles "/"
// e.g., PATCH /api/dishes/1/toggle → dishRoutes handles "/:id/toggle"
// ============================================================
app.use("/api/dishes", dishRoutes);

// A simple root route — useful to check if the server is running
app.get("/", (req, res) => {
  res.json({ message: "Dish Dashboard API is running! 🍽️" });
});

// ============================================================
// CONNECT TO MONGODB AND START THE SERVER
// ============================================================
const PORT = process.env.PORT || 5000; // Use port from .env, or default to 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // MongoDB connected successfully — NOW start the Express server
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // If MongoDB connection fails, log the error and DON'T start the server
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  });
