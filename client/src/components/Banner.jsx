import React from "react";

const Banner = () => {
  return (
    <div className="relative bg-gray-900 text-white h-[500px] md:h-[600px] lg:h-[800px] flex flex-col items-center container mx-auto md:pt-36 md:rounded-3xl overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center md:rounded-3xl "
        style={{
          backgroundImage:
            "url('https://i.ibb.co/JjJK99J/photo-1484404289410-44b4ebf4026d.jpg')",
          filter: "brightness(0.3)",
        }}
      ></div>

      {/* Main Text Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <p className="text-orange-400 font-semibold text-sm md:text-lg mb-2">
          * Welcome To Car Rent
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold my-4 md:my-8 leading-tight ">
          Looking to save more on <br className="hidden md:block" /> your rental
          car?
        </h1>
        <div className="max-w-xl mx-auto">
          <p className="text-sm md:text-md  mb-4 md:mb-6 lg:mb-10 leading-relaxed ">
            Whether you’re planning a weekend getaway, a business trip, or just
            need a reliable ride for the day, we offer a wide range of vehicles
            to suit your needs.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 md:px-8 lg:px-10 rounded-md text-sm md:text-lg">
            Book A Rental
          </button>
          <button className="bg-white text-gray-900 font-semibold py-2 px-6 md:px-8 lg:px-10 rounded-md text-sm md:text-lg hover:bg-gray-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
