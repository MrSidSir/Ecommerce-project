"use client";

import React from 'react';
import { Truck, Headphones, Shield } from 'lucide-react';

const ServicesFeatures = () => {
  const services = [
    {
      id: 1,
      icon: <Truck className="w-10 h-10" />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
      bgColor: "bg-purple-500",
      iconBg: "bg-black"
    },
    {
      id: 2,
      icon: <Headphones className="w-10 h-10" />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
      bgColor: "bg-purple-500",
      iconBg: "bg-black"
    },
    {
      id: 3,
      icon: <Shield className="w-10 h-10" />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
      bgColor: "bg-purple-500",
      iconBg: "bg-black"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
          >
            {/* Icon Container */}
            <div className="relative mb-6">
              {/* Outer Circle */}
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center relative">
                {/* Inner Circle */}
                <div className={`w-14 h-14 ${service.iconBg} rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900 tracking-wide">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesFeatures;