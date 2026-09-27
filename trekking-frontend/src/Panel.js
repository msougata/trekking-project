import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./panel.css";
import { AuthContext } from "./contexts/AuthContext";

// Fallback data in case the API is not available
const MOCK_ITEMS = [
  {
    id: 1,
    name: "Trekking Backpack (60L)",
    description: "Premium waterproof backpack with multiple compartments and adjustable straps for comfort on long treks.",
    pricePerDay: 150,
    images: JSON.stringify([
      "https://trekthehimalayas.com/wp-content/uploads/2022/09/backpack-rental.jpg",
      "https://trekthehimalayas.com/wp-content/uploads/2022/09/backpack-detail.jpg"
    ])
  },
  {
    id: 2,
    name: "Sleeping Bag (-10°C)",
    description: "Ultra-warm sleeping bag suitable for high-altitude treks with temperature rating down to -10°C.",
    pricePerDay: 120,
    images: JSON.stringify([
      "https://trekthehimalayas.com/wp-content/uploads/2022/09/sleeping-bag-rental.jpg"
    ])
  },
  {
    id: 3,
    name: "Trekking Poles (Pair)",
    description: "Adjustable aluminum trekking poles with anti-shock system and comfortable grip handles.",
    pricePerDay: 80,
    images: JSON.stringify([
      "https://trekthehimalayas.com/wp-content/uploads/2022/09/trekking-poles-rental.jpg"
    ])
  },
  {
    id: 4,
    name: "Waterproof Tent (2-Person)",
    description: "Lightweight, easy-to-setup tent with rainfly, perfect for two trekkers in mountain conditions.",
    pricePerDay: 200,
    images: JSON.stringify([
      "https://trekthehimalayas.com/wp-content/uploads/2022/09/tent-rental.jpg"
    ])
  }
];

const MOCK_RULES = [
  {
    id: 1,
    content: "Security deposit of 1000₹ is required for all rentals and will be refunded upon return of undamaged equipment."
  },
  {
    id: 2,
    content: "Items must be returned in the same condition as rented. Cleaning fee applies for dirty equipment."
  },
  {
    id: 3,
    content: "Late returns will incur additional daily charges at the standard rate."
  },
  {
    id: 4,
    content: "Identification proof is required for all rentals."
  }
];

// Define backend API URL
const API_BASE_URL = "http://localhost:8080";

// Function to test server connectivity
const testServerConnectivity = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/health`, { timeout: 5000 });
    console.log("Server health check response:", response.data);
    return { success: true, message: "Connected to server successfully" };
  } catch (error) {
    console.error("Server connectivity test failed:", error);
    
    // Check if it's a network error
    if (error.message === "Network Error") {
      return { 
        success: false, 
        message: "Network error. The server might be down or not reachable.",
        error: error 
      };
    }
    
    // Check if it's a timeout
    if (error.code === "ECONNABORTED") {
      return { 
        success: false, 
        message: "Connection timed out. The server might be slow or not responding.",
        error: error 
      };
    }
    
    // Other errors
    return { 
      success: false, 
      message: `Error connecting to server: ${error.message}`,
      error: error 
    };
  }
};

const Panel = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [rules, setRules] = useState([]);
  const [rentalDays, setRentalDays] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  useEffect(() => {
    // Function to fetch data with error handling
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      // Test server connectivity first
      const connectivityTest = await testServerConnectivity();
      setConnectionStatus(connectivityTest);
      
      if (!connectivityTest.success) {
        console.error("Backend connectivity test failed:", connectivityTest.message);
        setError(`Unable to connect to the server: ${connectivityTest.message}. Using demo data instead.`);
        
        // Use mock data as fallback
        setItems(MOCK_ITEMS);
        const daysInit = {};
        MOCK_ITEMS.forEach((item) => (daysInit[item.id] = 1));
        setRentalDays(daysInit);
        setRules(MOCK_RULES);
        
        setUseMockData(true);
        setLoading(false);
        return;
      }
      
      try {
        // Try to fetch gear items
        const itemsResponse = await axios.get(`${API_BASE_URL}/api/gears`);
        setItems(itemsResponse.data);
        
        // Initialize rental days
        const daysInit = {};
        itemsResponse.data.forEach((item) => (daysInit[item.id] = 1));
        setRentalDays(daysInit);
        
        // Try to fetch rules
        const rulesResponse = await axios.get(`${API_BASE_URL}/api/rules`);
        setRules(rulesResponse.data);
        
        setUseMockData(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Unable to fetch data from the server. Using demo data instead.");
        
        // Use mock data as fallback
        setItems(MOCK_ITEMS);
        const daysInit = {};
        MOCK_ITEMS.forEach((item) => (daysInit[item.id] = 1));
        setRentalDays(daysInit);
        setRules(MOCK_RULES);
        
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Function to retry connection to the backend
  const retryConnection = async () => {
    setLoading(true);
    await fetchData();
  };

  const handleDayChange = (id, value) => {
    const val = parseInt(value, 10);
    if (val >= 1 && val <= 30) {
      setRentalDays((prev) => ({ ...prev, [id]: val }));
    }
  };

  // Add gear item to cart in localStorage
  const addToCart = (item) => {
    const days = rentalDays[item.id] || 1;

    // Get current cart or empty array
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists in cart
    const existingIndex = currentCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingIndex !== -1) {
      // If exists, increment quantity by 1 but keep days from input or existing
      currentCart[existingIndex].quantity += 1;
      currentCart[existingIndex].days = days;
    } else {
      // If not exists, add new with quantity and days
      currentCart.push({
        id: item.id,
        name: item.name,
        pricePerDay: item.pricePerDay,
        quantity: 1,
        days: days,
      });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    alert(`${item.name} added to cart.`);
  };

  // Separate fetch data function for retry
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    // Test server connectivity first
    const connectivityTest = await testServerConnectivity();
    setConnectionStatus(connectivityTest);
    
    if (!connectivityTest.success) {
      console.error("Backend connectivity test failed:", connectivityTest.message);
      setError(`Unable to connect to the server: ${connectivityTest.message}. Using demo data instead.`);
      
      // Use mock data as fallback
      setItems(MOCK_ITEMS);
      const daysInit = {};
      MOCK_ITEMS.forEach((item) => (daysInit[item.id] = 1));
      setRentalDays(daysInit);
      setRules(MOCK_RULES);
      
      setUseMockData(true);
      setLoading(false);
      return;
    }
    
    try {
      // Try to fetch gear items
      const itemsResponse = await axios.get(`${API_BASE_URL}/api/gears`);
      setItems(itemsResponse.data);
      
      // Initialize rental days
      const daysInit = {};
      itemsResponse.data.forEach((item) => (daysInit[item.id] = 1));
      setRentalDays(daysInit);
      
      // Try to fetch rules
      const rulesResponse = await axios.get(`${API_BASE_URL}/api/rules`);
      setRules(rulesResponse.data);
      
      setUseMockData(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Unable to fetch data from the server. Using demo data instead.");
      
      // Use mock data as fallback
      setItems(MOCK_ITEMS);
      const daysInit = {};
      MOCK_ITEMS.forEach((item) => (daysInit[item.id] = 1));
      setRentalDays(daysInit);
      setRules(MOCK_RULES);
      
      setUseMockData(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel-page">
      <div className="panel-body">
        <div className="panel-header d-flex justify-content-between align-items-center mb-4">
          <h1 className="panel-title">Rent Your Trekking Gear</h1>
          <div>
            {isAdmin && (
              <button className="btn btn-dark me-2" onClick={() => navigate("/admin")}>
                Admin Panel
              </button>
            )}
            <button className="btn btn-dark" onClick={() => navigate("/cart")}>
              View Cart
            </button>
            <Link to="/" className="btn btn-dark ms-2">
              Return to Home
            </Link>
          </div>
        </div>

        {error && (
          <div className="alert alert-info mb-4">
            <strong>Note:</strong> {error}
            <button 
              className="btn btn-sm btn-outline-info ms-3" 
              onClick={retryConnection}
              disabled={loading}
            >
              {loading ? "Trying..." : "Retry Connection"}
            </button>
            {connectionStatus && !connectionStatus.success && (
              <div className="mt-2 small">
                <strong>Diagnostic:</strong> {connectionStatus.message}
              </div>
            )}
          </div>
        )}

        <p className="rental-intro">
          Browse our premium selection of trekking gear available for rent. 
          Select the number of days you need each item and add to your cart.
        </p>
        
        {loading ? (
          <div className="loading-container">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-light">Loading gear items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="no-items-message">
            <p>No gear items available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="row">
            {items.map((item) => {
              let images = [];
              try {
                images = JSON.parse(item.images || "[]");
              } catch (e) {
                console.error("Invalid image format:", item.images);
              }
              const days = rentalDays[item.id] || 1;
              const total = days * item.pricePerDay;

              return (
                <div key={item.id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div id={`carousel-${item.id}`} className="carousel slide" data-bs-ride="carousel">
                      <div className="carousel-inner">
                        {images.length > 0 ? (
                          images.map((img, idx) => (
                            <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                              <img
                                src={img}
                                className="d-block w-100"
                                alt={`${item.name} view ${idx + 1}`}
                                style={{ height: 200, objectFit: "cover" }}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="carousel-item active">
                            <div className="placeholder-image" style={{ height: 200 }}>
                              <span>No image available</span>
                            </div>
                          </div>
                        )}
                      </div>
                      {images.length > 1 && (
                        <>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carousel-${item.id}`}
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carousel-${item.id}`}
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.name}</h5>
                      <p>{item.description}</p>
                      <p className="price">₹{item.pricePerDay}/day</p>
                      <label>Rental Period (days):</label>
                      <input
                        type="number"
                        value={days}
                        min="1"
                        max="30"
                        className="form-control mb-2"
                        onChange={(e) => handleDayChange(item.id, e.target.value)}
                      />
                      <p className="fw-bold">Total: ₹{total}</p>
                      <button
                        className="btn btn-primary mt-auto"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <footer className="mt-5 border-top pt-4 pb-3">
          <h4>Rental Rules & Regulations</h4>
          {useMockData && (
            <div className="demo-note mb-3">
              <small>* These are example rules for demonstration purposes.</small>
            </div>
          )}
          {rules.length > 0 ? (
            <ul>
              {rules.map((rule, idx) => (
                <li key={idx}>
                  {idx + 1}. {rule.content}
                </li>
              ))}
            </ul>
          ) : (
            <p>No rental rules available at the moment.</p>
          )}
          <p>© 2023 TrekGear Rental. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Panel;
