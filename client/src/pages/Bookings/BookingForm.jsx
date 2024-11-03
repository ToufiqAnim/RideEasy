import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/feature/authSlice";
import { useCreateBookingsMutation } from "../../redux/api/bookings/bookingApi";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
const stripePromise = loadStripe(
  "pk_test_51JwoPxKpxt7jxnaYKaDS5lQsYEJRDuOGtjvlHALqPPskyjeWhCLJBmQxnkYWyHVS1dY3u3NXHfFQTth554jcSlAP00FsoVRA4u"
);
const BookingForm = ({ showModal, setShowModal }) => {
  const user = useSelector(selectCurrentUser);
  const { id: carId } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createBooking, { isLoading, isSuccess, isError, error }] =
    useCreateBookingsMutation();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create the booking and get the clientSecret from the backend
      const response = await createBooking({
        userId: user._id,
        carId,
        startDate,
        endDate,
      }).unwrap();

      const { clientSecret } = response;
      // Check if clientSecret is defined before proceeding
      if (!clientSecret) {
        console.error("Missing clientSecret from booking response.");
        toast.error("Failed to retrieve payment details. Please try again.");
        return;
      }
      // Step 2: Confirm the payment using Stripe
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        console.error("Payment failed:", paymentResult.error);
        alert(`Payment failed: ${paymentResult.error.message}`);
      } else if (
        paymentResult.paymentIntent &&
        paymentResult.paymentIntent.status === "succeeded"
      ) {
        alert("Booking and payment successful!");
        setShowModal(false);
      }
    } catch (err) {
      console.error("Booking or payment error:", err);
      alert(`Booking failed: ${err.message || "An unknown error occurred"}`);
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

              {/* Stripe Card Element */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Payment Details
                </label>
                <CardElement className="border p-2 rounded w-full" />
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

const WrappedBookingForm = (props) => (
  <Elements stripe={stripePromise}>
    <BookingForm {...props} />
  </Elements>
);

export default WrappedBookingForm;
