import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';
import "./BuyPanel.css";

const BuyPanel = ({ products, cart, setCart, setBuyItem }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      return existing
        ? prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prevCart, { ...product, quantity: 1 }];
    });

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleBuyNow = (product) => {
    // When buying a single item directly, ensure it has a quantity property
    // The backend Product doesn't have 'quantity', but the cart/buy logic needs it.
    setBuyItem([{ ...product, quantity: 1 }]);
    navigate("/buy");
  };

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Ensure products is an array before mapping
  const productArray = Array.isArray(products) ? products : [];

  return (
    <div className="panel-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Shop Trekking Gear</h1>
        <div>
          {isAdmin && (
            <Link to="/buy-admin" className="btn btn-info me-2">
              Admin Panel
            </Link>
          )}
          <button 
            className="btn btn-outline-light position-relative" 
            onClick={() => navigate("/buy-cart")}
          >
            🛒 View Cart
            {cartItemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {productArray.length === 0 ? (
        <div className="text-center mt-5">
          <h3>No products available at the moment</h3>
          <p>Please check back later or contact support.</p>
        </div>
      ) : (
        <div className="row">
          {productArray.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card custom-card shadow-sm">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = `https://placehold.co/400x200/cccccc/000000?text=Image+Error`; // Placeholder image on error
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price}</p>
                  <button className="btn btn-warning me-2" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  <button className="btn btn-primary" onClick={() => handleBuyNow(product)}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showPopup && <div className="popup-notification">Item added to the cart ✅</div>}
    </div>
  );
};

export default BuyPanel;
