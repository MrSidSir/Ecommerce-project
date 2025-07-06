import React from "react";

export default function DashboardTarget({ percent = 75.55, change = 10, target = 20000, revenue = 16000 }) {
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center mt-6">
      <h3 className="font-semibold mb-2">Monthly Target</h3>
      <svg height={radius * 2} width={radius * 2} className="mb-2">
        <circle
          stroke="#ede9fe"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#7c3aed"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="text-3xl font-bold">{percent}%</div>
      <div className="text-green-600 text-sm font-semibold flex items-center mb-2">+{change}%</div>
      <div className="text-center text-gray-500 text-sm mb-2">
        You earn ${revenue} today, its higher than last month.<br />Keep up your good work!
      </div>
      <div className="flex justify-between w-full text-xs text-gray-500 mt-2">
        <div>Target<br /><span className="text-red-600 font-bold">${target / 1000}K</span></div>
        <div>Revenue<br /><span className="text-green-600 font-bold">${revenue / 1000}K</span></div>
      </div>
    </div>
  );
} 