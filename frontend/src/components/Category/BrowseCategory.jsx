'use client';
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

const TopCategories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const categories = [
    {
      id: 1,
      name: "Women's Fashion",
      items: 320,
      image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80",
      discount: "Up to 50%",
      rating: 4.8,
      price: "$199",
    },
    {
      id: 2,
      name: "Men's Fashion",
      items: 280,
      image: "https://images.unsplash.com/photo-1533676802871-c1d3932c0f37?auto=format&fit=crop&w=800&q=80",
      discount: "Up to 40%",
      rating: 4.6,
      price: "$149",
    },
    {
      id: 3,
      name: "Electronics",
      items: 150,
      image: "https://images.unsplash.com/photo-1581093588401-59d6cdebe5b4?auto=format&fit=crop&w=800&q=80",
      discount: "Up to 30%",
      rating: 4.9,
      price: "$299",
    },
    {
      id: 4,
      name: "Home & Lifestyle",
      items: 220,
      image: "https://images.unsplash.com/photo-1599838457545-8350b7a5e768?auto=format&fit=crop&w=800&q=80",
      discount: "Up to 25%",
      rating: 4.7,
      price: "$89",
    },
    {
      id: 5,
      name: "Sports & Outdoor",
      items: 90,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
      discount: "Up to 35%",
      rating: 4.5,
      price: "$129",
    },
    {
      id: 6,
      name: "Beauty & Health",
      items: 180,
      image: "https://images.unsplash.com/photo-1596461404969-9c554f1d1222?auto=format&fit=crop&w=800&q=80",
      discount: "Up to 45%",
      rating: 4.8,
      price: "$69",
    },
    {
      id: 7,
      name: "Jewelry & Watches",
      items: 95,
      image: "https://images.unsplash.com/photo-1600181952084-3e7616f5f79b?auto=format&fit=crop&w=800&q=80",
      discount: "Up to 60%",
      rating: 4.4,
      price: "$249",
    },
    {
      id: 8,
      name: "Books & Stationery",
      items: 210,
      image: "https://in.images.search.yahoo.com/search/images;_ylt=Awr1QZyDJ2NoXFoNTQu9HAx.;_ylu=c2VjA3NlYXJjaARzbGsDYnV0dG9u;_ylc=X1MDMjExNDcyMzAwNQRfcgMyBGZyA21jYWZlZQRmcjIDcDpzLHY6aSxtOnNiLXRvcARncHJpZAN2M095M0V4ZFRXZWRDeGlncUlDWmtBBG5fcnNsdAMwBG5fc3VnZwMwBG9yaWdpbgNpbi5pbWFnZXMuc2VhcmNoLnlhaG9vLmNvbQRwb3MDMARwcXN0cgMEcHFzdHJsAzAEcXN0cmwDNDQEcXVlcnkDQm9va3MlMjAlMjYlMjBTdGF0aW9uZXJ5JTIwb25saW5lJTIwc2hvcHBpbmclMjBoZCUyMGltYWdlcwR0X3N0bXADMTc1MTMyODc4Mw--?p=Books+%26+Stationery+online+shopping+hd+images&fr=mcafee&fr2=p%3As%2Cv%3Ai%2Cm%3Asb-top&ei=UTF-8&x=wrt&type=E210IN885G0#id=4&iurl=https%3A%2F%2Fruknumaiyya.com%2Fwp-content%2Fuploads%2F2023%2F03%2FRukoon-Banner3.webp&action=click",
      discount: "Up to 30%",
      rating: 4.6,
      price: "$39",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) setSlidesToShow(1);
      else if (window.innerWidth < 640) setSlidesToShow(2);
      else if (window.innerWidth < 768) setSlidesToShow(3);
      else if (window.innerWidth < 1024) setSlidesToShow(4);
      else if (window.innerWidth < 1200) setSlidesToShow(5);
      else setSlidesToShow(6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide, slidesToShow]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + 1 >= categories.length - slidesToShow + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev <= 0 ? categories.length - slidesToShow : prev - 1
    );
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Top Categories</h2>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
          View All
        </button>
      </div>

      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-5"
            style={{
              transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`,
              width: `${(categories.length * 100) / slidesToShow}%`,
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 hover:-translate-y-1 group cursor-pointer">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs">
                      {category.discount}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                      {category.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(category.rating)}</div>
                      <span className="text-sm text-gray-600">
                        ({category.rating})
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-2">
                      {category.items} items
                    </p>

                    <div className="text-xl font-bold text-gray-900 mb-3">
                      {category.price}
                    </div>

                    <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array.from(
            { length: Math.ceil(categories.length / slidesToShow) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i * slidesToShow)}
                className={`w-2 h-2 rounded-full ${
                  Math.floor(currentSlide / slidesToShow) === i
                    ? "bg-red-600"
                    : "bg-gray-300"
                }`}
              ></button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
