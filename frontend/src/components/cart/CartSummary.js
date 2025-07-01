// 📁 frontend/src/components/cart/CartSummary.js
import { useState } from 'react';

const CartSummary = ({ cart, onCheckout, updating }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  const subtotal = cart?.totalAmount || 0;
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      'SAVE10': { type: 'percentage', value: 10 },
      'WELCOME20': { type: 'percentage', value: 20 },
      'FLAT50': { type: 'fixed', value: 50 }
    };

    const coupon = validCoupons[couponCode.toUpperCase()];
    if (coupon) {
      const discountAmount = coupon.type === 'percentage' 
        ? (subtotal * coupon.value) / 100 
        : coupon.value;
      
      setDiscount(Math.min(discountAmount, subtotal));
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({appliedCoupon?.code})</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Coupon Code</h3>
        
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <span className="text-green-600 text-sm font-medium">{appliedCoupon.code}</span>
              <span className="text-green-600 text-xs">Applied</span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={applyCoupon}
              disabled={!couponCode.trim()}
              className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-1">
          Try: SAVE10, WELCOME20, FLAT50
        </div>
      </div>

      {/* Shipping Info */}
      {subtotal < 100 && subtotal > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-blue-700">
            🚚 Add ${(100 - subtotal).toFixed(2)} more for free shipping!
          </p>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={updating || !cart || cart.items.length === 0}
        className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {updating ? 'Processing...' : 'Proceed to Checkout'}
      </button>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>🔒</span>
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>↩️</span>
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>📞</span>
          <span>24/7 customer support</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;