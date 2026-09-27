export const startRazorpayPayment = async ({ name, email, contact, onSuccess }) => {
  const price = document.getElementById("inr-price")?.innerText || "0";
  const amount = parseInt(price.replace(/[^\d]/g, "")) * 100;

  const options = {
    key: "rzp_test_Big7cxagvzfBqR", // key
    amount: amount,
    currency: "INR",
    name: "Your Trek Agency",
    description: "Trek Booking",
    order_id: "", // Leave blank if not using backend Razorpay order API
    handler: function (response) {
      onSuccess(response); // Callback to handle post-payment actions
    },
    prefill: {
      name,
      email,
      contact,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
