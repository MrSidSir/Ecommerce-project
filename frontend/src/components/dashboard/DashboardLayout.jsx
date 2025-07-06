import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-100 to-pink-100">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-10 bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
} 