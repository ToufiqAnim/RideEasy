import { carSearchableFields, ICar, ICarFilters } from "./car.interface";
import CarModel from "./car.model";

const createCar = async (carData: ICar): Promise<ICar> => {
  try {
    const newCar = await CarModel.create(carData);
    return newCar;
  } catch (error) {
    throw new Error("Failed to create car");
  }
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

export const CarService = {
  createCar,
  GetAllCars,
};
