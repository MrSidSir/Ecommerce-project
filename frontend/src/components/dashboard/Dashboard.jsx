// ✅ WORKING FUNCTION: Dashboard page fetching and displaying stats
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    usersCount: 0,
    productsCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  // ✅ FUNCTION: Fetch dashboard stats on page load
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg">Users</h2>
          <p className="text-2xl font-bold">{stats.usersCount}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg">Products</h2>
          <p className="text-2xl font-bold">{stats.productsCount}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg">Orders</h2>
          <p className="text-2xl font-bold">{stats.ordersCount}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <h2 className="text-lg">Revenue</h2>
          <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}