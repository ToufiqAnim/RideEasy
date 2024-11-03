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
exports.BookingController = void 0;
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const Booking_service_1 = require("./Booking.service");
const catchAsync_1 = require("../../../shared/catchAsync");
const CreateBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = req.body;
    const user = req.user;
    console.log("User from JWT payload:", user);
    const { booking, clientSecret } = yield Booking_service_1.BookingService.CreateBooking(bookingData, user);
    console.log("Booking and clientSecret returned:", booking, clientSecret);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Booking created successfully",
        data: {
            booking,
            clientSecret,
        },
    });
}));
const GetAllBookings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Booking_service_1.BookingService.GetAllBookings();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Bookings retrieved successfully",
        data: result,
    });
}));
const GetUserBookings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield Booking_service_1.BookingService.GetUserBookings(user);
    console.log(result);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User Bookings retrieved successfully",
        data: result,
    });
}));
const CancelBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Booking_service_1.BookingService.CancelBooking(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: " Booking canceled successfully",
        data: result,
    });
}));
const UpdateBookingStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.params;
    const { status } = req.body;
    const result = yield Booking_service_1.BookingService.updateBookingStatus(bookingId, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: " Booking status updated successfully",
        data: result,
    });
}));
exports.BookingController = {
    CreateBooking,
    GetAllBookings,
    GetUserBookings,
    CancelBooking,
    UpdateBookingStatus,
};
