import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUserCreate, TUserSignIn } from "./user.interface";
import { User } from "./user.model";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUserIntoDB = async (userData: TUserCreate) => {
  const create = await User.create(userData);
  return create;
};

const signIn = async (payload: TUserSignIn) => {
  const user = await User.isUserIsExistsByEmail(payload?.email);
  // console.log(user._id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user did not found");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match");
  }
  //create token and send to the client
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_assess_secret as string, {
    expiresIn: "10d",
  });
  return {
    user,
    token,
  };
};
export const UserServices = { createUserIntoDB, signIn };
