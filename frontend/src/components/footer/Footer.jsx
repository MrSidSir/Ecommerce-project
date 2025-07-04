"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleNavigation = (path) => {
    // In a real app, you'd use React Router
    console.log(`Navigating to: ${path}`);
    window.history.pushState({}, '', path);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Exclusive Section */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Exclusive</h3>
            <div className="space-y-2 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-medium">Subscribe</h4>
              <p className="text-gray-300 text-xs sm:text-sm">Get 10% off your first order</p>
              <div className="relative">
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent border border-gray-600 rounded-t sm:rounded-l sm:rounded-t-none px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-white"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="bg-white text-black px-4 py-2 rounded-b sm:rounded-r sm:rounded-b-none hover:bg-gray-200 transition-colors text-xs sm:text-sm"
                  >
                    <Mail size={16} />
                  </button>
                </div>
                {subscribed && (
                  <p className="text-green-400 text-xs mt-2">Successfully subscribed!</p>
                )}
              </div>
            </div>
          </div>
          {/* Support Section */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Support</h3>
            <div className="space-y-2 sm:space-y-4">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-xs sm:text-sm">
                  shaheen bagh, Delhi NCR ,<br />New Delhi, India.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <a 
                  href="mailto:exclusive@gmail.com"
                  className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors"
                >
                  irshad1554@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <a 
                  href="tel:+91 7355534404"
                  className="text-gray-300 text-xs sm:text-sm hover:text-white transition-colors"
                >
                  +91 735554404
                </a>
              </div>
            </div>
          </div>
          {/* Account Section */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Account</h3>
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={() => handleNavigation('/my-account')}
                className="block text-gray-300 text-xs sm:text-sm hover:text-white transition-colors text-left"
              >
                My Account
              </button>
              <button
                onClick={() => handleNavigation('/login')}
                className="block text-gray-300 text-xs sm:text-sm hover:text-white transition-colors text-left"
              >
                Login / Register
              </button>
              <button
                onClick={() => handleNavigation('/cart')}
                className="block text-gray-300 text-xs sm:text-sm hover:text-white transition-colors text-left"
              >
                Cart
              </button>
              <button
                onClick={() => handleNavigation('/wishlist')}
                className="block text-gray-300 text-xs sm:text-sm hover:text-white transition-colors text-left"
              >
                Wishlist
              </button>
              <button
                onClick={() => handleNavigation('/shop')}
                className="block text-gray-300 text-xs sm:text-sm hover:text-white transition-colors text-left"
              >
                Shop
              </button>
            </div>
          </div>
          {/* Quick Link Section */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Quick Link</h3>
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={() => handleNavigation('/privacy-policy')}
                className="block text-gray-300 text-xs sm:text-sm hover:text-white transition-colors text-left"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavigation('/terms-of-use')}
                className="block text-gray-300 text-xs sm:text-sm hover:text-white transition-colors text-left"
              >
                Terms Of Use
              </button>
              <button
                onClick={() => handleNavigation('/faq')}
                className="block text-gray-300 text-xs sm:text-sm hover:text-white transition-colors text-left"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavigation('/contact')}
                className="block text-gray-300 text-xs sm:text-sm hover:text-white transition-colors text-left"
              >
                Contact
              </button>
            </div>
          </div>
          {/* Download App Section */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Download App</h3>
            <div className="space-y-2 sm:space-y-4">
              <p className="text-gray-300 text-xs sm:text-sm">Save $3 with App New User Only</p>
              {/* QR Code */}
              <div className="bg-white p-2 sm:p-3 rounded inline-block">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://www.instagram.com/mr_sid_sir"
                  alt="QR Code for Instagram @mr_sid_sir"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
              </div>
              <p className="text-gray-400 text-xs">Scan to follow on Instagram</p>
              {/* App Store Buttons */}
              <div className="space-y-1 sm:space-y-2">
                <button
                  onClick={() => handleExternalLink('https://play.google.com/store')}
                  className="flex items-center space-x-2 bg-gray-800 rounded px-2 sm:px-3 py-2 hover:bg-gray-700 transition-colors w-full"
                >
                  <div className="text-xs">
                    <div className="text-gray-300">GET IT ON</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>
                <button
                  onClick={() => handleExternalLink('https://apps.apple.com')}
                  className="flex items-center space-x-2 bg-gray-800 rounded px-2 sm:px-3 py-2 hover:bg-gray-700 transition-colors w-full"
                >
                  <div className="text-xs">
                    <div className="text-gray-300">Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;