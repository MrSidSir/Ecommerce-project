"use client";

import React, { useEffect, useState } from "react";

const CategoryOfferSection = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 35,
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
    <div className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-100 rounded-lg">
      {/* Image */}
      <div>
        <img
          src="https://cdn.bdstall.com/product-image/giant_35995.jpeg" // Replace with actual
          alt="Enhance Your Music Experience"
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Content */}
      <div>
        <h4 className="text-red-600 font-semibold mb-2">Categories</h4>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Enhance Your Music Experience
        </h2>

        {/* Countdown timer */}
        <div className="flex space-x-4 mb-6">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-black text-white px-3 py-2 rounded text-center"
            >
              <p className="text-[10px]">{item.label}</p>
              <p className="text-sm font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        <button className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition">
          Buy Now!
        </button>
      </div>
    </div>
  );
};

export default CategoryOfferSection;
