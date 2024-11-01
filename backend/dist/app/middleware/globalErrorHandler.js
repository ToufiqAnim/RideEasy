"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const config_1 = __importDefault(require("../../config"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500; // Default status code
    let message = "Something went wrong!!!";
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === "validationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode || 400; // Use a fallback
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "castError") {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode || 400; // Use a fallback
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode || 400; // Use a fallback
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500; // Use a fallback
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [{ path: "", message: error.message }]
            : [];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorMessages = error.message ? [{ path: "", message: error.message }] : [];
    }
    // Send the response with a valid status code
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== "production" ? error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
