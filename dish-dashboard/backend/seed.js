// Load environment variables from .env file (MONGO_URI, PORT, etc.)
const dotenv = require("dotenv");
dotenv.config();

// Import mongoose to connect to MongoDB
const mongoose = require("mongoose");

// Import our Dish model — we'll use it to insert data
const Dish = require("./models/Dish");

// The 5 sample dishes we want to insert into the database
const seedDishes = [
  {
    dishId: "1",
    dishName: "Margherita Pizza",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    isPublished: true,
  },
  {
    dishId: "2",
    dishName: "Pasta Carbonara",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/33/Fresh_made_pasta_carbonara.jpg",
    isPublished: false,
  },
  {
    dishId: "3",
    dishName: "Caesar Salad",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG",
    isPublished: true,
  },
  {
    dishId: "4",
    dishName: "Beef Burger",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
    isPublished: false,
  },
  {
    dishId: "5",
    dishName: "Sushi Platter",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/60/Sushi_platter.jpg",
    isPublished: true,
  },
];

// Main function to seed the database
const seedDB = async () => {
  try {
    // Step 1: Connect to MongoDB using the URI from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Step 2: Delete ALL existing dishes (clean slate)
    // This prevents duplicate data if you run the seed multiple times
    await Dish.deleteMany({});
    console.log("🗑️  Cleared existing dishes");

    // Step 3: Insert all 5 dishes at once using insertMany
    // insertMany is faster than inserting one by one
    await Dish.insertMany(seedDishes);
    console.log("🌱 Seeded 5 dishes successfully!");

    // Step 4: Disconnect from MongoDB — we're done
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");

    // Exit the script with success code
    process.exit(0);
  } catch (error) {
    // If anything goes wrong, log the error and exit with failure code
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDB();
