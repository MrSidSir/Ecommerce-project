"use client";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16">
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">Your visited page not found. You may go home page.</p>
      <a href="/" className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition-colors font-semibold">Back to home page</a>
    </div>
  );
} 