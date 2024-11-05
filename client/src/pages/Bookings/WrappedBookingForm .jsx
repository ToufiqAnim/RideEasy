// WrappedBookingForm.jsx
import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BookingForm from "./BookingForm";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe("your-public-stripe-key");

const WrappedBookingForm = ({ showModal, setShowModal }) => {
  const [bookingId, setBookingId] = useState(null);
  const [amount, setAmount] = useState(0); // You can set the amount based on your business logic

  const handleBookingComplete = (newBookingId) => {
    setBookingId(newBookingId);
    // Optionally set the amount based on your logic
    // setAmount(calculatedAmount);
  };

  return (
    <Elements stripe={stripePromise}>
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box relative max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Book this Car
            </h2>
            <BookingForm
              setShowModal={setShowModal}
              onBookingComplete={handleBookingComplete}
            />
            {bookingId && amount > 0 && (
              <PaymentForm
                bookingId={bookingId}
                amount={amount}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </div>
      )}
    </Elements>
  );
};

export default WrappedBookingForm;
