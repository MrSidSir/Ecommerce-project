"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiStar, FiHeart, FiEye, FiShoppingCart } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FlashSale = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      price: "$1099",
      image: "https://www.notebookcheck.net/uploads/tx_nbc2/AppleiPhone14Pro__1__01.JPG",
      rating: 5,
    },
    {
      id: 2,
      name: "Apple Watch Series 7",
      price: "$399",
      image: "https://appletoolbox.com/wp-content/uploads/2022/09/Apple-Far-Out-Event-Apple-Watch-Series-8-5-2048x1156.jpg",
      rating: 4,
    },
    {
      id: 3,
      name: "LED Smart TV",
      price: "$899",
      image: "http://i.mlcdn.com.br/1500x1500/smart-tv-led-40-samsung-un40h5550ag-full-hdconversor-integrado-3-hdmi-2-usb-wi-fi-193355300.jpg",
      rating: 4,
    },
    {
      id: 4,
      name: "Nike Running Shoes",
      price: "$129",
      image: "http://getwallpapers.com/wallpaper/full/5/0/d/577895.jpg",
      rating: 4,
    },
    {
      id: 5,
      name: "Modern Furniture Set",
      price: "$1999",
      image: "https://www.primeclassicdesign.com/images/modern-italian-bedroom-sets/modern-luxury-bedroom-furniture-imported-from-spain-franco-kl-101.jpg",
      rating: 5,
    },
  ];

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 12,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Today + Flash Sale header */}
      <div className="flex items-center space-x-4 mb-4">
        <h3 className="text-red-600 font-semibold">Today’s</h3>
        <h2 className="text-2xl font-semibold">Flash Sale</h2>
        {/* Countdown inline */}
        <div className="flex space-x-2">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => {
            const value =
              label === "Days"
                ? timeLeft.days
                : label === "Hours"
                ? timeLeft.hours
                : label === "Minutes"
                ? timeLeft.minutes
                : timeLeft.seconds;
            return (
              <div
                key={i}
                className="bg-black text-white px-2 py-1 rounded text-center"
              >
                <p className="text-[10px]">{label}</p>
                <p className="text-sm font-bold">{value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={2}
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
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="border rounded-lg p-4 hover:shadow-md transition relative group">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />

              {/* Icons overlay */}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                <FiEye className="bg-white rounded-full p-1 text-xl cursor-pointer hover:text-blue-600" />
                <FiHeart className="bg-white rounded-full p-1 text-xl cursor-pointer hover:text-red-500" />
              </div>

              <h3 className="mt-2 text-sm font-medium">{product.name}</h3>
              <p className="text-lg font-bold">{product.price}</p>

              <div className="flex items-center mt-1 text-yellow-400">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <FiStar key={i} />
                ))}
              </div>

              {/* Add to Cart Button */}
              <button className="mt-2 w-full bg-black text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center gap-2">
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View All Products red button below slider */}
      <div className="mt-6">
    <button className="bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 transition" style={{width: '5cm'}}>
    View All Products
  </button>
      </div>
    </div>
  );
};

export default FlashSale;
