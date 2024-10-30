import { JwtPayload } from "jsonwebtoken";
import { IBooking } from "./Booking.interface";
import { Users } from "../User/user.model";
import ApiError from "../../../errors/ApiError";
import { Bookings } from "./Booking.model";
import CarModel from "../Cars/car.model";

const CreateBooking = async (bookingData: IBooking, payload: JwtPayload) => {
  const { startDate, endDate, carId } = bookingData;

  // Verify user existence
  const user = await Users.isUserExist(payload.email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Data Found");
  }
  const carData = await CarModel.findById(carId);

  if (!carData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Facility not found");
  }

  // Check for booking availability
  /*   const existingBooking = await Bookings.findOne({
    carId,
    $or: [
      { startDate: { $lt: endDate, $gte: startDate } },
      { endDate: { $gt: startDate, $lte: endDate } },
    ],
  });

  if (existingBooking) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Facility is unavailable during the requested time slot"
    );
  } */

  // Payable Amount Calculation
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the number of days
  const timeDifference = end.getTime() - start.getTime();
  const days = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Calculate days

  const payableAmount = days * carData.pricing; // Calculate based on price per day

  // Create new booking
  const newBooking = await Bookings.create({
    ...bookingData,
    userId: user._id,
    totalAmount: payableAmount,
  });

  // Populate user and car data after creating the booking
  /*   const populatedBooking = await Bookings.findById(newBooking._id)
    .populate("userId")
    .populate("carId"); */

  return newBooking;
};

export const BookingService = {
  CreateBooking,
};
