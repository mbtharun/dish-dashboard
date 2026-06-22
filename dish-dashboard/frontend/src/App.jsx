// Import React hooks for state management and side effects
import { useState, useEffect } from "react";

// Import axios — our HTTP client for making API calls
import axios from "axios";

// Import our styles
import "./App.css";

// Base URL for our backend API
// In development, our Express server runs on port 5000
const API_URL = "http://localhost:5000/api/dishes";

function App() {
  // ============================================================
  // STATE — the data our component tracks and reacts to
  // ============================================================

  // Array of dish objects from the backend
  const [dishes, setDishes] = useState([]);

  // Loading state — true while fetching data for the first time
  const [loading, setLoading] = useState(true);

  // Error state — stores error message if API call fails
  const [error, setError] = useState(null);

  // ============================================================
  // FETCH DISHES — gets all dishes from our backend API
  // ============================================================
  const fetchDishes = async () => {
    try {
      // GET request to /api/dishes — returns array of dish objects
      const response = await axios.get(API_URL);
      // Update state with the fetched dishes
      setDishes(response.data);
      // Clear any previous errors
      setError(null);
    } catch (err) {
      console.error("Error fetching dishes:", err.message);
      setError("Failed to connect to the server. Is the backend running?");
    } finally {
      // Whether success or failure, we're done loading
      setLoading(false);
    }
  };

  // ============================================================
  // TOGGLE PUBLISHED — flips isPublished for a specific dish
  // ============================================================
  const togglePublished = async (dishId) => {
    try {
      // PATCH request to /api/dishes/:id/toggle
      const response = await axios.patch(`${API_URL}/${dishId}/toggle`);

      // Update the local state immediately (no need to re-fetch all dishes)
      // We map through dishes and replace the one that was toggled
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === dishId ? response.data : dish
        )
      );
    } catch (err) {
      console.error("Error toggling dish:", err.message);
      alert("Failed to toggle dish. Please try again.");
    }
  };

  // ============================================================
  // EFFECTS — run code when the component mounts
  // ============================================================
  useEffect(() => {
    // Fetch dishes immediately when the app loads
    fetchDishes();

    // Set up polling — fetch dishes every 3 seconds
    // This gives us "real-time" updates: if someone changes data
    // directly in MongoDB, the UI will pick it up within 3 seconds
    const interval = setInterval(fetchDishes, 3000);

    // Cleanup — stop polling when the component unmounts
    // This prevents memory leaks
    return () => clearInterval(interval);
  }, []); // Empty dependency array = run only once on mount

  // ============================================================
  // RENDER — what the user sees
  // ============================================================

  // Show loading spinner on first load
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dishes...</p>
      </div>
    );
  }

  // Show error message if API call failed
  if (error) {
    return (
      <div className="error-container">
        <p>⚠️ {error}</p>
        <button className="retry-btn" onClick={fetchDishes}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      {/* ---- HEADER ---- */}
      <header className="dashboard-header">
        <h1>🍽️ Dish Dashboard</h1>
        <p>Manage your restaurant menu in real-time</p>
        {/* Live indicator shows that polling is active */}
        <div className="live-indicator">
          <span className="live-dot"></span>
          Live — updates every 3s
        </div>
      </header>

      {/* ---- DISH CARDS GRID ---- */}
      <main className="dishes-grid">
        {dishes.map((dish) => (
          <div className="dish-card" key={dish.dishId}>
            {/* Dish image */}
            <img
              className="dish-card-image"
              src={dish.imageUrl}
              alt={dish.dishName}
              // If image fails to load, show a placeholder gradient
              onError={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #667eea, #764ba2)";
                e.target.style.minHeight = "200px";
              }}
            />

            {/* Card body — name, status, toggle button */}
            <div className="dish-card-body">
              <h3>{dish.dishName}</h3>

              {/* Status badge — green for published, amber for unpublished */}
              <div
                className={`status-badge ${
                  dish.isPublished ? "published" : "unpublished"
                }`}
              >
                <span className="status-dot"></span>
                {dish.isPublished ? "Published" : "Unpublished"}
              </div>

              {/* Toggle button — calls our PATCH API endpoint */}
              <button
                className={`toggle-btn ${
                  dish.isPublished ? "is-published" : "is-unpublished"
                }`}
                onClick={() => togglePublished(dish.dishId)}
              >
                {dish.isPublished ? "⬇ Unpublish" : "⬆ Publish"}
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
