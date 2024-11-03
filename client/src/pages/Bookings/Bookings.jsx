import React from "react";
import SelectedCar from "./SelectedCar";
import { useParams } from "react-router-dom";

const Bookings = () => {
  const { carId } = useParams();
  console.log(carId);
  return (
    <div>
      <SelectedCar carId={carId} />
    </div>
  );
};

export default Bookings;
