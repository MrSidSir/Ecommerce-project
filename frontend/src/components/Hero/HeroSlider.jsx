"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const categories = [
    "Women's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];

  const slides = [
    {
      id: 1,
      title: "iPhone Series",
      description: "Up to 10% off Voucher",
      image:
        "https://www.mobilegyans.com/wp-content/uploads/2023/02/Apple-iPhone-16.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Smart Watches Collection",
      description: "Flat 20% Discount",
      image: "https://wallpaperaccess.com/full/2067412.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "LED TVs Mega Sale",
      description: "Save up to 30%",
      image: "https://www.pngitem.com/pimgs/m/218-2183392_43-haier-led-tv-hd-png-download.png",
      link: "#",
    },
    {
      id: 4,
      title: "Branded Shoes",
      description: "Buy 1 Get 1 Free",
      image: "https://wallpaperaccess.com/full/1597802.jpg",
      link: "#",
    },
    {
      id: 5,
      title: "Furniture Fest",
      description: "Up to 40% Off",
      image: "https://c4.wallpaperflare.com/wallpaper/535/938/448/design-furniture-interior-living-room-living-room-hd-wallpaper-preview.jpg",
      link: "#",
    },
    {
      id: 6,
      title: "Latest Laptops",
      description: "Save up to 15%",
      image: "http://getwallpapers.com/wallpaper/full/b/3/b/810362-new-hp-laptop-wallpapers-2880x1800-hd.jpg",
      link: "#",
    },
    {
      id: 7,
      title: "Women's Accessories",
      description: "Starting at just ₹199",
      image: "https://freedesignfile.com/upload/2017/06/Fashion-summer-women-and-cosmetics-and-accessories-HD-picture-06.jpg",
      link: "#",
    },
    {
      id: 8,
      title: "Household Goods",
      description: "Up to 35% Off",
      image: "https://i.pinimg.com/originals/0a/88/94/0a8894c01a8f02b34e8c909ee2e6fcbb.png",
      link: "#",
    },
    {
      id: 9,
      title: "Kids Zone Special",
      description: "Offers up to 25% Off",
      image: "https://content.jdmagicbox.com/comp/mumbai/x3/022pxx22.xx22.171222182840.s7x3/catalogue/kids-zone-bhayandar-east-mumbai-toy-shops-wjpga.jpg",
      link: "#",
    },
    {
      id: 10,
      title: "Sports Goods Sale",
      description: "Flat 18% Discount",
      image: "http://wallpapercave.com/wp/wp1852950.jpg",
      link: "#",
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto mt-4 px-4 lg:px-0">
        {/* ✅ Exclusive Heading */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold">Exclusive</h1>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* ✅ Sidebar Categories */}
          <div className="hidden lg:block col-span-1 border-r pr-4">
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center cursor-pointer hover:text-blue-600 transition"
                >
                  {category}
                  <FiChevronRight />
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Slider */}
          <div className="col-span-4 lg:col-span-3">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop
              className="rounded-lg overflow-hidden"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-[892px] h-[344px] object-cover mx-auto"
                    />
                    <div className="absolute top-1/3 left-10 transform -translate-y-1/2 text-white">
                      <h2 className="text-3xl md:text-4xl font-semibold">
                        {slide.title}
                      </h2>
                      <p className="mt-2 md:text-lg">{slide.description}</p>
                      <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
                        Shop Now <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
