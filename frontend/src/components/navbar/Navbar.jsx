// 📁 frontend/src/components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { BiUser, BiPackage, BiX, BiStar, BiLogOut } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from "../context/LanguageProvider";
import { useContext } from "react";

export default function Navbar() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
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

  const handleLanguageChange = (e) => {
    const langCode = e.target.value;
    changeLanguage(langCode);
  };
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
    <nav className="w-full">
      {/* Announcement Bar */}
      <div className="bg-black text-white px-2 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <p className="truncate">{t('Summer Sale')}</p>
          <button 
            onClick={() => handleNavigation('/shop')}
            className="bg-white text-black text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors mt-2 sm:mt-0"
          >
            {t('Shop Now')}
          </button>
        </div>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-gray-200 text-black px-2 py-1 rounded text-xs sm:text-sm focus:outline-none mt-2 sm:mt-0"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ur">Urdu</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
        </select>
      </div>

      {/* Main Navbar */}
      <div className="bg-white text-black px-2 sm:px-6 md:px-16 py-3 flex items-center justify-between shadow relative">
        {/* Left: Brand Name and Project Line */}
        <div onClick={() => handleNavigation('/')} className="cursor-pointer min-w-fit">
          <div className="text-lg sm:text-2xl font-bold hover:text-red-500 transition-colors">
            Exclusive
          </div>
          <div className="text-xs sm:text-sm text-gray-500 mt-1">
            Mr. Sid E-commerce Project
          </div>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center ml-2">
          <button onClick={toggleDropdown} className="p-2 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isDropdownOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Center: Menu Links (desktop) */}
        <div className="hidden md:flex space-x-4 lg:space-x-8">
          <button 
            onClick={() => handleNavigation('/')} 
            className="hover:text-red-500 border-b-2 border-gray-300 pb-1 transition-colors"
          >
            {t('Home')}
          </button>
          <button 
            onClick={() => handleNavigation('/contact')} 
            className="hover:text-red-500 transition-colors"
          >
            {t('Contact')}
          </button>
          <button 
            onClick={() => handleNavigation('/about')} 
            className="hover:text-red-500 transition-colors"
          >
            {t('About')}
          </button>
          {!isLoggedIn && (
            <button 
              onClick={() => handleNavigation('/signup')} 
              className="hover:text-red-500 transition-colors"
            >
              {t('Sign Up')}
            </button>
          )}
        </div>

        {/* Right: Search, Heart, Cart, User */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search (collapsible on mobile) */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center border rounded px-2 py-1 bg-gray-50 focus-within:border-red-500 transition-colors w-32 sm:w-64">
            <input 
              type="text" 
              placeholder={t('What are you looking for?')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none px-2 text-xs sm:text-sm bg-transparent w-full"
            />
            <button type="submit" className="text-gray-500 hover:text-red-500 transition-colors">
              <FiSearch />
            </button>
          </form>
          {/* Mobile search icon */}
          <button className="sm:hidden p-2" onClick={() => alert('Search feature for mobile coming soon!')}>
            <FiSearch className="w-5 h-5" />
          </button>
          {/* Wishlist Heart */}
          <div className="relative">
            <button 
              onClick={handleWishlistClick} 
              className="text-lg sm:text-xl hover:text-red-500 transition-colors focus:outline-none" 
              title="Wishlist"
            >
              <FiHeart />
            </button>
            {isLoggedIn && wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </div>
          {/* Cart */}
          <div className="relative">
            <button 
              onClick={handleCartClick} 
              className="text-lg sm:text-xl hover:text-red-500 transition-colors focus:outline-none" 
              title="Cart"
            >
              <FiShoppingCart />
            </button>
            {isLoggedIn && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          {/* User */}
          <button onClick={handleAuthAction} className="text-lg sm:text-xl hover:text-red-500 transition-colors focus:outline-none">
            <FiUser />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isDropdownOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 z-50 animate-fade-in">
          <div className="flex flex-col space-y-2 py-4 px-4">
            <button onClick={() => { handleNavigation('/'); closeDropdown(); }} className="py-2 text-left hover:text-red-500">{t('Home')}</button>
            <button onClick={() => { handleNavigation('/contact'); closeDropdown(); }} className="py-2 text-left hover:text-red-500">{t('Contact')}</button>
            <button onClick={() => { handleNavigation('/about'); closeDropdown(); }} className="py-2 text-left hover:text-red-500">{t('About')}</button>
            {!isLoggedIn && (
              <button onClick={() => { handleNavigation('/signup'); closeDropdown(); }} className="py-2 text-left hover:text-red-500">{t('Sign Up')}</button>
            )}
            <form onSubmit={handleSearch} className="flex items-center border rounded px-2 py-1 bg-gray-50 mt-2">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none px-2 text-xs bg-transparent w-full"
              />
              <button type="submit" className="text-gray-500 hover:text-red-500 transition-colors">
                <FiSearch />
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}