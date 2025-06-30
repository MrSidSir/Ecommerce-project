"use client";

import React from 'react';

const FeaturedNewArrival = () => {
  const featuredItems = [
    {
      id: 1,
      title: "PlayStation 5",
      description: "Black and White version of the PS5 coming out on sale.",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=400&fit=crop",
      buttonText: "Shop Now",
      size: "large",
      bgColor: "bg-black"
    },
    {
      id: 2,
      title: "Women's Collections",
      description: "Featured women collections that give you another vibe.",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9b12e00?w=400&h=300&fit=crop",
      buttonText: "Shop Now",
      size: "medium",
      bgColor: "bg-gray-900"
    },
    {
      id: 3,
      title: "Speakers",
      description: "Amazon wireless speakers",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop",
      buttonText: "Shop Now",
      size: "small",
      bgColor: "bg-gray-800"
    },
    {
      id: 4,
      title: "Perfume",
      description: "GUCCI INTENSE OUD EDP",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=200&fit=crop",
      buttonText: "Shop Now",
      size: "small",
      bgColor: "bg-black"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-red-500 w-5 h-10 rounded"></div>
          <span className="text-red-500 font-semibold text-lg">Featured</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">New Arrival</h2>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-auto lg:h-[600px]">
        
        {/* PlayStation 5 - Large Item */}
        <div className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-lg group cursor-pointer">
          <div className="absolute inset-0 bg-black">
            <img
              src={featuredItems[0].image}
              alt={featuredItems[0].title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
            <h3 className="text-3xl font-bold mb-3">{featuredItems[0].title}</h3>
            <p className="text-gray-200 mb-6 text-base leading-relaxed max-w-md">
              {featuredItems[0].description}
            </p>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold w-fit">
              {featuredItems[0].buttonText}
            </button>
          </div>
        </div>

        {/* Women's Collections - Medium Item */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-lg group cursor-pointer">
          <div className="absolute inset-0 bg-gray-900">
            <img
              src={featuredItems[1].image}
              alt={featuredItems[1].title}
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white min-h-[280px] lg:min-h-[290px]">
            <h3 className="text-2xl font-bold mb-2">{featuredItems[1].title}</h3>
            <p className="text-gray-200 mb-4 text-sm leading-relaxed">
              {featuredItems[1].description}
            </p>
            <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold w-fit text-sm">
              {featuredItems[1].buttonText}
            </button>
          </div>
        </div>

        {/* Speakers - Small Item */}
        <div className="relative overflow-hidden rounded-lg group cursor-pointer">
          <div className="absolute inset-0 bg-gray-800">
            <img
              src={featuredItems[2].image}
              alt={featuredItems[2].title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          <div className="relative z-10 p-5 h-full flex flex-col justify-end text-white min-h-[280px] lg:min-h-[290px]">
            <h3 className="text-xl font-bold mb-2">{featuredItems[2].title}</h3>
            <p className="text-gray-200 mb-4 text-sm leading-relaxed">
              {featuredItems[2].description}
            </p>
            <button className="bg-transparent border-2 border-white text-white px-5 py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold w-fit text-sm">
              {featuredItems[2].buttonText}
            </button>
          </div>
        </div>

        {/* Perfume - Small Item */}
        <div className="relative overflow-hidden rounded-lg group cursor-pointer">
          <div className="absolute inset-0 bg-black">
            <img
              src={featuredItems[3].image}
              alt={featuredItems[3].title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          <div className="relative z-10 p-5 h-full flex flex-col justify-end text-white min-h-[280px] lg:min-h-[290px]">
            <h3 className="text-xl font-bold mb-2">{featuredItems[3].title}</h3>
            <p className="text-gray-200 mb-4 text-sm leading-relaxed">
              {featuredItems[3].description}
            </p>
            <button className="bg-transparent border-2 border-white text-white px-5 py-2 rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-semibold w-fit text-sm">
              {featuredItems[3].buttonText}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturedNewArrival;