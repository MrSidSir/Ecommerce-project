"use client";

import React, { useState } from "react";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";

const OurProduct = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Breed Dry Dog Food",
      price: 100,
      reviews: 35,
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop",
      badge: "NEW",
    },
    {
      id: 2,
      name: "CANON EOS DSLR Camera",
      price: 360,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      badge: "NEW",
    },
    {
      id: 3,
      name: "ASUS FHD Gaming Laptop",
      price: 700,
      reviews: 325,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      badge: "NEW",
    },
    {
      id: 4,
      name: "Curology Product Set",
      price: 500,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
      badge: "NEW",
    },
    {
      id: 5,
      name: "Kids Electric Car",
      price: 960,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      badge: "NEW",
    },
    {
      id: 6,
      name: "Jr. Zoom Soccer Cleats",
      price: 1160,
      reviews: 35,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop",
      badge: "NEW",
    },
    {
      id: 7,
      name: "GP11 Shooter USB Gamepad",
      price: 660,
      reviews: 55,
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=300&fit=crop",
      badge: "NEW",
    },
    {
      id: 8,
      name: "Quilted Satin Jacket",
      price: 660,
      reviews: 55,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
      badge: "NEW",
    },
  ];

  const renderStars = (reviews) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
      <span className="text-gray-500 text-sm">({reviews})</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h3 className="text-red-500 font-medium mb-2">Our Products</h3>
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Explore Our Products</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition group relative"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Badge */}
            <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
              {product.badge}
            </span>

            {/* Action Icons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
              <button className="bg-white p-1 rounded-full shadow hover:text-red-500">
                <Heart size={16} />
              </button>
              <button className="bg-white p-1 rounded-full shadow hover:text-blue-500">
                <Eye size={16} />
              </button>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden bg-gray-50 h-48">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Add to Cart Button */}
              <div className={`absolute bottom-0 left-0 right-0 transform ${hoveredProduct === product.id ? "translate-y-0" : "translate-y-full"} transition`}>
                <button className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 hover:bg-gray-800">
                  <ShoppingCart size={16} /> Add To Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500 font-bold text-lg">${product.price}</span>
              </div>
              {renderStars(product.reviews)}
            </div>
          </div>
        ))}
      </div>

      {/* View All Products Button */}
      <div className="text-center">
        <button className="bg-red-500 text-white px-12 py-4 rounded hover:bg-red-600 font-medium">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default OurProduct;
