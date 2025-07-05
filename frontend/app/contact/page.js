"use client";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Call To Us</h2>
            <p className="text-gray-600 mb-2">We are available 24/7, 7 days a week.</p>
            <p className="text-gray-900 font-bold">Phone: +91 7355534404</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Write to US</h2>
            <p className="text-gray-600 mb-2">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-gray-900 font-bold">Emails:</p>
            <p className="text-gray-600">irshad1554@gmail.com</p>
            <p className="text-gray-600">Mr.Sidsir@exclusive.com</p>
          </div>
        </div>
        <form className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Your Name *" className="border border-gray-300 rounded px-4 py-2 w-full" required />
            <input type="email" placeholder="Your Email *" className="border border-gray-300 rounded px-4 py-2 w-full" required />
            <input type="tel" placeholder="Your Phone *" className="border border-gray-300 rounded px-4 py-2 w-full" required />
          </div>
          <textarea placeholder="Your Message" className="border border-gray-300 rounded px-4 py-2 w-full min-h-[100px]" required></textarea>
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">Send Message</button>
        </form>
      </div>
    </div>
  );
} 