'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Eye, Trash2, ShoppingCart, Menu, X, ChevronDown, Search } from 'lucide-react';

const CompleteWishlistPage = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative bg-gray-100 h-64 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-4/5 h-4/5 object-contain"
        />
        
        {product.discount && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold ${
            product.discount === 'NEW' 
              ? 'bg-green-500 text-black' 
              : 'bg-red-500 text-white'
          }`}>
            {product.discount}
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isWishlist ? (
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-colors"
              title="Remove from wishlist"
            >
              <Trash2 size={16} />
            </button>
          ) : (
            <button
              onClick={() => addToWishlist(product.id)}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-colors"
              title="Add to wishlist"
            >
              <Heart size={16} />
            </button>
          )}
          <button
            onClick={() => quickView(product.id)}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white transition-colors"
            title="Quick view"
          >
            <Eye size={16} />
          </button>
        </div>
        
        <button
          onClick={() => addToCart(product.id)}
          className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 font-medium"
        >
          <ShoppingCart size={16} />
          Add To Cart
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-red-500 font-bold">${product.currentPrice}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-gray-500 text-sm">({product.reviews})</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-gray-600 text-sm mb-8">
          Home / Wishlist
        </div>

        {/* Page Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-medium text-gray-800">
            Wishlist ({wishlistProducts.length})
          </h1>
          {wishlistProducts.length > 0 && (
            <button
              onClick={moveAllToBag}
              className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors font-medium"
            >
              Move All To Bag
            </button>
          )}
        </div>

        {/* Wishlist Products */}
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-600 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400">Add some products to your wishlist to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} isWishlist={true} />
            ))}
          </div>
        )}

        {/* Just For You Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <h2 className="text-xl font-medium text-gray-800">Just For You</h2>
          </div>
          <button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors font-medium">
            See All
          </button>
        </div>

        {/* Recommended Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedProducts.map(product => (
            <ProductCard key={product.id} product={product} isWishlist={false} />
          ))}
        </div>
      </div>

    
    </div>
  );
};

export default CompleteWishlistPage;