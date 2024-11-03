import React from "react";
import { useGetAllCarQuery } from "../../redux/api/car/carApi";

const SelectedCar = ({ carId }) => {
  const { data: cars, isLoading, error } = useGetAllCarQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cars.</p>;

  const car = cars?.data?.find((item) => item._id === carId);
  console.log(car);
  if (!car) return <p>Car not found.</p>;

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <h2 className="text-2xl font-semibold">Car: {car?.model}</h2>
      <p>{car?.description}</p>
      <p className="text-sm text-gray-500">Location: {car?.location}</p>
      <p className="text-sm text-gray-500">Price Per Hour: ${car?.pricing}</p>
    </div>
  );
};

export default SelectedCar;
