"use client";
import { useState } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { BiUser, BiPackage, BiX, BiStar, BiLogOut } from "react-icons/bi";

export default function Navbar() {
  const [language, setLanguage] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleMenuAction = (action) => {
    console.log(`${action} clicked`);
    closeDropdown();
    // Add your navigation logic here
    // Example: router.push('/account') for Manage Account
  };

  const menuItems = [
    {
      icon: <BiUser className="w-5 h-5" />,
      text: "Manage My Account",
      action: () => handleMenuAction("Manage Account")
    },
    {
      icon: <BiPackage className="w-5 h-5" />,
      text: "My Order",
      action: () => handleMenuAction("My Orders")
    },
    {
      icon: <BiX className="w-5 h-5" />,
      text: "My Cancellations",
      action: () => handleMenuAction("My Cancellations")
    },
    {
      icon: <BiStar className="w-5 h-5" />,
      text: "My Reviews",
      action: () => handleMenuAction("My Reviews")
    },
    {
      icon: <BiLogOut className="w-5 h-5" />,
      text: "Logout",
      action: () => handleMenuAction("Logout")
    }
  ];

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
      <div className="bg-white text-black px-6 md:px-16 py-4 mt-2 flex items-center justify-between shadow relative">
        {/* Left: Brand Name */}
        <div className="text-2xl font-bold">Exclusive</div>

        {/* Center: Menu Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-blue-600 border-b-2 border-gray-300 pb-1">Home</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
          <a href="/about" className="hover:text-blue-600">About</a>
          <a href="/signup" className="hover:text-blue-600">Sign Up</a>
        </div>

        {/* Right: Search, Heart, Cart, User */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded px-2 py-1 bg-gray-50">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="outline-none px-2 text-sm bg-transparent"
            />
            <FiSearch className="text-gray-500" />
          </div>
          
          <FiHeart className="text-xl cursor-pointer hover:text-red-500 transition-colors" />
          
          {/* Cart with Badge */}
          <div className="relative">
            <FiShoppingCart className="text-xl cursor-pointer hover:text-green-600 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </div>

          {/* User Account Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              <FiUser className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-gray-700 hover:text-orange-500"
                    >
                      <span className="text-gray-500">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdown}
        ></div>
      )}
    </div>
  );
}