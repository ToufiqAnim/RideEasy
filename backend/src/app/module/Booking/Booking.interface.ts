import mongoose from "mongoose";

export interface IBooking {
  carId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
