import { Model } from "mongoose";

// types/user.ts
export interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}
export type IFindUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
};
export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IFindUser, "_id" | "name" | "email" | "password">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
