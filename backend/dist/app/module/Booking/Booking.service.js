"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../User/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const Booking_model_1 = require("./Booking.model");
const car_model_1 = __importDefault(require("../Cars/car.model"));
const mongoose_1 = require("mongoose");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../../config"));
const stripe = new stripe_1.default(config_1.default.stripe.secretKey, {
    apiVersion: "2024-09-30.acacia",
});
const CreateBooking = (bookingData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, carId } = bookingData;
    // Verify user existence
    const user = yield user_model_1.Users.isUserExist(payload.email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    const carData = yield car_model_1.default.findById(carId);
    if (!carData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Facility not found");
    }
    // Payable Amount Calculation
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const days = Math.ceil(timeDifference / (1000 * 3600 * 24));
    const payableAmount = days * carData.pricing;
    // Create a payment intent with Stripe
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: payableAmount * 100,
        currency: "usd",
        metadata: { bookingId: new mongoose_1.Types.ObjectId().toString() },
    });
    console.log("Created payment intent:", paymentIntent);
    // Create new booking
    const newBooking = yield Booking_model_1.Bookings.create(Object.assign(Object.assign({}, bookingData), { userId: user._id, totalAmount: payableAmount, paymentIntentId: paymentIntent.id, status: "pending" }));
    console.log("Returning clientSecret:", paymentIntent.client_secret);
    return {
        booking: newBooking,
        clientSecret: paymentIntent.client_secret,
    };
});
const GetAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Booking_model_1.Bookings.find({})
        .populate("carId")
        .populate("userId")
        .lean();
    if (!result || result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return result;
});
const GetUserBookings = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = payload;
    console.log("Searching bookings for user ID:", _id);
    const result = yield Booking_model_1.Bookings.find({ userId: _id }).populate("carId");
    if (!result || result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return result;
});
const CancelBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Booking_model_1.Bookings.findByIdAndUpdate(id, {
        status: "cancelled",
    }, {
        new: true,
    }).populate("carId");
    return result;
});
const updateBookingStatus = (bookingId, // Allow both types
status) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBooking = yield Booking_model_1.Bookings.findByIdAndUpdate(bookingId, { status }, { new: true });
    return updatedBooking;
});
exports.BookingService = {
    CreateBooking,
    GetAllBookings,
    GetUserBookings,
    CancelBooking,
    updateBookingStatus,
};
