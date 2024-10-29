import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../healpers/jwtHelpers";
import { IUser } from "../User/User.interface";
import { Users } from "../User/user.model";
import { TLoginResponse, TUserLogin } from "./auth.interface";

const CreateUser = async (user: IUser): Promise<IUser> => {
  const createUser = Users.create(user);
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
  const { _id, name, email: userEmail } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, name, userEmail },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id, name, userEmail },
    config.jwt.refresh as Secret,
    config.jwt.refresh_expires_in as string
  );
  const user = {
    id: isUserExist._id,
    name: isUserExist.name,
  };
  return {
    accessToken,
    refreshToken,
    user,
  };
};
export const AuthService = {
  CreateUser,
  Login,
  RefreshToken,
};
