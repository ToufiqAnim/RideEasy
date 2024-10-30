import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";

import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../healpers/jwtHelpers";
import { IUser } from "../User/User.interface";
import { Users } from "../User/user.model";
import { TLoginResponse, TUserLogin } from "./auth.interface";
import { AuthUtils } from "./Auth.utils";

const SignUp = async (payload: IUser): Promise<IUser> => {
  payload.password = await AuthUtils.hashPassword(payload.password);
  const createUser = Users.create(payload);
  if (!createUser) {
    throw new Error("Failed to create user");
  }
  return createUser;
};
const Login = async (payload: TUserLogin): Promise<TLoginResponse> => {
  const { email, password } = payload;
  // user exist
  const isUserExist = await Users.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (
    isUserExist.password &&
    !(await Users.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, "Password is incorrect");
  }
  // access token
  const { _id, name, email: userEmail, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, name, userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id, name, userEmail, role },
    config.jwt.refresh as Secret,
    config.jwt.refresh_expires_in as string
  );
  const user = {
    id: isUserExist._id,
    name: isUserExist.name,
    role: isUserExist.role,
  };
  return {
    accessToken,
    refreshToken,
    user,
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
  const { userEmail } = verifiedToken;

  const isUserExist = await Users.isUserExist(userEmail);
  if (!isUserExist) {
    const error = new ApiError(httpStatus.FORBIDDEN, "User not exist");
    return error;
  }

  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      userEmail: isUserExist.email,
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
