/* eslint-disable react/prop-types */
import React from "react";
import NavigationButton from "../../components/NavigationButton";
import { Link } from "react-router-dom";

const CarsCard = ({ car }) => {
  console.log(car?.images);
  return (
    <div className="p-4 border-gray-200 border rounded-lg hover:shadow-lg transition-shadow w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg">
      <img
        src={car?.images[0]}
        alt={car?.type}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <p className="text-sm font-semibold">{car?.type}</p>
      <p className=" font-bold text-xl  py-1 rounded-full inline-block mb-2">
        <span>{car?.make}</span>
        <span> {car?.model}</span>
      </p>
      <h4 className="text-lg font-semibold">{car.name}</h4>
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-medium">Mileage: </span>
        {car.specifications?.mileage}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        <span className="font-medium">Passengers:</span>{" "}
        {car.specifications.capacity}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">
          ${car.pricing}/<span className="text-sm">Per Day</span>
        </p>
        <Link to={`/cars/${car._id}`}>
          <NavigationButton />
        </Link>
      </div>
    </div>
  );
};

export default CarsCard;
