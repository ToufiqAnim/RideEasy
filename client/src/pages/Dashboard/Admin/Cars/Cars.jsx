import React from "react";
import { useGetAllCarQuery } from "../../../../redux/api/car/carApi";

const Cars = () => {
  const { data, isFetching } = useGetAllCarQuery(undefined);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const tableData = data?.data?.map(
    ({ _id, make, model, pricing, year, availability }) => ({
      key: _id,
      make,
      model,
      pricing,
      year,
      availability,
    })
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Cars List</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Make</th>
              <th className="px-4 py-2 text-left">Model</th>
              <th className="px-4 py-2 text-left">Pricing</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Availability</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.length > 0 ? (
              tableData.map((car) => (
                <tr key={car.key} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-t">{car.make}</td>
                  <td className="px-4 py-2 border-t">{car.model}</td>
                  <td className="px-4 py-2 border-t">${car.pricing}</td>
                  <td className="px-4 py-2 border-t">{car.year}</td>
                  <td className="px-4 py-2 border-t">
                    {car.availability ? (
                      <span className="badge badge-success">Available</span>
                    ) : (
                      <span className="badge badge-error">Unavailable</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No cars available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cars;
