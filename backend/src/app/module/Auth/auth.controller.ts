import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { IUser } from "../User/User.interface";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../../shared/sendResponse";
import config from "../../../config";
import { TLoginResponse } from "./auth.interface";

const Signup = catchAsync(async (req: Request, res: Response) => {
  const data: IUser = req.body;
  const result = await AuthService.SignUp(data);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Created successful",
    data: result,
  });
});
const Login = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AuthService.Login(data);
  const { refreshToken, ...other } = result;
  const cookieOption = {
    sequre: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refeshtoken", refreshToken, cookieOption);
  sendResponse<TLoginResponse>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});
const RefreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.RefreshToken(refreshToken);

  const cookieOption = {
    sequre: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refeshtoken", refreshToken, cookieOption);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});
export const AuthController = {
  Signup,
  Login,
  RefreshToken,
};
