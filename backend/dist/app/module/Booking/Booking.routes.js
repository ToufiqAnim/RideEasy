"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const Booking_controller_1 = require("./Booking.controller");
const router = express_1.default.Router();
router.post("/create-bookings", (0, auth_1.default)("user", "admin"), Booking_controller_1.BookingController.CreateBooking);
router.get("/", (0, auth_1.default)("user", "admin"), Booking_controller_1.BookingController.GetAllBookings);
router.get("/user-bookings", (0, auth_1.default)("user", "admin"), Booking_controller_1.BookingController.GetUserBookings);
router.delete("/:id", (0, auth_1.default)("user", "admin"), Booking_controller_1.BookingController.CancelBooking);
exports.BookingRoutes = router;
