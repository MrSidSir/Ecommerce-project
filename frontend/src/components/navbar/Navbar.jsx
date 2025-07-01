// 📁 frontend/src/components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { BiUser, BiPackage, BiX, BiStar, BiLogOut } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [language, setLanguage] = useState("English");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(4); // Mock data - replace with actual wishlist context
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const router = useRouter();
  const { cartCount, fetchCartCount } = useCart();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    if (token) {
      fetchCartCount();
    }
  }, [fetchCartCount]);

  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleMenuAction = (action) => {
    console.log(`${action} clicked`);
    closeDropdown();
    switch(action) {
      case "Manage Account": 
        router.push('/dashboard'); 
        break;
      case "My Orders": 
        router.push('/orders'); 
        break;
      case "My Cancellations": 
        router.push('/cancellations'); 
        break;
      case "My Reviews": 
        router.push('/reviews'); 
        break;
      case "Logout":
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/login');
        break;
      default: 
        break;
    }
  };

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    router.push('/wishlist');
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    router.push('/cart');
  };

  const handleNavigation = (path) => router.push(path);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      toggleDropdown();
    } else {
      router.push('/login');
    }
  };

  const menuItems = [
    { icon: <BiUser className="w-5 h-5" />, text: "Manage My Account", action: () => handleMenuAction("Manage Account") },
    { icon: <BiPackage className="w-5 h-5" />, text: "My Order", action: () => handleMenuAction("My Orders") },
    { icon: <BiX className="w-5 h-5" />, text: "My Cancellations", action: () => handleMenuAction("My Cancellations") },
    { icon: <BiStar className="w-5 h-5" />, text: "My Reviews", action: () => handleMenuAction("My Reviews") },
    { icon: <BiLogOut className="w-5 h-5" />, text: "Logout", action: () => handleMenuAction("Logout") }
  ];

  return (
    <div className="w-full">
      {/* Announcement Bar */}
      <div className="bg-black text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <p className="text-sm">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <button 
            onClick={() => handleNavigation('/shop')}
            className="bg-white text-black text-xs px-3 py-1 rounded hover:bg-gray-200 transition-colors"
          >
            Shop Now
          </button>
        </div>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-gray-200 text-black px-2 py-1 rounded text-sm focus:outline-none"
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
        {/* Left: Brand Name and Project Line */}
        <div onClick={() => handleNavigation('/')} className="cursor-pointer">
          <div className="text-2xl font-bold hover:text-red-500 transition-colors">
            Exclusive
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Mr. Sid E-commerce Project
          </div>
        </div>

        {/* Center: Menu Links */}
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => handleNavigation('/')} 
            className="hover:text-red-500 border-b-2 border-gray-300 pb-1 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigation('/contact')} 
            className="hover:text-red-500 transition-colors"
          >
            Contact
          </button>
          <button 
            onClick={() => handleNavigation('/about')} 
            className="hover:text-red-500 transition-colors"
          >
            About
          </button>
          {!isLoggedIn && (
            <button 
              onClick={() => handleNavigation('/signup')} 
              className="hover:text-red-500 transition-colors"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Right: Search, Heart, Cart, User */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center border rounded px-2 py-1 bg-gray-50 focus-within:border-red-500 transition-colors">
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none px-2 text-sm bg-transparent w-64"
            />
            <button type="submit" className="text-gray-500 hover:text-red-500 transition-colors">
              <FiSearch />
            </button>
          </form>
          
          {/* Wishlist Heart */}
          <div className="relative">
            <button 
              onClick={handleWishlistClick} 
              className="text-xl hover:text-red-500 transition-colors focus:outline-none" 
              title="Wishlist"
            >
              <FiHeart />
            </button>
            {isLoggedIn && wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <button 
              onClick={handleCartClick} 
              className="text-xl hover:text-green-600 transition-colors focus:outline-none" 
              title="Shopping Cart"
            >
              <FiShoppingCart />
            </button>
            {isLoggedIn && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>

          {/* User Account */}
          <div className="relative">
            <button 
              onClick={handleAuthAction} 
              className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoggedIn 
                  ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
              }`}
              title={isLoggedIn ? "Account Menu" : "Login"}
            >
              <FiUser className="w-5 h-5" />
            </button>

            {/* Dropdown Menu - Only show when logged in */}
            {isLoggedIn && isDropdownOpen && (
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
        <div className="fixed inset-0 z-40" onClick={closeDropdown}></div>
      )}
    </div>
  );
}