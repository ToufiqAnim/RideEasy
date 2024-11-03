import React, { useState, useEffect } from "react";
import { useGetAllCarQuery } from "../../redux/api/car/carApi";
import CarsCard from "./CarsCard";

const AllCars = () => {
  const { data, isLoading } = useGetAllCarQuery();
  const carData = data?.data;

  const [selectedCarType, setSelectedCarType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredCars, setFilteredCars] = useState(carData || []);
  const [years, setYears] = useState([]);

  const handleCarTypeChange = (event) => {
    setSelectedCarType(event.target.value);
    setSelectedYear("");
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    const filtered = selectedCarType
      ? carData?.filter((car) => car.type === selectedCarType) || []
      : carData || [];

    setFilteredCars(filtered);

    const carYears = [...new Set(filtered.map((car) => car.year.toString()))];

    setYears(carYears);
  }, [selectedCarType, carData]);

  const filteredCarList = selectedYear
    ? filteredCars.filter((car) => car.year.toString() === selectedYear)
    : filteredCars;

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

      <div className="flex justify-end items-center space-x-3 py-8">
        <select
          className="p-3 hover:shadow-xl duration-300 rounded"
          value={selectedCarType}
          onChange={handleCarTypeChange}
        >
          <option value="">Car Types</option>
          {[...new Set(carData?.map((car) => car.type))].map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          className="p-3 hover:shadow-xl duration-300 rounded"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">All Years</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCarList?.map((car) => (
          <div key={car?._id} className="flex-shrink-0">
            <CarsCard car={car} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCars;
