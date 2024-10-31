"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
//user
router.get("/:id", (0, auth_1.default)(), user_controller_1.UserController.GetUserById);
router.patch("/:id", (0, auth_1.default)(), user_controller_1.UserController.UpdateUser);
router.delete("/:id", (0, auth_1.default)(), user_controller_1.UserController.DeleteUser);
router.get("/", user_controller_1.UserController.GetAllUsers);
router.get("/my-profile", (0, auth_1.default)(), user_controller_1.UserController.GetUserProfile);
exports.UserRoutes = router;
