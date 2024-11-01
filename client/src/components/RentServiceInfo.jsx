import React from "react";

const RentServiceInfo = () => {
  return (
    <div className=" mt-14">
      {/* General Information Section */}
      <div className="bg-gray-50  rounded-lg shadow-md">
        <h2 className="text-sm font-semibold text-[#ff3600] mb-2">
          General Information
        </h2>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          About Our Car Service
        </h3>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et urna
          nec quam blandit facilisis. Aenean facilisis erat id bibendum cursus.
          Nullam posuere, magna in venenatis consequat, odio leo ultrices orci,
          vel facilisis libero sapien id metus.
        </p>
        <ul className="space-y-3">
          <li className="flex items-center text-gray-700">
            <span className="mr-2 text-orange-500">✔️</span> 24/7 Roadside
            Assistance
          </li>
          <li className="flex items-center text-gray-700">
            <span className="mr-2 text-orange-500">✔️</span> Free Cancellation &
            Return
          </li>
          <li className="flex items-center text-gray-700">
            <span className="mr-2 text-orange-500">✔️</span> Pay at Pickup
          </li>
        </ul>
      </div>

      {/* Amenities Section */}
      <div className="bg-gray-50  rounded-lg shadow-md my-16">
        <h2 className="text-sm font-semibold text-orange-600 mb-2">
          Amenities
        </h2>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Premium Amenities and Features
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> Music System
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> ABS System
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> Bluetooth
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> Full Boot Space
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> Power Steering
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> Power Windows
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> USB Charger
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> Aux Input
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> Spare Tire
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-orange-500">✔️</span> Toolkit
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentServiceInfo;
