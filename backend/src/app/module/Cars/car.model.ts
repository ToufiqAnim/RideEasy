import { Schema, model } from "mongoose";
import { Car } from "./car.interface";

const carSchema = new Schema<Car>({
  make: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  features: [{ type: String }],
  specifications: {
    mileage: { type: String, required: true },
    topSpeed: { type: String },
    acceleration: { type: String },
    engine: { type: String },
    horsepower: { type: String },
    transmission: { type: String, required: true },
    capacity: { type: String, required: true },
  },
  pricing: {
    daily: { type: Number, required: true },
    weekly: { type: Number, required: true },
    monthly: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  availability: { type: Boolean, required: true },
  images: [{ type: String }],
});

const CarModel = model<Car>("Car", carSchema);

export default CarModel;
