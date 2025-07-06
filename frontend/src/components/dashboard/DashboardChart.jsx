import React from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function DashboardChart({ sales }) {
  // Fallback to dummy data if sales not provided
  const data = sales && sales.length === 12 ? sales : [400, 300, 450, 200, 350, 500, 600, 550, 700, 650, 500, 400];
  const max = Math.max(...data);
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="font-semibold mb-4">Monthly Sales</h3>
      <div className="flex items-end h-40 gap-2">
        {data.map((value, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1">
            <div
              className={`w-6 rounded-t-lg ${idx === 2 ? "bg-purple-600" : "bg-gray-200"}`}
              style={{ height: `${max ? (value / max) * 100 : 0}%` }}
            ></div>
            <span className="text-xs mt-2 text-gray-500">{months[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 