import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay checkout script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      setScriptLoaded(true);
      console.log("Razorpay script loaded");
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay script");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      setScriptLoaded(false);
    };
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Update quantity or days with limits 1-30
  const updateCartItem = (id, field, value) => {
    if (value < 1 || value > 30) return;

    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove an item from cart
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total amount for all items (in rupees)
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.pricePerDay * item.days * item.quantity,
    0
  );

  // Razorpay payment handler
  const handlePayment = () => {
    if (!scriptLoaded) {
      alert("Payment gateway is loading. Please wait...");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const options = {
      key: "rzp_test_Big7cxagvzfBqR", // your Razorpay test key
      amount: totalAmount * 100, // amount in paise
      currency: "INR",
      name: "Trekking Gear Rental",
      description: "Payment for your gear rental",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // Clear cart after successful payment
        setCartItems([]);
        localStorage.removeItem("cart");
        navigate("/");
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#0d8aab",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Rental Cart</h2>
        <div className="cart-nav">
          <Link to="/trek/panel" className="cart-nav-btn">Continue Shopping</Link>
          <Link to="/" className="cart-nav-btn">Return to Home</Link>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <p>Visit our rental page to find high-quality trekking gear for your next adventure.</p>
          <Link to="/trek/panel" className="cart-button">Browse Rental Equipment</Link>
        </div>
      ) : (
        <div className="cart-list">
          <div className="cart-summary">
            <p>You have {cartItems.length} item(s) in your cart</p>
          </div>
          
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="item-price">₹{item.pricePerDay} / day</p>

                <div className="control-group">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateCartItem(item.id, "quantity", item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateCartItem(item.id, "quantity", item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="control-group">
                  <label>Rental Days:</label>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateCartItem(item.id, "days", item.days - 1)
                      }
                      aria-label="Decrease days"
                      disabled={item.days <= 1}
                    >
                      −
                    </button>
                    <span className="qty-display">{item.days}</span>
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateCartItem(item.id, "days", item.days + 1)
                      }
                      aria-label="Increase days"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="item-total">Total: ₹{item.pricePerDay * item.days * item.quantity}</p>
              </div>
              <button
                className="btn-danger"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="cart-checkout">
            <div className="checkout-summary">
              <div className="checkout-row">
                <span>Subtotal:</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="checkout-row">
                <span>Security Deposit:</span>
                <span>₹0</span>
              </div>
              <div className="checkout-row total">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
            
            <button className="btn-success" onClick={handlePayment}>
              Proceed to Payment
            </button>
            
            <div className="payment-info">
              <p>Secure payment powered by Razorpay</p>
              <p>You will be redirected to the payment gateway</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
