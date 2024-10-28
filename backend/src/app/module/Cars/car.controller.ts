import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { CarService } from "./car.service";
import { carSearchableFields, ICar, ICarFilters } from "./car.interface";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const createCar = catchAsync(async (req: Request, res: Response) => {
  const carData: ICar = req.body;
  const result = await CarService.createCar(carData);

  sendResponse<ICar>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car created successfully",
    data: result,
  });
});

const GetAllCars = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters = pick(req.query, carSearchableFields);

    const result = await CarService.GetAllCars(filters);
    sendResponse<ICar[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cars retrieved successfully",
      data: result,
    });
  }
);
const GetSingleCar = catchAsync(async (req: Request, res: Response) => {
  const carId = req.params.carId;
  const result = await CarService.GetSingleCar(carId);
  sendResponse<ICar>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car retrieved successfully",
    data: result,
  });
});
const DeleteCar = catchAsync(async (req: Request, res: Response) => {
  const carId = req.params.carId;
  const result = await CarService.DeleteCar(carId);
  sendResponse<ICar>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car Deleted successfully",
  });
});
const UpdateCar = catchAsync(async (req: Request, res: Response) => {
  const carId = req.params.carId;
  const result = await CarService.UpdateCar(carId);
  sendResponse<ICar>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car Updated successfully",
    data: result,
  });
});

export const CarController = {
  createCar,
  GetAllCars,
  GetSingleCar,
  DeleteCar,
  UpdateCar,
};
