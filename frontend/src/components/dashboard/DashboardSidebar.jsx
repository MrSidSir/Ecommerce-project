import React from "react";
import { ShoppingCart, Package, User, Calendar, List, Table, FileText, Settings } from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: <List />, active: true },
  { label: "Ecommerce", icon: <ShoppingCart /> },
  { label: "Calendar", icon: <Calendar /> },
  { label: "User Profile", icon: <User /> },
  { label: "Task", icon: <FileText /> },
  { label: "Forms", icon: <Table /> },
  { label: "Tables", icon: <Table /> },
  { label: "Pages", icon: <FileText /> },
  { label: "Settings", icon: <Settings /> },
];

export default function DashboardSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-white border-r shadow-lg p-6">
      <div className="flex items-center mb-10">
        <span className="text-2xl font-bold text-purple-700 mr-2">&#11044;</span>
        <span className="text-xl font-bold">TailAdmin</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, idx) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors font-medium text-gray-700 hover:bg-purple-50 ${item.active ? "bg-purple-100 text-purple-700" : ""}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 