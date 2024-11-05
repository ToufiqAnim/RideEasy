"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
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
const CarModel = (0, mongoose_1.model)("Car", carSchema);
exports.default = CarModel;
