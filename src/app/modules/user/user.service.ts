import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUserCreate, TUserSignIn } from "./user.interface";
import { User } from "./user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { createToken } from "../auth/auth.utils";
import { log } from "console";

const getAllUsers = async () => {
  const users = await User.find(); // Fetch all users from the database
  return users;
};

const createUserIntoDB = async (userData: TUserCreate) => {
  const create = await User.create(userData);
  return create;
};

const signIn = async (payload: TUserSignIn) => {
  const user = await User.isUserIsExistsByEmail(payload?.email);
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
    userId: user._id as string,
    role: user.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_assess_secret as string,
    "1d"
  );

  const refreshtoken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    "365d"
  );

  return {
    user,
    token,
    refreshtoken,
  };
};

const getUserById = async (userId: string) => {
  const user = await User.findById(userId); // Find the user by ID in the database
  return user;
};

const updateUserById = async (
  userId: string,
  userData: Partial<TUserCreate>
) => {
  console.log("Updating user:", userId, userData); // Debugging line
  const updatedUser = await User.findByIdAndUpdate(userId, userData, {
    new: true,
    // runValidators: true,
  });
  console.log("Updated user:", updatedUser); // Debugging line
  return updatedUser;
};

// const updateUserById = async (
//   userId: string,
//   userData: Partial<TUserCreate>
// ) => {
//   const updatedUser = await User.findByIdAndUpdate(userId, userData, {
//     new: true, // Return the updated user data
//     runValidators: true, // Ensure the update respects the schema validation rules
//   });
//   return updatedUser;
// };

// const updateUserById = async (
//   userId: string,
//   userData: Partial<TUserCreate>
// ) => {
//   const updatedUser = await User.findByIdAndUpdate(userId, userData, {
//     new: true, // Return the updated user data
//     // runValidators: true, // Ensure the update respects the schema validation rules
//   });
//   return updatedUser;
// };

// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_secret as string
//   ) as JwtPayload;

//   const user = await User.isUserIsExistsByEmail(payload?.email);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "This user did not found");
//   }

//   const jwtPayload = {
//     userId: user._id as string,
//     role: user.role,
//   };
//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_assess_secret as string,
//     "1d"
//   );

//   return {
//     accessToken,
//   };
// };

export const UserServices = {
  createUserIntoDB,
  signIn,
  getAllUsers,
  getUserById,
  updateUserById,
};
