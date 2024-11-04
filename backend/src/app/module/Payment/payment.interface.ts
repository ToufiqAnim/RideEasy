import mongoose from "mongoose";

export interface IPayment {
  bookingId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  status: "succeeded" | "failed" | "pending";
  paymentIntentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
