import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/feature/authSlice";
import { useCreateBookingsMutation } from "../../redux/api/bookings/bookingApi";
import { toast } from "sonner";

const BookingForm = ({ showModal, setShowModal }) => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { id: carId } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createBooking, { isLoading, isSuccess, isError, error }] =
    useCreateBookingsMutation();
  if (!user) {
    navigate("/signin");
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBooking({
        userId: user._id,
        carId,
        startDate,
        endDate,
      }).unwrap();

      toast.success("Booking successful!");
      setShowModal(false);
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(
        `Booking failed: ${err.message || "An unknown error occurred"}`
      );
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">Book this Car</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="startDate"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="endDate"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#ff3600] text-white py-2 px-4 rounded-lg hover:bg-orange-600"
              >
                {isLoading ? "Booking..." : "Book Now"}
              </button>

              {isSuccess && (
                <p className="text-green-500 mt-4">Booking successful!</p>
              )}
              {isError && (
                <p className="text-red-500 mt-4">
                  Failed to book the car: {error?.data?.message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
