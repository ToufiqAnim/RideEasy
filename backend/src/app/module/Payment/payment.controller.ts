import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import paymentService from "./payment.service";
import httpStatus from "http-status";

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

export default {
  initiatePayment,
};
