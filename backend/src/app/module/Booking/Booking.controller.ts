import { JwtPayload } from "jsonwebtoken";

import { sendResponse } from "../../../shared/sendResponse";
import { IBooking } from "./Booking.interface";
import { ObjectId } from "mongoose";
import { Request, Response } from "express";
import { BookingService } from "./Booking.service";
import { catchAsync } from "../../../shared/catchAsync";

const CreateBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const user = req.user as JwtPayload;

  const result = await BookingService.CreateBooking(bookingData, user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

export const BookingController = {
  CreateBooking,
};
