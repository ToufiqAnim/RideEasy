import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { BookingService } from "./Booking.service";
import { catchAsync } from "../../../shared/catchAsync";
import { JwtPayload } from "jsonwebtoken";

const CreateBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const user = req.user as JwtPayload;

  console.log("User from JWT payload:", user);

  const { booking, clientSecret } = await BookingService.CreateBooking(
    bookingData,
    user
  );

  console.log("Booking and clientSecret returned:", booking, clientSecret);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Booking created successfully",
    data: {
      booking,
      clientSecret,
    },
  });
});

const GetAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.GetAllBookings();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: result,
  });
});
const GetUserBookings = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await BookingService.GetUserBookings(user);
  console.log(result);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Bookings retrieved successfully",
    data: result,
  });
});
const CancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.CancelBooking(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " Booking canceled successfully",
    data: result,
  });
});
const UpdateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  const result = await BookingService.updateBookingStatus(bookingId, status);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: " Booking status updated successfully",
    data: result,
  });
});
export const BookingController = {
  CreateBooking,
  GetAllBookings,
  GetUserBookings,
  CancelBooking,
  UpdateBookingStatus,
};
