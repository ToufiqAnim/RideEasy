import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import { IBooking } from "./Booking.interface";
import { Users } from "../User/user.model";
import ApiError from "../../../errors/ApiError";
import { Bookings } from "./Booking.model";
import CarModel from "../Cars/car.model";
import { Types } from "mongoose";
import Stripe from "stripe";
import config from "../../../config";

const stripe = new Stripe(config.stripe.secretKey as string, {
  apiVersion: "2024-09-30.acacia",
});

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

  // Payable Amount Calculation
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end.getTime() - start.getTime();
  const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const payableAmount = days * carData.pricing;

  // Create a payment intent with Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payableAmount * 100,
    currency: "usd",
    metadata: { bookingId: new Types.ObjectId().toString() },
  });

  console.log("Created payment intent:", paymentIntent);

  // Create new booking
  const newBooking = await Bookings.create({
    ...bookingData,
    userId: user._id,
    totalAmount: payableAmount,
    paymentIntentId: paymentIntent.id,
    status: "pending",
  });

  console.log("Returning clientSecret:", paymentIntent.client_secret);

  return {
    booking: newBooking,
    clientSecret: paymentIntent.client_secret,
  };
};

const GetAllBookings = async () => {
  const result = await Bookings.find({})
    .populate("carId")
    .populate("userId")
    .lean();
  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Data Found");
  }

  return result;
};
const GetUserBookings = async (payload: JwtPayload) => {
  const { _id } = payload;
  console.log("Searching bookings for user ID:", _id);
  const result = await Bookings.find({ userId: _id }).populate("carId");

  if (!result || result.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Data Found");
  }

  return result;
};
const CancelBooking = async (id: string) => {
  const result = await Bookings.findByIdAndUpdate(
    id,
    {
      status: "cancelled",
    },
    {
      new: true,
    }
  ).populate("carId");
  return result;
};
const updateBookingStatus = async (
  bookingId: Types.ObjectId | string, // Allow both types
  status: string
): Promise<IBooking | null> => {
  const updatedBooking = await Bookings.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  );

  return updatedBooking;
};
export const BookingService = {
  CreateBooking,
  GetAllBookings,
  GetUserBookings,
  CancelBooking,
  updateBookingStatus,
};
