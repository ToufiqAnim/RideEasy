import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../redux/api/car/carApi"; // Custom hook to get single car data
import RentServiceInfo from "../../components/RentServiceInfo";
import PoliciesAccordion from "../../components/PolicyAccordion";

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
    <>
      <div
        className="relative h-80 md:h-96 bg-cover bg-center rounded-3xl overflow-hidden container mx-auto mb-16 brightness-"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/dPvwLqM/cars.webp')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold">{`${make} ${model}`}</h1>
          <nav className="text-sm md:text-base text-gray-300">
            <a href="/" className="hover:text-white">
              Home
            </a>
            /
            <a href="/cars" className="hover:text-white">
              Cars
            </a>
            / <span className="text-orange-500">{`${make} ${model}`}</span>
          </nav>
        </div>
      </div>
      <div className="container mx-auto p-6 px-20 flex flex-col lg:flex-row gap-8">
        {/* Pricing and Details Sidebar */}
        <div className="bg-white p-10 shadow-lg rounded-3xl lg:w-1/3 sticky top-6 h-max">
          <h1 className="text-4xl font-bold  mb-2">
            ${pricing}
            <span className="text-lg font-normal text-gray-500">/ Per Day</span>
          </h1>

          {/* Car Details */}
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">
            {make} {model}
          </h2>
          <p className="text-gray-500">
            {year} | {type} | {category}
          </p>

          {/* Specifications */}
          <div className=" mt-6 text-black  text-[16px]">
            <div className="flex justify-between py-2 border-b ">
              <span>Mileage</span>
              <span>{specifications.mileage}</span>
            </div>
            <div className="flex justify-between py-2 border-b ">
              <span>Passengers</span>
              <span>{specifications.capacity}</span>
            </div>
            <div className="flex justify-between py-2 border-b ">
              <span>Transmission</span>
              <span>{specifications.transmission}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Air Condition</span>
              <span>{specifications.airCondition ? "Yes" : "No"}</span>
            </div>
            {/* Features */}
            <h3 className="text-lg font-semibold text-gray-700 mt-6">
              Features
            </h3>
            <ul className=" list-disc list-inside mt-2 py-2">
              {features.map((feature, index) => (
                <li key={index} className="py-1">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

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
            <button className="bg-[#ff3600] text-white py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center gap-2">
              Book Now
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Images Carousel */}
        <div className="flex flex-col flex-1">
          <div className="carousel  w-full">
            {images.map((image, index) => (
              <div
                key={index}
                id={`slide${index + 1}`}
                className="carousel-item relative w-full rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full rounded-3xl"
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

          <RentServiceInfo />
          <PoliciesAccordion />
        </div>
      </div>
    </>
  );
};

export default CarDetails;
