"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiShoppingCart, FiEye, FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BestSellerSlider = () => {
  const bestSellers = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: "$59",
      image: "https://cdn.pixabay.com/photo/2020/04/22/10/13/airpods-5074224_1280.jpg",
      offer: "20% Off",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$129",
      image: "https://cdn.pixabay.com/photo/2014/12/27/15/40/watch-581801_1280.jpg",
      offer: "10% Off",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Gaming Laptop",
      price: "$999",
      image: "https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_1280.jpg",
      offer: "15% Off",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: "$89",
      image: "https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg",
      offer: "25% Off",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Smartphone",
      price: "$699",
      image: "https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_1280.jpg",
      offer: "18% Off",
      rating: 4.9,
    },
    {
      id: 6,
      name: "Tablet Pro",
      price: "$549",
      image: "https://cdn.pixabay.com/photo/2015/01/20/13/13/ipad-605439_1280.jpg",
      offer: "12% Off",
      rating: 4.4,
    },
    {
      id: 7,
      name: "Wireless Mouse",
      price: "$35",
      image: "https://cdn.pixabay.com/photo/2017/05/24/21/33/workplace-2341642_1280.jpg",
      offer: "30% Off",
      rating: 4.3,
    },
    {
      id: 8,
      name: "USB-C Hub",
      price: "$79",
      image: "https://cdn.pixabay.com/photo/2018/05/08/21/29/usb-3386915_1280.jpg",
      offer: "22% Off",
      rating: 4.7,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 text-xs opacity-50" />);
    }

    return stars;
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Best Sellers</h2>
        <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition">
          View All
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {bestSellers.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="border rounded-lg p-4 hover:shadow-md transition relative group">
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                {product.offer}
              </span>
              
              {/* Action icons - appear on hover */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                  <FiHeart className="text-gray-600 text-sm" />
                </button>
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                  <FiEye className="text-gray-600 text-sm" />
                </button>
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(product.rating)}
                  <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                </div>
                
                <p className="text-lg font-bold text-gray-900 mt-1">{product.price}</p>
              </div>

              <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center gap-2 transition">
                <FiShoppingCart className="text-sm" /> Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestSellerSlider;