'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const AddToCartPopup = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart(); // ✅ use CartContext addToCart

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const data = await addToCart(product._id, quantity); // ✅ call context function

      if (data.success) {
        // Call parent callback to update cart count if needed
        if (onAddToCart) {
          onAddToCart(data.data);
        }

        alert(`${product.name} added to cart successfully!`);
        onClose();
      } else {
        alert(data.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCart = () => {
    onClose();
    router.push('/cart');
  };

  const handleContinueShopping = () => {
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 px-2">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 max-w-xs sm:max-w-md w-full">
        <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-center">Added to Cart!</h2>
        <p className="text-xs sm:text-base text-gray-600 mb-4 text-center">{product.name} has been added to your cart.</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-3 py-2 rounded text-xs sm:text-sm hover:bg-gray-300 transition-colors w-full sm:w-auto"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleViewCart}
            className="bg-black text-white px-3 py-2 rounded text-xs sm:text-sm hover:bg-gray-800 transition-colors w-full sm:w-auto"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPopup;
