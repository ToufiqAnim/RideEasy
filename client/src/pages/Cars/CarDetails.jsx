import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../redux/api/car/carApi"; // Custom hook to get single car data

const CarDetails = () => {
  const { id } = useParams(); // Fetch the car ID from the URL parameters
  const { data, isLoading, error } = useGetSingleCarQuery(id); // Use the custom hook to fetch single car details

  if (isLoading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>Error fetching car details!</div>; // Handle error case
  }

  const carData = data?.data;
  if (!carData) {
    return <div>Car not found!</div>; // Handle case where car is not found
  }

  const {
    make,
    model,
    year,
    type,
    category,
    specifications,
    features,
    pricing,
    images,
    availability,
  } = carData;

  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
      {/* Pricing and Details Sidebar */}
      <div className="bg-white p-6 shadow-lg rounded-lg lg:w-1/3">
        <h1 className="text-4xl font-bold text-[#ff3600] mb-2">
          ${pricing}
          <span className="text-lg font-normal text-gray-500"> / Per Day</span>
        </h1>

        {/* Car Details */}
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">
          {make} {model}
        </h2>
        <p className="text-gray-500">
          {year} | {type} | {category}
        </p>

        {/* Specifications */}
        <div className="text-gray-600 mt-6">
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span>Mileage</span>
            <span>{specifications.mileage}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span>Top Speed</span>
            <span>{specifications.topSpeed}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span>Transmission</span>
            <span>{specifications.transmission}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span>Age</span>
            <span>{specifications.age}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span>Luggage</span>
            <span>{specifications.luggage}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Air Condition</span>
            <span>{specifications.airCondition ? "Yes" : "No"}</span>
          </div>
        </div>

        {/* Features */}
        <h3 className="text-lg font-semibold text-gray-700 mt-6">Features</h3>
        <ul className="text-gray-600 list-disc list-inside mt-2">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        {/* Availability */}
        <div className="mt-6">
          <p
            className={`text-lg font-semibold ${
              availability ? "text-green-500" : "text-red-500"
            }`}
          >
            {availability ? "Available" : "Not Available"}
          </p>
        </div>

        {/* Booking and Contact Buttons */}
        <div className="flex items-center gap-2 mt-6">
          <button className="bg-customBackground text-white py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center gap-2">
            Book Now
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Images Carousel */}
      <div className="carousel lg:w-2/3 w-full">
        {images.map((image, index) => (
          <div
            key={index}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full  overflow-hidden"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[600px] rounded-3xl"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#slide${index === 0 ? images.length : index}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${index + 2 > images.length ? 1 : index + 2}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDetails;
