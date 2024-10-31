"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const car_interface_1 = require("./car.interface");
const car_model_1 = __importDefault(require("./car.model"));
const createCar = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    const newCar = yield car_model_1.default.create(carData);
    return newCar;
});
const GetAllCars = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const filterConditions = [];
    // Search by model
    if (searchTerm) {
        filterConditions.push({
            $or: car_interface_1.carSearchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: "i" },
            })),
        });
    }
    // Add other filter conditions
    if (Object.keys(filterData).length) {
        filterConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Combine conditions if any exist
    const queryConditions = filterConditions.length > 0 ? { $and: filterConditions } : {};
    // Fetch results
    const result = yield car_model_1.default.find(queryConditions);
    return result;
});
const GetSingleCar = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const car = car_model_1.default.findById(carId);
    if (!car) {
        throw new Error("No Car Found");
    }
    return car;
});
const DeleteCar = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const car = car_model_1.default.findByIdAndDelete(carId);
    if (!car) {
        throw new Error("No Car Found");
    }
    return car;
});
const UpdateCar = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const car = car_model_1.default.findByIdAndUpdate(carId);
    if (!car) {
        throw new Error("No Car Found");
    }
    return car;
});
exports.CarService = {
    createCar,
    GetAllCars,
    GetSingleCar,
    DeleteCar,
    UpdateCar,
};
