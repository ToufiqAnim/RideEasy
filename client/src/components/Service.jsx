import React from "react";

const Services = () => {
  return (
    <div className="bg-pink-50 py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <p className="text-orange-400 font-semibold">* Our Services</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Explore our wide range of <br className="hidden md:block" /> rental
          services
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {[
          {
            title: "Car Rental With Driver",
            icon: "🚗",
            description:
              "Enhance your rental experience with additional options.",
          },
          {
            title: "Business Car Rental",
            icon: "💼",
            description:
              "Enhance your rental experience with additional options.",
          },
          {
            title: "Airport Transfer",
            icon: "✈️",
            description:
              "Enhance your rental experience with additional options.",
          },
          {
            title: "Chauffeur Services",
            icon: "🧑‍✈️",
            description:
              "Enhance your rental experience with additional options.",
          },
        ].map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl bg-pink-100 rounded-full p-4 mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button className="bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition-colors">
              <span className="text-lg">➔</span>
            </button>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <p className="text-gray-600 max-w-lg mx-auto">
          Discover our range of car rental services designed to meet all your
          travel needs. From a diverse fleet of vehicles to flexible rental
          plans.
        </p>
        <button className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-orange-600 transition-colors mt-12">
          View All Service
        </button>
      </div>
    </div>
  );
};

export default Services;
