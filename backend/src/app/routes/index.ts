import express from "express";
import path from "path";
import { CarRoutes } from "../module/Cars/car.routes";
import { AuthRoutes } from "../module/Auth/auth.route";
import { UserRoutes } from "../module/User/user.routes";
import { BookingRoutes } from "../module/Booking/Booking.routes";
import { PaymentRoutes } from "../module/Payment/payment.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
