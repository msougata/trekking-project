import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { startRazorpayPayment } from "./utils/razorpayutil";
import { AuthContext } from "./contexts/AuthContext";
import "./Buy.css";

const Buy = ({ item, setCart }) => {
  const navigate = useNavigate();
  const { userProfile } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    contact: "",
  });

  // Pre-fill customer information from user profile when available
  useEffect(() => {
    if (userProfile) {
      setCustomerInfo({
        name: userProfile.name || "",
        email: userProfile.email || "",
        contact: userProfile.phone || "",
      });
    }
  }, [userProfile]);

  if (!item || item.length === 0) {
    return (
      <div className="buy-container text-center">
        <p>No items to buy.</p>
        <button 
          className="btn btn-primary mt-3" 
          onClick={() => navigate("/buy-panel")}
        >
          Browse Products
        </button>
      </div>
    );
  }

  const totalPrice = item.reduce((sum, product) => sum + product.price * product.quantity, 0);

  const handlePayment = () => {
    // Check if customer info is available
    if (!customerInfo.name || !customerInfo.email || !customerInfo.contact) {
      setPaymentError("Customer information is not available. Please log in or try again later.");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);
    
    // Create a hidden element to store the price for Razorpay
    const hiddenPriceElement = document.createElement("span");
    hiddenPriceElement.id = "inr-price";
    hiddenPriceElement.style.display = "none";
    hiddenPriceElement.innerText = totalPrice.toString();
    document.body.appendChild(hiddenPriceElement);
    
    try {
      startRazorpayPayment({
        name: customerInfo.name,
        email: customerInfo.email,
        contact: customerInfo.contact,
        onSuccess: (response) => {
          console.log("Payment successful", response);
          setPaymentSuccess(true);
          setCart([]);
          
          // Remove the hidden element
          document.body.removeChild(hiddenPriceElement);
          
          // Redirect to home after a delay
          setTimeout(() => {
            navigate("/buy-panel");
          }, 3000);
        }
      });
      
      // Set processing to false after Razorpay popup is shown
      setIsProcessing(false);
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("Payment initialization failed. Please try again.");
      setIsProcessing(false);
      
      // Remove the hidden element
      document.body.removeChild(hiddenPriceElement);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="buy-container text-center">
        <div className="payment-success">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
          <p>You will be redirected to the shop shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="buy-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Confirm Your Purchase</h1>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate("/buy-cart")}
          disabled={isProcessing}
        >
          ← Back to Cart
        </button>
      </div>
      
      <div className="card mb-4">
        <div className="card-header">
          <h3>Order Summary</h3>
        </div>
        <div className="card-body">
          <ul className="list-group mb-4">
            {item.map((product) => (
              <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold">{product.name}</span> 
                  <span className="text-muted ms-2">x {product.quantity}</span>
                </div>
                <span>₹{product.price * product.quantity}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-header">
          <h3>Payment Method</h3>
        </div>
        <div className="card-body">
          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" name="paymentMethod" id="razorpay" checked readOnly />
            <label className="form-check-label" htmlFor="razorpay">
              Razorpay (Credit/Debit Card, UPI, Netbanking)
            </label>
          </div>
          
          {paymentError && (
            <div className="alert alert-danger" role="alert">
              {paymentError}
            </div>
          )}
          
          <button 
            className="btn btn-primary w-100" 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${totalPrice}`}
          </button>
          
          <p className="text-muted mt-2 small">
            Your profile information will be used for payment processing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Buy;
