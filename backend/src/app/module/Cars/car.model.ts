import { Schema, model } from "mongoose";
import { ICar } from "./car.interface";

const carSchema = new Schema<ICar>({
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
  pricing: { type: Number, required: true },
  availability: { type: Boolean, required: true },
  images: [{ type: String }],
});

const CarModel = model<ICar>("Car", carSchema);

export default CarModel;
