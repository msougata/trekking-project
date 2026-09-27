import React from "react";
import { useNavigate } from "react-router-dom";
import "./BuyCart.css";

const BuyCart = ({ cart, setBuyItem, setCart }) => {
  const navigate = useNavigate();

  const handleBuyAll = () => {
    setBuyItem(cart);
    navigate("/buy");
  };

  const handleRemoveItem = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Your Cart</h1>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate("/buy-panel")}
        >
          ← Continue Shopping
        </button>
      </div>
      
      {cart.length === 0 ? (
        <div className="text-center mt-5">
          <p className="mb-4">Your cart is empty.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate("/buy-panel")}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="quantity-control">
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end fw-bold">Total:</td>
                  <td colSpan="2" className="fw-bold">₹{totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-success" onClick={handleBuyAll}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BuyCart;
