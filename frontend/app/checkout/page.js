"use client";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-600">Secure Checkout</h1>
      <CheckoutForm />
      <div className="mt-8 text-sm text-gray-500 text-center">
        🔒 Your payment is secured with Razorpay.
      </div>
    </div>
  );
}
