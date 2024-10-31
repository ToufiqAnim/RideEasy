"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
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
const CarModel = (0, mongoose_1.model)("Car", carSchema);
exports.default = CarModel;
