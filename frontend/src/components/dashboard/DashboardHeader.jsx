import React from "react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <div className="flex items-center gap-2">
        <button className="md:hidden p-2 rounded hover:bg-gray-100">
          <span className="sr-only">Open sidebar</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <input
          type="text"
          placeholder="Search or type command..."
          className="w-64 px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-200"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded hover:bg-gray-100">
          <span className="sr-only">Toggle dark mode</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
        </button>
        <button className="p-2 rounded hover:bg-gray-100">
          <span className="sr-only">Notifications</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="font-bold text-gray-600">E</span>
        </div>
      </div>
    </header>
  );
} 