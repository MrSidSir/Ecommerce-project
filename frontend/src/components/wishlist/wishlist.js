'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Eye, Trash2, ShoppingCart, Menu, X, ChevronDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CompleteWishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Sample wishlist data
  const sampleWishlistProducts = [
    {
      id: 1,
      name: "Gucci duffle bag",
      currentPrice: 960,
      originalPrice: 1160,
      discount: "-35%",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 88
    },
    {
      id: 2,
      name: "RGB liquid CPU Cooler",
      currentPrice: 1960,
      originalPrice: null,
      discount: null,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 75
    },
    {
      id: 3,
      name: "GP11 Shooter USB Gamepad",
      currentPrice: 550,
      originalPrice: null,
      discount: null,
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 55
    },
    {
      id: 4,
      name: "Quilted Satin Jacket",
      currentPrice: 750,
      originalPrice: null,
      discount: null,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 55
    }
  ];

  const sampleRecommendedProducts = [
    {
      id: 5,
      name: "ASUS FHD Gaming Laptop",
      currentPrice: 960,
      originalPrice: 1160,
      discount: "-35%",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 325
    },
    {
      id: 6,
      name: "IPS LCD Gaming Monitor",
      currentPrice: 1160,
      originalPrice: null,
      discount: null,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 99
    },
    {
      id: 7,
      name: "HAVIT HV-G92 Gamepad",
      currentPrice: 560,
      originalPrice: null,
      discount: "NEW",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 88
    },
    {
      id: 8,
      name: "AK-900 Wired Keyboard",
      currentPrice: 200,
      originalPrice: null,
      discount: null,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 75
    }
  ];

  useEffect(() => {
    // Load wishlist and recommended products
    setWishlistProducts(sampleWishlistProducts);
    setRecommendedProducts(sampleRecommendedProducts);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const removeFromWishlist = (productId) => {
    if (confirm('Remove this product from wishlist?')) {
      setWishlistProducts(prev => prev.filter(product => product.id !== productId));
    }
  };

  const addToCart = (productId) => {
    alert(`Product ${productId} added to cart!`);
  };

  const addToWishlist = (productId) => {
    const productToAdd = recommendedProducts.find(p => p.id === productId);
    if (productToAdd) {
      setWishlistProducts(prev => [...prev, productToAdd]);
      alert(`${productToAdd.name} added to wishlist!`);
    }
  };

  const moveAllToBag = () => {
    if (confirm('Move all wishlist items to cart?')) {
      alert('All items moved to cart!');
      setWishlistProducts([]);
    }
  };

  const quickView = (productId) => {
    alert(`Quick view for product ${productId}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  const ProductCard = ({ product, isWishlist = false }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      <div className="relative bg-gray-100 h-48 sm:h-64 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-3/4 h-3/4 object-contain"
        />
        {product.discount && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold ${
            product.discount === 'NEW' 
              ? 'bg-green-500 text-black' 
              : 'bg-red-500 text-white'
          }`}>
            {product.discount}
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {isWishlist ? (
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-colors"
              title="Remove from wishlist"
            >
              <Trash2 size={16} />
            </button>
          ) : (
            <button
              onClick={() => addToWishlist(product.id)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-colors"
              title="Add to wishlist"
            >
              <Heart size={16} />
            </button>
          )}
          <button
            onClick={() => quickView(product.id)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white transition-colors"
            title="Quick view"
          >
            <Eye size={16} />
          </button>
        </div>
        <button
          onClick={() => addToCart(product.id)}
          className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 sm:py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 font-medium text-xs sm:text-base"
        >
          <ShoppingCart size={16} />
          Add To Cart
        </button>
      </div>
      <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-lg font-semibold mb-1 truncate">{product.name}</h3>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs sm:text-base font-bold text-black">₹{product.currentPrice}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm line-through text-gray-400">₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="text-xs sm:text-sm font-bold text-red-500">{product.discount}</span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs sm:text-sm text-gray-400">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
      {/* Go to Dashboard Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-xs sm:text-sm"
        >
          Go to Dashboard
        </button>
      </div>
      {/* Wishlist Products */}
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wishlistProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded mb-2" />
            <div className="font-semibold text-gray-800 text-center mb-1">{product.name}</div>
            <div className="text-red-500 font-bold mb-1">${product.currentPrice}</div>
            <a href={`/product/${product.id}`} className="text-blue-600 underline text-xs mb-2">View Product</a>
            <div className="flex gap-2">
              <button onClick={() => removeFromWishlist(product.id)} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs hover:bg-red-500 hover:text-white">Remove</button>
              <button onClick={() => addToCart(product.id)} className="bg-black text-white px-2 py-1 rounded text-xs hover:bg-gray-800">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-base sm:text-lg font-semibold mt-8 mb-4">Recommended For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CompleteWishlistPage;