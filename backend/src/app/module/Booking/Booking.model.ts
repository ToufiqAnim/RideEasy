import mongoose, { Schema, Document } from "mongoose";
import { IBooking } from "./Booking.interface";

const BookingSchema: Schema<IBooking> = new Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["succeeded", "failed", "pending"],
      default: "pending",
    },
    paymentIntentId: { type: String },
  },

  { timestamps: true }
);

export const Bookings = mongoose.model<IBooking>("Bookings", BookingSchema);
