import Stripe from "stripe";
import config from "../../../config";

const stripe = new Stripe(config.stripe.secretKey as string, {
  apiVersion: "2024-09-30.acacia",
});

const createPaymentIntent = async (bookingId: string, amount: number) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
    metadata: { bookingId },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
};
const RetrievePaymentIntent = async (paymentIntentId: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return paymentIntent;
};

export default {
  createPaymentIntent,
  RetrievePaymentIntent,
};
