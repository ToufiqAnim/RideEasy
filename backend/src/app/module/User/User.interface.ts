import { Model } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user";

// types/user.ts
export interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: ENUM_USER_ROLE;
}
export type IFindUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: ENUM_USER_ROLE;
};
export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IFindUser, "_id" | "name" | "email" | "password" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
