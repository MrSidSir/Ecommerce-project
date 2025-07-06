"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardChart from "@/components/dashboard/DashboardChart";
import DashboardTarget from "@/components/dashboard/DashboardTarget";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:5000/api/dashboard/stats");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const dummyWishlist = [
    {
      id: 1,
      name: "Gucci duffle bag",
      price: 960,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "RGB liquid CPU Cooler",
      price: 1960,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop",
    },
  ];
  const dummyCart = [
    {
      id: 3,
      name: "GP11 Shooter USB Gamepad",
      price: 550,
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=300&fit=crop",
    },
  ];

  return (
    <DashboardLayout>
      {loading && <div className="text-center py-10">Loading dashboard...</div>}
      {error && <div className="text-center text-red-600 py-10">{error}</div>}
      {data && (
        <>
          <DashboardStats stats={{
            customers: data.customers,
            customersChange: data.customersChange,
            orders: data.orders,
            ordersChange: data.ordersChange,
          }} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <DashboardChart sales={data.monthlySales} />
            </div>
            <div>
              <DashboardTarget percent={((data.revenue / data.target) * 100).toFixed(2)} change={data.customersChange} target={data.target} revenue={data.revenue} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Wishlist Section */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">Wishlist</h3>
              <div className="flex flex-col gap-4">
                {dummyWishlist.map(product => (
                  <div key={product.id} className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-red-500 font-bold">${product.price}</div>
                    </div>
                    <a href={`/product/${product.id}`} className="bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800">Go to Product</a>
                  </div>
                ))}
              </div>
            </div>
            {/* Cart Section */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">Cart</h3>
              <div className="flex flex-col gap-4">
                {dummyCart.map(product => (
                  <div key={product.id} className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-red-500 font-bold">${product.price}</div>
                    </div>
                    <a href={`/product/${product.id}`} className="bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800">Go to Product</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

