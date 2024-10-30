import express from "express";
import auth from "../../middleware/auth";
import { BookingController } from "./Booking.controller";

const router = express.Router();

router.post(
  "/create-bookings",
  auth("user", "admin"),
  BookingController.CreateBooking
);
router.get("/", auth("user", "admin"), BookingController.GetAllBookings);
router.get(
  "/user-bookings",
  auth("user", "admin"),
  BookingController.GetUserBookings
);
router.delete("/:id", auth("user", "admin"), BookingController.CancelBooking);
export const BookingRoutes = router;
