// 📁 frontend/src/components/cart/CartItem.js
"use client";
import { useState } from 'react';
import Image from 'next/image';

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
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 p-2 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="flex-shrink-0 mb-2 sm:mb-0">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden">
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
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500">${item.price.toFixed(2)} each</p>
      </div>
      {/* Quantity Controls */}
      <div className="flex items-center space-x-1 sm:space-x-2 mt-2 sm:mt-0">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={updating || quantity <= 1}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-base sm:text-lg font-medium">−</span>
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
          className="w-12 sm:w-16 text-center border border-gray-300 rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-xs sm:text-base"
        />
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={updating}
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-base sm:text-lg font-medium">+</span>
        </button>
      </div>
      {/* Subtotal */}
      <div className="text-right min-w-0 mt-2 sm:mt-0">
        <p className="text-base sm:text-lg font-semibold text-gray-900">${item.subtotal.toFixed(2)}</p>
        {quantity !== item.quantity && (
          <p className="text-xs text-blue-500">Updating...</p>
        )}
      </div>
      {/* Remove Button */}
      <button
        onClick={handleRemove}
        disabled={updating}
        className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 sm:mt-0"
        title="Remove item"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;