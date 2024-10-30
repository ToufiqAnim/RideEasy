import bcrypt from "bcrypt";
import config from "../../../config";
const hashPassword = async (password: string) => {
  const hashedPass = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  return hashedPass;
};

const matchedPassword = async (password: string, hashPassword: string) => {
  const hashedPass = await bcrypt.compare(password, hashPassword);

  return hashedPass;
};
export const AuthUtils = { hashPassword, matchedPassword };
