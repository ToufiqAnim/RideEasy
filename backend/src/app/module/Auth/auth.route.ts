import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/login", AuthController.Login);
router.post("/signup", AuthController.Signup);
router.post("/refresh-token", AuthController.RefreshToken);

export const AuthRoutes = router;
