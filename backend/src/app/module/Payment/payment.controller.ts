import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import paymentService from "./payment.service";
import httpStatus from "http-status";
import Stripe from "stripe";
import { BookingService } from "../Booking/Booking.service";

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
  const { bookingId, amount } = req.body;

  const { clientSecret, paymentIntentId } =
    await paymentService.createPaymentIntent(bookingId, amount);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment intent created successfully",
    data: { clientSecret, paymentIntentId },
  });
});
const ConfirmPayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentIntentId, bookingId } = req.body;

  const paymentIntent =
    await paymentService.RetrievePaymentIntent(paymentIntentId);

  if (paymentIntent.status === "succeeded") {
    const updatedBooking = await BookingService.ConfirmBookingPayment(
      bookingId,
      "confirmed"
    );

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment confirmed successfully",
      data: updatedBooking,
    });
  } else {
    throw new Error("Payment not confirmed");
  }
});
export default {
  initiatePayment,
  ConfirmPayment,
};
