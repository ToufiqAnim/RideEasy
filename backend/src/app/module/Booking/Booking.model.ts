import mongoose, { Schema, Document } from "mongoose";
import { IBooking } from "./Booking.interface";

const BookingSchema: Schema<IBooking> = new Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "pending",
    },
    paymentIntentId: { type: String, required: true },
  },

  { timestamps: true }
);

export const Bookings = mongoose.model<IBooking>("Bookings", BookingSchema);
