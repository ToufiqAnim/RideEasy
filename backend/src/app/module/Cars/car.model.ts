import { Schema, model } from "mongoose";
import { ICar } from "./car.interface";

const carSchema = new Schema<ICar>({
  make: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  features: [{ type: String, default: [] }],
  specifications: {
    mileage: { type: String, default: "" },
    topSpeed: { type: String, default: "" },
    acceleration: { type: String, default: "" },
    engine: { type: String, default: "" },
    horsepower: { type: String, default: "" },
    transmission: { type: String, default: "" },
    capacity: { type: String, default: "" },
  },
  pricing: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  images: [{ type: String, default: [] }],
});

const CarModel = model<ICar>("Car", carSchema);

export default CarModel;
