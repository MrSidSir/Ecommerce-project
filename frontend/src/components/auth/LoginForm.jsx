"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, ShoppingCart, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        formData
      );
      
      if (res.status === 200) {
        // Store token if provided
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        
        // Success message
        alert('Login successful!');
        
        // Redirect to dashboard or home
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login Error:', err);
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 items-center justify-center p-12">
        <div className="relative max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {/* Shopping Cart with Phone */}
            <div className="relative">
              <div className="w-64 h-64 mx-auto relative">
                {/* Phone */}
                <div className="absolute right-4 top-8 w-32 h-52 bg-gray-800 rounded-2xl shadow-lg transform rotate-12">
                  <div className="w-full h-full bg-gray-700 rounded-2xl p-2">
                    <div className="w-full h-full bg-gray-900 rounded-xl"></div>
                  </div>
                  {/* Phone reflection */}
                  <div className="absolute top-1 left-1 w-30 h-50 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                </div>
                
                {/* Shopping Cart */}
                <div className="absolute left-4 bottom-8 w-24 h-20">
                  <div className="relative">
                    {/* Cart Body */}
                    <div className="w-16 h-12 border-2 border-gray-400 rounded-sm relative">
                      <div className="absolute -top-2 left-2 w-8 h-2 border-2 border-gray-400 rounded-t-sm"></div>
                    </div>
                    {/* Cart Wheels */}
                    <div className="absolute -bottom-2 left-1 w-3 h-3 bg-gray-400 rounded-full"></div>
                    <div className="absolute -bottom-2 right-1 w-3 h-3 bg-gray-400 rounded-full"></div>
                    {/* Cart Handle */}
                    <div className="absolute -left-1 top-0 w-1 h-8 bg-gray-400"></div>
                    <div className="absolute -left-1 top-0 w-3 h-1 bg-gray-400"></div>
                  </div>
                </div>
                
                {/* Shopping Bags */}
                <div className="absolute left-12 bottom-16 w-6 h-8 bg-pink-400 rounded-sm shadow-md transform -rotate-12"></div>
                <div className="absolute left-16 bottom-12 w-6 h-8 bg-pink-500 rounded-sm shadow-md transform rotate-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Log in to Exclusive</h2>
            <p className="text-gray-600">Enter your details below</p>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4 w-full max-w-xs sm:max-w-md mx-auto">
            {/* Email Field */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email or Phone Number"
                  className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300 focus:border-red-500'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-300 focus:border-red-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Login Button and Forgot Password */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className={`bg-red-600 text-white py-3 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                }`}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              
              <a href="/forgot-password" className="text-red-600 hover:text-red-700 font-medium">
                Forget Password?
              </a>
            </div>
          </form>

          {/* Google Login */}
          <button
            onClick={() => signIn('google')}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Log in with Google</span>
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/signup" className="text-red-600 hover:text-red-700 font-medium underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}