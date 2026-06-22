// Import mongoose — the library that lets us interact with MongoDB easily
const mongoose = require("mongoose");

// Define the schema — this is the "blueprint" for every dish document
// It tells MongoDB: "Each dish MUST have these fields with these types"
const dishSchema = new mongoose.Schema({
  // A unique string ID for each dish (e.g., "1", "2", "3")
  dishId: {
    type: String,
    required: true,
    unique: true, // No two dishes can have the same dishId
  },

  // The name of the dish (e.g., "Margherita Pizza")
  dishName: {
    type: String,
    required: true, // Every dish MUST have a name
  },

  // URL pointing to an image of the dish
  imageUrl: {
    type: String,
    required: true, // Every dish MUST have an image
  },

  // Whether the dish is published (visible) or not
  // Defaults to false — new dishes start as unpublished
  isPublished: {
    type: Boolean,
    default: false,
  },
});

// Create the model from our schema
// "Dish" → Mongoose will automatically create a collection called "dishes" in MongoDB
// (It lowercases and pluralizes the model name)
const Dish = mongoose.model("Dish", dishSchema);

// Export the model so other files (routes, seed) can use it
module.exports = Dish;
