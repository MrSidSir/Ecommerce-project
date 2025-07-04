// 📁 frontend/app/cart/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from "react-i18next";

// Inline CartItem component to avoid import issues
const CartItem = ({ item, onUpdateQuantity, onRemove, updating }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity(item.product._id || item.product, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.product._id || item.product);
  };

  return (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={updating || quantity <= 1}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg font-medium">−</span>
        </button>
        
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
              setQuantity(newQuantity);
            }
          }}
          onBlur={() => {
            if (quantity !== item.quantity) {
              handleQuantityChange(quantity);
            }
          }}
          disabled={updating}
          className="w-16 text-center border border-gray-300 rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        />
        
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={updating}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-lg font-medium">+</span>
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-0">
        <p className="text-lg font-semibold text-gray-900">
          ${item.subtotal.toFixed(2)}
        </p>
        {quantity !== item.quantity && (
          <p className="text-xs text-blue-500">Updating...</p>
        )}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={updating}
        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

// Inline CartSummary component to avoid import issues
const CartSummary = ({ cart, onCheckout, updating }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  const subtotal = cart?.totalAmount || 0;
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;

  const applyCoupon = () => {
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

      {subtotal < 100 && subtotal > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-blue-700">
            🚚 Add ${(100 - subtotal).toFixed(2)} more for free shipping!
          </p>
        </div>
      )}

      <button
        onClick={onCheckout}
        disabled={updating || !cart || cart.items.length === 0}
        className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {updating ? 'Processing...' : 'Proceed to Checkout'}
      </button>

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

export default function CartPage() {
  const { t } = useTranslation();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.data);
      } else {
        setError(data.message || 'Failed to fetch cart');
      }
    } catch (error) {
      console.error('Fetch cart error:', error);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity
        })
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.data);
      } else {
        alert(data.message || 'Failed to update cart');
      }
    } catch (error) {
      console.error('Update cart error:', error);
      alert('Failed to update cart');
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    if (!confirm('Are you sure you want to remove this item?')) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.data);
      } else {
        alert(data.message || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Remove item error:', error);
      alert('Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your entire cart?')) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.data);
      } else {
        alert(data.message || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      alert('Failed to clear cart');
    } finally {
      setUpdating(false);
    }
  };

  const proceedToCheckout = () => {
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 bg-gray-300 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌ {error}</div>
          <button
            onClick={fetchCart}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-lg sm:text-2xl font-bold mb-4">My Cart</h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart?.items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            cart?.items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                updating={updating}
              />
            ))
          )}
        </div>
        {/* Cart Summary */}
        <div className="w-full md:w-80 lg:w-96">
          <CartSummary cart={cart} onCheckout={proceedToCheckout} updating={updating} />
        </div>
      </div>
    </div>
  );
};