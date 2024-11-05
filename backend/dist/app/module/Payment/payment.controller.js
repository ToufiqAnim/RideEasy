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
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = require("../../../shared/sendResponse");
const payment_service_1 = __importDefault(require("./payment.service"));
const http_status_1 = __importDefault(require("http-status"));
const Booking_service_1 = require("../Booking/Booking.service");
const initiatePayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, amount } = req.body;
    const { clientSecret, paymentIntentId } = yield payment_service_1.default.createPaymentIntent(bookingId, amount);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Payment intent created successfully",
        data: { clientSecret, paymentIntentId },
    });
}));
const ConfirmPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentIntentId, bookingId } = req.body;
    const paymentIntent = yield payment_service_1.default.RetrievePaymentIntent(paymentIntentId);
    if (paymentIntent.status === "succeeded") {
        const updatedBooking = yield Booking_service_1.BookingService.ConfirmBookingPayment(bookingId, "confirmed");
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Payment confirmed successfully",
            data: updatedBooking,
        });
    }
    else {
        throw new Error("Payment not confirmed");
    }
}));
exports.default = {
    initiatePayment,
    ConfirmPayment,
};
