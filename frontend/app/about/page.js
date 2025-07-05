"use client";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Story</h1>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg" alt="About" className="w-full md:w-1/2 rounded-lg object-cover max-h-96" />
        <div className="flex-1">
          <p className="mb-4 text-gray-700">
            Launched in 2025, Exclusive is South Asia's premier online shopping marketplace with an active presence in India. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 50,500 sellers and 500 brands and serves 9 million customers across the region.
          </p>
          <p className="mb-4 text-gray-700">
            Exclusive has more than 3 million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold">95.5k</span>
          <span className="text-gray-500 text-sm mt-1">Sellers active on our site</span>
        </div>
        <div className="bg-red-600 text-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold">65k</span>
          <span className="text-sm mt-1">Monthly Product Sale</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold">55.5k</span>
          <span className="text-gray-500 text-sm mt-1">Customer active on our site</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-bold">25k</span>
          <span className="text-gray-500 text-sm mt-1">Annual gross sale in our site</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="flex flex-col items-center">
          <img src="https://scontent.fdel82-1.fna.fbcdn.net/v/t39.30808-6/513908598_3601952859940677_6075424277098834089_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=hxzxE0k9LQsQ7kNvwFfYzcu&_nc_oc=Admck1dr17h2hetFbUTG39cLORL9oG-N5-_P0--gvdHJm7vTmEWM_WNyeIHOdLR0etk&_nc_zt=23&_nc_ht=scontent.fdel82-1.fna&_nc_gid=KvowdXa7YDpAlKUfClB8AA&oh=00_AfRcJMoOVYfbrYCn9hi_NwH7OsQ4kdETqmFMrS7Oe5C01A&oe=686EA062" alt="Team Member" className="w-32 h-32 rounded-full object-cover mb-4" />
          <span className="font-semibold">Syed Irshad</span>
          <span className="text-gray-500 text-sm">CEO</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://e1.pxfuel.com/desktop-wallpaper/518/291/desktop-wallpaper-handsome-men-beautiful-men.jpg" alt="Team Member" className="w-32 h-32 rounded-full object-cover mb-4" />
          <span className="font-semibold">Mr. Tanveer</span>
          <span className="text-gray-500 text-sm">COO</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://wallpapers.com/images/hd/shahrukh-khan-hd-serious-look-rh739bq5yg927fbe.jpg" alt="Team Member" className="w-32 h-32 rounded-full object-cover mb-4" />
          <span className="font-semibold">Shah Rukh Khan</span>
          <span className="text-gray-500 text-sm">CTO</span>
        </div>
      </div>
    </div>
  );
} 