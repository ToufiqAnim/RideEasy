import React from "react";
import SelectedCar from "./SelectedCar";
import { useParams } from "react-router-dom";

const Bookings = () => {
  const { carId } = useParams();

  return (
    <div>
      <SelectedCar carId={carId} />
    </div>
  );
};

export default Bookings;
