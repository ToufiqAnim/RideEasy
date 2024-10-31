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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const GetAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.Users.find({});
    if (!users) {
        throw new Error("No user found!");
    }
    return users;
});
const GetUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.Users.findById(id);
    if (!user) {
        throw new Error("No user found!");
    }
    return user;
});
const UpdateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload, updatePayload = __rest(payload, ["email"]);
    // Find user by ID
    const user = yield user_model_1.Users.findById(id);
    if (!user)
        throw new Error("No user found!");
    // Prevent email modification
    if (email && email !== user.email) {
        throw new Error("Updating email is not allowed!");
    }
    // Update user fields and save changes
    Object.assign(user, updatePayload);
    return yield user.save();
});
const DeleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield user_model_1.Users.findByIdAndDelete(id);
    if (!deletedUser) {
        throw new Error("No user found!");
    }
});
const GetUserProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const userProfile = yield user_model_1.Users.findById(_id).exec();
    return userProfile;
});
exports.UserServices = {
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
    GetUserProfile,
};
