export type TUserLogin = {
  email: string;
  password: string;
};
export type TLoginResponse = {
  accessToken: string;
  user: object;
  refreshToken?: string;
};
