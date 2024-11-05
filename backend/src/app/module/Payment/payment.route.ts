import express from "express";
import paymentController from "./payment.controller";

const router = express.Router();

router.post("/initiate", paymentController.initiatePayment);
router.post("/confirm", paymentController.ConfirmPayment);

export const PaymentRoutes = router;
