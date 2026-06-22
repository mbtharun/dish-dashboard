// Import Express and create a Router instance
// A Router is like a "mini-app" that handles a group of related routes
const express = require("express");
const router = express.Router();

// Import the Dish model to interact with the dishes collection
const Dish = require("../models/Dish");

// ============================================================
// ROUTE 1: GET /api/dishes
// Purpose: Fetch ALL dishes from the database
// Used by: Frontend to display the dish cards
// ============================================================
router.get("/", async (req, res) => {
  try {
    // find({}) with empty filter = get ALL documents
    // This returns an array of dish objects
    const dishes = await Dish.find({});
    // Send the dishes array as JSON with 200 (OK) status
    res.status(200).json(dishes);
  } catch (error) {
    // If database query fails, send a 500 (Server Error) response
    console.error("Error fetching dishes:", error.message);
    res.status(500).json({ error: "Failed to fetch dishes" });
  }
});

// ============================================================
// ROUTE 2: PATCH /api/dishes/:id/toggle
// Purpose: Toggle the isPublished field of a specific dish
// :id is a URL parameter — e.g., /api/dishes/1/toggle
// Used by: Frontend "Toggle Published" button
// ============================================================
router.patch("/:id/toggle", async (req, res) => {
  try {
    // Step 1: Find the dish by its dishId (from the URL parameter)
    const dish = await Dish.findOne({ dishId: req.params.id });

    // Step 2: If no dish found with that ID, send 404 (Not Found)
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    // Step 3: Flip the boolean — if it was true, make it false, and vice versa
    dish.isPublished = !dish.isPublished;

    // Step 4: Save the updated dish back to the database
    await dish.save();

    // Step 5: Send the updated dish back as confirmation
    res.status(200).json(dish);
  } catch (error) {
    // If anything fails, send a 500 error
    console.error("Error toggling dish:", error.message);
    res.status(500).json({ error: "Failed to toggle dish" });
  }
});

// Export the router so server.js can use it
module.exports = router;
