import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";

import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../healpers/jwtHelpers";
import { IUser } from "../User/User.interface";
import { Users } from "../User/user.model";
import { TLoginResponse, TUserLogin } from "./auth.interface";

const SignUp = async (payload: IUser): Promise<IUser> => {
  const createUser = Users.create(payload);
  if (!createUser) {
    throw new Error("Failed to create user");
  }
  return createUser;
};
const Login = async (payload: TUserLogin): Promise<TLoginResponse> => {
  // user exist
  const isUserExist = await Users.isUserExist(payload.email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  // Compare entered password with the stored hash
  if (
    isUserExist.password &&
    !(await Users.isPasswordMatched(payload.password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, "Password is incorrect");
  }
  // access token
  const { _id, name, email, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, name, email, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, name, email, role },
    config.jwt.refresh as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user: { id: _id, name, role },
  };
};
const RefreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  // checking deleted user's refresh token
  const { email } = verifiedToken;

  const isUserExist = await Users.isUserExist(email);
  if (!isUserExist) {
    const error = new ApiError(httpStatus.FORBIDDEN, "User not exist");
    return error;
  }

  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      email: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = {
  SignUp,
  Login,
  RefreshToken,
};
