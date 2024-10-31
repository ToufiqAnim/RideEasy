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
exports.UserController = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = require("../../../shared/sendResponse");
const user_services_1 = require("./user.services");
const http_status_1 = __importDefault(require("http-status"));
const GetAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.GetAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Users Retrived successful",
        data: result,
    });
}));
const GetUserById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_services_1.UserServices.GetUserById(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Operation successful",
        data: result,
    });
}));
const DeleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_services_1.UserServices.DeleteUser(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Operation successful",
    });
}));
const UpdateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const result = yield user_services_1.UserServices.UpdateUser(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Operation successful",
    });
}));
const GetUserProfile = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return;
    }
    const user = req.user;
    const result = yield user_services_1.UserServices.GetUserProfile(user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Operation successful",
        data: result,
    });
}));
exports.UserController = {
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
    GetUserProfile,
};
