// PaymentForm.jsx

import { useDispatch } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  useConfirmPaymentMutation,
  useInitiatePaymentMutation,
} from "../../redux/api/payment/paymentApi";
import {
  setPaymentError,
  setPaymentStatus,
} from "../../redux/feature/paymentSlice";
import { toast } from "sonner";

const PaymentForm = ({ bookingId, amount, setShowModal }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [initiatePayment, { isLoading: isInitiating }] =
    useInitiatePaymentMutation();
  const [confirmPayment, { isLoading: isConfirming }] =
    useConfirmPaymentMutation();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return; // Stripe hasn't loaded yet
    }

    try {
      // Step 2: Initiate payment
      const paymentResponse = await initiatePayment({
        bookingId,
        amount,
      }).unwrap();
      const { clientSecret } = paymentResponse; // Get the client secret from your payment response

      // Step 3: Confirm the payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "Customer Name", // Replace with actual customer name if available
            },
          },
        }
      );

      if (error) {
        dispatch(setPaymentError("Payment failed: " + error.message));
        toast.error("Payment failed: " + error.message);
      } else {
        // Step 4: Confirm payment in your backend
        await confirmPayment({
          paymentIntentId: paymentIntent.id,
          bookingId,
        }).unwrap();
        dispatch(setPaymentStatus("Payment confirmed successfully"));
        setShowModal(false); // Close modal on success
        toast.success("Payment successful!");
      }
    } catch (error) {
      dispatch(setPaymentError("Error: " + error.message));
      toast.error("Payment error: " + error.message);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Payment Details
        </label>
        <CardElement className="input input-bordered w-full mt-1 p-2 border-2 border-gray-300 rounded-md" />
      </div>
      <button
        type="submit"
        className={`btn w-full mt-4 ${
          isInitiating || isConfirming ? "btn-disabled" : "btn-primary"
        }`}
        disabled={isInitiating || isConfirming}
      >
        {isInitiating || isConfirming
          ? "Processing Payment..."
          : "Confirm Payment"}
      </button>
    </form>
  );
};

export default PaymentForm;
