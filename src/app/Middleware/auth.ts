import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";

const auth = (role: TUserRole) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    // if the token is send from the client
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not othorized person"
      );
    }
    // if the token in valid
    // invalid token
    jwt.verify(
      token,
      config.jwt_assess_secret as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not othorized person"
          );
        }
        const decodedRole = (decoded as JwtPayload)?.role;
        // console.log('thsi: ',(decodedRole && role));
        // console.log("auth: ", role);

        // decoded undefined
        if (decodedRole !== role) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not othorized person"
          );
        }
        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default auth;
