import express from "express";
import auth from "../../middleware/auth";
import { BookingController } from "./Booking.controller";

const router = express.Router();

router.post(
  "/create-bookings",

  BookingController.CreateBooking
);
export const BookingRoutes = router;
