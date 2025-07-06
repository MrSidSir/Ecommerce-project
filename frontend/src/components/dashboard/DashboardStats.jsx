import React from "react";
import { ArrowUpRight, ArrowDownRight, Users, Package, ShoppingCart } from "lucide-react";

export default function DashboardStats({ stats }) {
  // Example stats: { customers: 3782, customersChange: 11.01, orders: 5359, ordersChange: -9.05 }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Users className="h-5 w-5" /> Customers
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">{stats.customers}</span>
          <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-semibold">
            <ArrowUpRight className="h-4 w-4 mr-1" /> {stats.customersChange}%
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <ShoppingCart className="h-5 w-5" /> Orders
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">{stats.orders}</span>
          <span className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-semibold">
            <ArrowDownRight className="h-4 w-4 mr-1" /> {stats.ordersChange}%
          </span>
        </div>
      </div>
      {/* Add more cards as needed, e.g. Revenue, Target, etc. */}
    </div>
  );
} 