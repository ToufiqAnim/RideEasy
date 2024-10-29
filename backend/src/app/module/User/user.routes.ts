import express from "express";

import { UserController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

//user
router.get("/:id", auth(), UserController.GetUserById);
router.patch("/:id", auth(), UserController.UpdateUser);
router.delete("/:id", auth(), UserController.DeleteUser);

router.get("/", UserController.GetAllUsers);
router.get("/my-profile", auth(), UserController.GetUserProfile);

export const UserRoutes = router;
