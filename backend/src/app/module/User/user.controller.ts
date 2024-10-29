import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { IUser } from "./User.interface";
import { UserServices } from "./user.services";

const GetAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.GetAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users Retrived successful",
    data: result,
  });
});
const GetUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserServices.GetUserById(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Operation successful",
    data: result,
  });
});
const DeleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserServices.DeleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Operation successful",
  });
});
const UpdateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await UserServices.UpdateUser(id, updateData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Operation successful",
  });
});
const GetUserProfile = catchAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    return;
  }
  const user = req.user;

  const result = await UserServices.GetUserProfile(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Operation successful",
  });
});

export const UserController = {
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  GetUserProfile,
};
