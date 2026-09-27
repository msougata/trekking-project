import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import "./admin.css";

// Define backend API URL - keep in sync with Panel.js
const API_BASE_URL = "http://localhost:8080";

// Function to test server connectivity - same as in Panel.js
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

// Fallback mock data
const MOCK_ITEMS = [
  {
    id: 1,
    name: "Trekking Backpack (60L)",
    description: "Premium waterproof backpack with multiple compartments and adjustable straps.",
    pricePerDay: 150,
    images: JSON.stringify(["https://trekthehimalayas.com/wp-content/uploads/2022/09/backpack-rental.jpg"])
  },
  {
    id: 2,
    name: "Sleeping Bag (-10°C)",
    description: "Ultra-warm sleeping bag suitable for high-altitude treks.",
    pricePerDay: 120,
    images: JSON.stringify(["https://trekthehimalayas.com/wp-content/uploads/2022/09/sleeping-bag-rental.jpg"])
  }
];

const MOCK_RULES = [
  {
    id: 1,
    content: "Security deposit of 1000₹ is required for all rentals."
  },
  {
    id: 2,
    content: "Items must be returned in the same condition as rented."
  }
];

const Admin = () => {
  const { isAdmin, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    pricePerDay: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState("");
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  // Check if user is admin, redirect if not
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate("/trek/panel");
      alert("Access denied. Admin privileges required.");
    }
  }, [isAdmin, isLoading, navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data function with connectivity testing
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
      setRules(MOCK_RULES);
      setUseMockData(true);
      setLoading(false);
      return;
    }
    
    try {
      // Try to fetch gear items
      const itemsResponse = await axios.get(`${API_BASE_URL}/api/gears`);
      setItems(itemsResponse.data);
      
      // Try to fetch rules
      const rulesResponse = await axios.get(`${API_BASE_URL}/api/rules`);
      setRules(rulesResponse.data);
      
      setUseMockData(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Unable to fetch data from the server. Using demo data instead.");
      
      // Use mock data as fallback
      setItems(MOCK_ITEMS);
      setRules(MOCK_RULES);
      setUseMockData(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to retry connection to the backend
  const retryConnection = async () => {
    setLoading(true);
    await fetchData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const uploadImagesToImgBB = async () => {
    if (useMockData) {
      // In mock mode, return dummy URLs
      return ["https://trekthehimalayas.com/wp-content/uploads/2022/09/sample-gear.jpg"];
    }
    
    const urls = [];
    for (let file of selectedFiles) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData,
          {
            params: { key: "f8e7e9c2453fc3ac547397bd4c528ac9" },
          }
        );
        urls.push(res.data.data.url);
      } catch (err) {
        console.error("Error uploading image to ImgBB", err);
      }
    }
    return urls;
  };

  const handleAddGear = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const imageUrls = await uploadImagesToImgBB();

      const newGear = {
        name: form.name,
        description: form.description,
        pricePerDay: parseFloat(form.pricePerDay),
        images: JSON.stringify(imageUrls),
      };

      if (useMockData) {
        // In mock mode, just add to local state
        const mockId = Math.floor(Math.random() * 10000);
        const mockItem = { ...newGear, id: mockId };
        setItems([...items, mockItem]);
      } else {
        // Try to save to backend
        const response = await axios.post(`${API_BASE_URL}/api/gears`, newGear);
        setItems([...items, response.data]);
      }
      
      // Reset form
      setForm({ name: "", description: "", pricePerDay: "", images: [] });
      setSelectedFiles([]);
      alert("Gear added successfully!");
    } catch (error) {
      console.error("Error adding gear:", error);
      alert("Failed to add gear.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRule = async () => {
    if (!newRule.trim()) return;
    
    try {
      if (useMockData) {
        // In mock mode, just add to local state
        const mockId = Math.floor(Math.random() * 10000);
        const mockRule = { id: mockId, content: newRule };
        setRules([...rules, mockRule]);
      } else {
        // Try to save to backend
        const response = await axios.post(`${API_BASE_URL}/api/rules`, { content: newRule });
        setRules([...rules, response.data]);
      }
      
      setNewRule("");
    } catch (error) {
      console.error("Error adding rule:", error);
      alert("Failed to add rule.");
    }
  };

  const handleDeleteRule = async (id) => {
    try {
      if (useMockData) {
        // In mock mode, just update local state
        setRules(rules.filter((rule) => rule.id !== id));
      } else {
        // Try to delete from backend
        await axios.delete(`${API_BASE_URL}/api/rules/${id}`);
        setRules(rules.filter((rule) => rule.id !== id));
      }
    } catch (error) {
      console.error("Error deleting rule:", error);
      alert("Failed to delete rule.");
    }
  };

  const handleDeleteGear = async (id) => {
    if (window.confirm("Are you sure you want to delete this gear item?")) {
      try {
        if (useMockData) {
          // In mock mode, just update local state
          setItems(items.filter((gear) => gear.id !== id));
        } else {
          // Try to delete from backend
          await axios.delete(`${API_BASE_URL}/api/gears/${id}`);
          setItems(items.filter((gear) => gear.id !== id));
        }
        
        alert("Gear deleted successfully!");
      } catch (error) {
        console.error("Error deleting gear:", error);
        alert("Failed to delete gear.");
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel - Manage Rental Equipment</h2>
        <div className="admin-nav">
          <button className="admin-nav-btn" onClick={() => navigate("/trek/panel")}>
            Return to Rental Panel
          </button>
          <button className="admin-nav-btn" onClick={() => navigate("/")}>
            Return to Home
          </button>
        </div>
      </div>

      {error && (
        <div className="admin-alert">
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

      {useMockData && (
        <div className="admin-info-banner">
          <p>You are currently in demo mode. Changes will not persist after page reload.</p>
        </div>
      )}

      {loading ? (
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      ) : (
        <>
          <div className="admin-section">
            <h3>Add New Gear Item</h3>
            <form className="admin-form" onSubmit={handleAddGear}>
              <div className="form-group">
                <label>Item Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Trekking Pole, Sleeping Bag" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  placeholder="Detailed description of the item" 
                  value={form.description} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Price Per Day (₹)</label>
                <input 
                  type="number" 
                  name="pricePerDay" 
                  placeholder="e.g. 150" 
                  value={form.pricePerDay} 
                  onChange={handleChange} 
                  step="0.01" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Item Images</label>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
                <small>You can select multiple images</small>
              </div>
              
              <button type="submit" className="admin-submit-btn" disabled={loading}>
                {loading ? "Uploading..." : "Add Gear Item"}
              </button>
            </form>
          </div>

          <div className="admin-section">
            <h3>Current Inventory</h3>
            {items.length === 0 ? (
              <p>No gear items available. Add some using the form above.</p>
            ) : (
              <div className="admin-items-grid">
                {items.map((gear) => (
                  <div key={gear.id} className="admin-item">
                    <div className="admin-item-header">
                      <h4>{gear.name}</h4>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteGear(gear.id)}
                      >
                        Delete
                      </button>
                    </div>
                    <p className="price">₹{gear.pricePerDay}/day</p>
                    <p>{gear.description}</p>
                    <div className="images-info">
                      <small>
                        {gear.images && JSON.parse(gear.images).length > 0 
                          ? `${JSON.parse(gear.images).length} images uploaded` 
                          : "No images"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin-section">
            <h3>Manage Rental Rules & Regulations</h3>
            <div className="rules-form">
              <input
                type="text"
                value={newRule}
                placeholder="Enter new rule or regulation"
                onChange={(e) => setNewRule(e.target.value)}
              />
              <button className="admin-submit-btn" onClick={handleAddRule}>Add Rule</button>
            </div>

            {rules.length === 0 ? (
              <p>No rules defined yet. Add some using the form above.</p>
            ) : (
              <ul className="rules-list">
                {rules.map((rule, idx) => (
                  <li key={rule.id} className="rule-item">
                    <span className="rule-content">{idx + 1}. {rule.content}</span>
                    <button
                      className="delete-rule-btn"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
