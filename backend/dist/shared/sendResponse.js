"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    const statusCode = data.statusCode || 200; //
    const responseData = {
        statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null,
        data: data.data || null,
    };
    res.status(statusCode).json(responseData);
};
exports.sendResponse = sendResponse;
