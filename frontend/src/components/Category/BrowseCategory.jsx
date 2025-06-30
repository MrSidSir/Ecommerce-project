"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiEye, FiHeart, FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BrowseCategory = () => {
  const categories = [
    {
      id: 1,
      name: "Women's Fashion",
      items: 320,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop&crop=center",
      discount: "Up to 50% Off",
    },
    {
      id: 2,
      name: "Men's Fashion",
      items: 280,
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=600&fit=crop&crop=center",
      discount: "Up to 40% Off",
    },
    {
      id: 3,
      name: "Electronics",
      items: 150,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop&crop=center",
      discount: "Up to 30% Off",
    },
    {
      id: 4,
      name: "Home & Lifestyle",
      items: 220,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center",
      discount: "Up to 25% Off",
    },
    {
      id: 5,
      name: "Sports & Outdoor",
      items: 90,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
      discount: "Up to 35% Off",
    },
    {
      id: 6,
      name: "Beauty & Health",
      items: 180,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop&crop=center",
      discount: "Up to 45% Off",
    },
    {
      id: 7,
      name: "Jewelry & Watches",
      items: 95,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center",
      discount: "Up to 60% Off",
    },
    {
      id: 8,
      name: "Books & Stationery",
      items: 210,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&crop=center",
      discount: "Up to 30% Off",
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Top Categories</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition">
          View All
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={2}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition group cursor-pointer relative">
              {/* Discount Badge */}
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                {category.discount}
              </span>
              
              {/* Action icons - appear on hover */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
                  <FiHeart className="text-gray-600 text-xs" />
                </button>
                <button className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
                  <FiEye className="text-gray-600 text-xs" />
                </button>
              </div>

              {/* Image with overlay on hover */}
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                {/* Shop Now button - appears on hover */}
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-full bg-white text-black py-1.5 rounded text-xs font-medium hover:bg-gray-100 flex items-center justify-center gap-1">
                    Shop Now <FiArrowRight className="text-xs" />
                  </button>
                </div>
              </div>

              <div className="p-3 text-center">
                <h3 className="font-medium text-gray-800 text-sm">{category.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{category.items} items</p>
                
                {/* Category rating/popularity indicator */}
                <div className="flex justify-center items-center mt-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full ${
                          i < 4 ? "bg-yellow-400" : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">Popular</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrowseCategory;