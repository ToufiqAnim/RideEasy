import React, { useRef } from "react";
import { useGetAllCarQuery } from "../../redux/api/car/carApi";
import CarsCard from "./CarsCard";

const Cars = () => {
  const { data, isLoading } = useGetAllCarQuery();
  const carData = data?.data;
  console.log(carData);
  // Reference to the carousel container
  const carouselRef = useRef(null);

  // Function to handle left scroll
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Function to handle right scroll
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 container mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        <span className="text-orange-500">•</span> Our Fleets
      </h2>
      <h3 className="text-4xl font-extrabold mb-8 text-center">
        Explore our perfect and extensive fleet
      </h3>

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="carousel carousel-center rounded-box overflow-hidden mx-auto flex space-x-4"
        >
          {carData?.map((car) => (
            <div
              key={car?._id}
              className="carousel-item flex-shrink-0 w- sm:w-1/2 md:w-1/4"
            >
              <CarsCard car={car} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={scrollLeft}
            className="bg-customBackground text-white p-2 rounded-full w-12 h-12"
          >
            🡸
          </button>
          <button
            onClick={scrollRight}
            className="bg-customBackground text-white p-2 rounded-full w-12 h-12"
          >
            🡺
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cars;
