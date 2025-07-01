// 📁 frontend/src/components/cart/AddToCartPopup.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AddToCartPopup = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity
        })
      });

      const data = await response.json();

      if (data.success) {
        // Call parent callback to update cart count
        if (onAddToCart) {
          onAddToCart(data.data);
        }
        
        // Show success message
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          disabled={loading}
        >
          ×
        </button>

        {/* Product Info */}
        <div className="mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
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
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.name}
              </h3>
              <p className="text-xl font-bold text-red-500">
                ${product.price?.toFixed(2)}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Product Description */}
          {product.description && (
            <p className="text-sm text-gray-600 mt-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Stock Status */}
          <div className="mt-3">
            {product.stock > 0 ? (
              <p className="text-sm text-green-600">
                ✅ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm text-red-600">
                ❌ Out of Stock
              </p>
            )}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={loading || quantity <= 1}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              −
            </button>
            
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 0 && val <= product.stock) {
                  setQuantity(val);
                }
              }}
              disabled={loading}
              className="w-20 text-center border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={loading || quantity >= product.stock}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="text-lg font-bold text-gray-900">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </div>
            ) : (
              '🛒 Add to Cart'
            )}
          </button>

          <div className="flex space-x-2">
            <button
              onClick={handleViewCart}
              disabled={loading}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition duration-200 disabled:opacity-50"
            >
              View Cart
            </button>
            <button
              onClick={handleContinueShopping}
              disabled={loading}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition duration-200 disabled:opacity-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 pt-4 border-t space-y-2">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>🚚</span>
            <span>Free shipping on orders over $100</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>↩️</span>
            <span>Easy 30-day returns</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>🔒</span>
            <span>Secure payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPopup;