import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { IFindUser, IUser, UserModel } from "./User.interface";
import { ENUM_USER_ROLE } from "../../../enums/user";

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,

      default: ENUM_USER_ROLE.USER,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
      },
    },
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IFindUser, "_id" | "email" | "password"> | null> {
  return await Users.findOne(
    { email },
    { _id: 1, name: 1, email: 1, password: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Pre-save middleware function
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const Users = model<IUser, UserModel>("User", UserSchema);
