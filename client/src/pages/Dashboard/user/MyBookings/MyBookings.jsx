import { useGetAllBookingsByUserQuery } from "../../../../redux/api/bookings/bookingApi";
import { useGetAllCarQuery } from "../../../../redux/api/car/carApi";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { data: bookings, isFetching: isFetchingBookings } =
    useGetAllBookingsByUserQuery();
  const { data: cars } = useGetAllCarQuery();

  if (isFetchingBookings) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
      {bookings?.data && bookings?.data.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Car</th>
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Start Date</th>
              <th className="py-3 px-6 text-left">End Date</th>
              <th className="py-3 px-6 text-left">Total Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Payment Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {bookings?.data.map((booking) => {
              const car = cars?.data?.find(
                (car) => car._id === booking.carId?._id
              );

              const userId =
                typeof booking.userId === "object"
                  ? booking.userId.email
                  : booking.userId;

              return (
                <tr
                  key={booking._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">
                    {car ? `${car?.make} ${car.model}` : "N/A"}
                  </td>
                  <td className="py-3 px-6">{userId}</td>
                  <td className="py-3 px-6">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    {booking.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-6">{booking.status}</td>
                  <td className="py-3 px-6">{booking.paymentStatus}</td>
                  <td className="py-3 px-6">
                    <Link to={`${booking._id}`}>
                      <button className="btn btn-primary">Details</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
