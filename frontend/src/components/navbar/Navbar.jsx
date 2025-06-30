"use client";
import { useState } from "react";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const [language, setLanguage] = useState("English");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="w-full">
      {/* Announcement Bar */}
      <div className="bg-black text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <p className="text-sm">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <button className="bg-white text-black text-xs px-3 py-1 rounded hover:bg-gray-200">
            Shop Now
          </button>
        </div>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-gray-200 text-black px-2 py-1 rounded text-sm"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Urdu</option>
          <option>Arabic</option>
          <option>French</option>
        </select>
      </div>

      {/* Main Navbar */}
      <div className="bg-white text-black px-6 md:px-16 py-4 mt-2 flex items-center justify-between shadow">
        {/* Left: Brand Name */}
        <div className="text-2xl font-bold">Exclusive</div>

        {/* Center: Menu Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
          <a href="/about" className="hover:text-blue-600">About</a>
          <a href="/signup" className="hover:text-blue-600">Sign Up</a>
        </div>

        {/* Right: Search, Heart, Cart */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded px-2 py-1">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="outline-none px-2 text-sm"
            />
            <FiSearch className="text-gray-500" />
          </div>
          <FiHeart className="text-xl cursor-pointer hover:text-red-500" />
          <FiShoppingCart className="text-xl cursor-pointer hover:text-green-600" />
        </div>
      </div>
    </div>
  );
}
