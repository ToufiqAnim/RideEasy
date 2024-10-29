import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../healpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    req.user = verifiedUser;
  } catch (error) {
    next(error);
  }
};