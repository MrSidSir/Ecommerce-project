// 📁 frontend/src/components/checkout/CheckoutForm.jsx
"use client";
import React from 'react';

const CheckoutForm = () => {

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  React.useEffect(() => {
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    const options = {
       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // ✅ Secure and flexible
      amount: 50000, // 💰 Amount in paise = ₹500
      currency: "INR",
      name: "Mr. SidSir Ecommerce",
      description: "Test Transaction",
      image: "https://example.com/your_logo.png", // Optional brand logo
      handler: function (response) {
        alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
        // TODO: Call backend API to verify and save payment details
      },
      prefill: {
        name: "Irshad Ahmad",
        email: "irshad1554@gmail.com",
        contact: "+917355534404"
      },
      notes: {
        address: "E-block, Shaheen Bagh, Jamia Nagar, New Delhi"
      },
      theme: {
        color: "#0B5ED7"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-600">🛒 Checkout</h2>
      <p className="mb-6 text-gray-600">Click below to complete your payment securely.</p>
      <button
        onClick={handlePayment}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:from-green-600 hover:to-green-700 transition duration-300"
      >
        Pay ₹500 Now
      </button>
      <p className="mt-4 text-xs text-gray-500">🔒 Powered by Razorpay</p>
    </div>
  );
};

export default CheckoutForm;
