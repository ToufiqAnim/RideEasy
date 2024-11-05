import { useParams } from "react-router-dom";
import { useGetAllBookingsByAdminQuery } from "../../../../redux/api/bookings/bookingApi";

const AdminBookingDetails = () => {
  const { bookingId } = useParams();
  const { data: allBookings } = useGetAllBookingsByAdminQuery(undefined, {
    skip: !bookingId,
  });
  const singleBookingData = allBookings?.data?.find(
    (item) => item._id === bookingId
  );
  console.log(singleBookingData);
  if (!singleBookingData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const {
    userId,
    startDate,
    endDate,
    paymentStatus,
    status,
    totalAmount,

    carId,
  } = singleBookingData;

  return (
    <div className="p-8 space-y-8">
      {/* Facility Data */}
      <div className="lg:flex xl:flex shadow-lg rounded-lg overflow-hidden">
        <div className="xl:w-1/2">
          <img
            className="w-full h-full object-cover rounded-3xl"
            src={carId?.images[0]}
            alt={carId?.name}
          />
        </div>
        <div className="xl:w-1/2 p-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-4xl font-bold">
              {carId?.make} {carId?.model}
            </h1>
            <p className="text-xl text-gray-600">Category: {carId?.type}</p>
            <p className="text-2xl font-semibold text-green-600">
              ${carId?.pricing}/hour
            </p>
            <p className="text-gray-700">{carId?.availablity}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>Start Time:</strong> {startDate}
          </div>
          <div>
            <strong>End Time:</strong> {endDate}
          </div>

          <div>
            <strong>Payment Status:</strong>
            <span
              className={`badge p-3 text-white ${
                paymentStatus === "succeeded" ? "badge-success" : "badge-error"
              }`}
            >
              {paymentStatus}
            </span>
          </div>
          <div>
            <strong>Booking Status:</strong>
            <span
              className={`badge p-3 text-white  ${
                status === "confirmed" ? "badge-success" : "badge-error"
              }`}
            >
              {status}
            </span>
          </div>
          <div>
            <strong>Payable Amount:</strong>
            <span className="text-xl font-semibold text-green-600">
              ${totalAmount}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">userId Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>Name:</strong> {userId?.name}
          </div>
          <div>
            <strong>Email:</strong> {userId?.email}
          </div>
          <div>
            <strong>Phone Number:</strong> {userId?.phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetails;
