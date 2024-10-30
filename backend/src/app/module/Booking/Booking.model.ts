import mongoose, { Schema, Document } from "mongoose";
import { IBooking } from "./Booking.interface";

const BookingSchema: Schema<IBooking> = new Schema(
  {
    carId: { type: Schema.Types.ObjectId, ref: "CarModel", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Bookings = mongoose.model<IBooking>("Bookings", BookingSchema);
