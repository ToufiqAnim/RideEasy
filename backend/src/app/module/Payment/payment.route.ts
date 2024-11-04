import express from "express";
import paymentController from "./payment.controller";

const router = express.Router();

router.post("/initiate", paymentController.initiatePayment);

export const PaymentRoutes = router;
