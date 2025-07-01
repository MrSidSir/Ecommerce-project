// 📁 frontend/app/cart/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';


const CartPage = () => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={() => router.push('/')}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            ← Continue Shopping
          </button>
        </div>

        {!cart || cart.items.length === 0 ? (
          // Empty Cart
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Cart Items ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'})
                  </h2>
                  {cart.items.length > 0 && (
                    <button
                      onClick={clearCart}
                      disabled={updating}
                      className="text-red-500 hover:text-red-600 font-medium disabled:opacity-50"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                      updating={updating}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary
                cart={cart}
                onCheckout={proceedToCheckout}
                updating={updating}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;