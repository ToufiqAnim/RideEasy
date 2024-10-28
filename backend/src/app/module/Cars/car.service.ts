import { carSearchableFields, ICar, ICarFilters } from "./car.interface";
import CarModel from "./car.model";

const createCar = async (carData: ICar): Promise<ICar> => {
  const newCar = await CarModel.create(carData);
  return newCar;
};

const GetAllCars = async (filters: ICarFilters): Promise<ICar[]> => {
  const { searchTerm, ...filterData } = filters;
  const filterConditions = [];

  // Search by model
  if (searchTerm) {
    filterConditions.push({
      $or: carSearchableFields.map((field) => ({
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
  const queryConditions =
    filterConditions.length > 0 ? { $and: filterConditions } : {};

  // Fetch results
  const result = await CarModel.find(queryConditions);
  return result;
};
const GetSingleCar = async (carId: string): Promise<ICar | null> => {
  const car = CarModel.findById(carId);
  if (!car) {
    throw new Error("No Car Found");
  }
  return car;
};
const DeleteCar = async (carId: string): Promise<ICar | null> => {
  const car = CarModel.findByIdAndDelete(carId);
  if (!car) {
    throw new Error("No Car Found");
  }
  return car;
};
const UpdateCar = async (carId: string): Promise<ICar | null> => {
  const car = CarModel.findByIdAndUpdate(carId);
  if (!car) {
    throw new Error("No Car Found");
  }
  return car;
};
export const CarService = {
  createCar,
  GetAllCars,
  GetSingleCar,
  DeleteCar,
  UpdateCar,
};
