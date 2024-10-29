import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./User.interface";
import { Users } from "./user.model";
import httpStatus from "http-status";

const GetAllUsers = async (): Promise<IUser[] | null> => {
  const users = await Users.find({});
  if (!users) {
    throw new Error("No user found!");
  }
  return users;
};
const GetUserById = async (id: string): Promise<IUser | null> => {
  const user = await Users.findById(id);
  if (!user) {
    throw new Error("No user found!");
  }
  return user;
};
const UpdateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { email, ...updatePayload } = payload;

  // Find user by ID
  const user = await Users.findById(id);
  if (!user) throw new Error("No user found!");

  // Prevent email modification
  if (email && email !== user.email) {
    throw new Error("Updating email is not allowed!");
  }

  // Update user fields and save changes
  Object.assign(user, updatePayload);
  return await user.save();
};
const DeleteUser = async (id: string): Promise<void> => {
  const deletedUser = await Users.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new Error("No user found!");
  }
};
const GetUserProfile = async (user: JwtPayload): Promise<IUser | null> => {
  const { _id } = user;
  const userProfile = await Users.findById(_id).exec();
  return userProfile;
};
export const UserServices = {
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  GetUserProfile,
};
