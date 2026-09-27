import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import "./BuyAdmin.css";

const BuyAdmin = ({ setProducts }) => {
  const { isAdmin, isLoading } = useContext(AuthContext);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [currentProducts, setCurrentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is admin, redirect if not
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate("/buy-panel");
      alert("Access denied. Admin privileges required.");
    }
  }, [isAdmin, isLoading, navigate]);

  // Fetch current products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios.get("http://localhost:8080/api/products")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCurrentProducts(res.data);
        } else {
          console.error("API response is not an array:", res.data);
          setCurrentProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!newItem.name || !newItem.price || !newItem.imageUrl) {
      alert("Please fill in Name, Price, and Image URL.");
      return;
    }

    // Convert price string to number before sending
    const productToSend = {
      ...newItem,
      price: parseFloat(newItem.price),
    };

    axios
      .post("http://localhost:8080/api/products", productToSend)
      .then((res) => {
        alert("Item added successfully!");
        // Fetch updated products list
        return axios.get("http://localhost:8080/api/products");
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCurrentProducts(res.data);
          setProducts(res.data);
        }
        setNewItem({ name: "", price: "", description: "", imageUrl: "" });
      })
      .catch((err) => {
        console.error("Error adding product:", err);
        alert("Failed to add product. Check console.");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:8080/api/products/${id}`)
        .then(() => {
          alert("Product deleted successfully!");
          // Update both local and App-level state
          const updatedProducts = currentProducts.filter(product => product.id !== id);
          setCurrentProducts(updatedProducts);
          setProducts(updatedProducts);
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
          alert("Failed to delete product. Check console.");
        });
    }
  };

  return (
    <div className="admin-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin Panel</h1>
        <button className="btn btn-secondary" onClick={() => navigate("/buy-panel")}>
          Back to Shop
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="m-0">Add New Product</h3>
        </div>
        <div className="card-body">
          <div className="form-group">
            <input
              className="form-control mb-2"
              name="name"
              placeholder="Name"
              value={newItem.name}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              name="price"
              placeholder="Price"
              value={newItem.price}
              onChange={handleChange}
              type="number"
              step="0.01"
            />
            <input
              className="form-control mb-2"
              name="imageUrl"
              placeholder="Image URL"
              value={newItem.imageUrl}
              onChange={handleChange}
            />
            <textarea
              className="form-control mb-2"
              name="description"
              placeholder="Description"
              value={newItem.description}
              onChange={handleChange}
              rows="3"
            />
            <button className="btn btn-primary" onClick={handleAdd}>
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-info text-white">
          <h3 className="m-0">Manage Products</h3>
        </div>
        <div className="card-body">
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : currentProducts.length === 0 ? (
            <p className="text-center">No products available.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/50x50/cccccc/000000?text=No+Image";
                          }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>₹{product.price}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyAdmin;