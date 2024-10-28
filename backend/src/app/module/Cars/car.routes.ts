import express from "express";
import { CarController } from "./car.controller";

const router = express.Router();

router.post("/create-car", CarController.createCar);
router.get("/", CarController.GetAllCars);
router.get("/:carId", CarController.GetSingleCar);
router.delete("/:carId", CarController.DeleteCar);
router.patch("/:carId", CarController.UpdateCar);

export const CarRoutes = router;
