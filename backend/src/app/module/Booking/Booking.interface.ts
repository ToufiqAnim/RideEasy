import mongoose from "mongoose";

export interface IBooking {
  carId: { type: mongoose.Schema.Types.ObjectId; ref: "Car" };
  userId: { type: mongoose.Schema.Types.ObjectId; ref: "User" };
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: "confirmed" | "pending" | "cancelled";
  paymentStatus: "succeeded" | "failed" | "pending";
  paymentIntentId?: string;
}
