"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const car_routes_1 = require("../module/Cars/car.routes");
const auth_route_1 = require("../module/Auth/auth.route");
const user_routes_1 = require("../module/User/user.routes");
const Booking_routes_1 = require("../module/Booking/Booking.routes");
const payment_route_1 = require("../module/Payment/payment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/cars",
        route: car_routes_1.CarRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/bookings",
        route: Booking_routes_1.BookingRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
