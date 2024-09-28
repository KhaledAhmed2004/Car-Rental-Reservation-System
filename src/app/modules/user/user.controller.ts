import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";
import { TUserCreate } from "./user.interface";

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

const getUserById: RequestHandler = catchAsync(async (req, res) => {
  console.log("Fetching user with ID:", req?.params?.id);
  const userId = req.params.id; // Get the userId from the URL
  const user = await UserServices.getUserById(userId); // Fetch user by ID

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

// const updateUser: RequestHandler = catchAsync(async (req, res) => {
//   const userId = req.params.id; // Get the userId from the URL
//   const userData = req.body; // Get the updated user data from the request body

//   const updatedUser = await UserServices.updateUserById(userId, userData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User updated successfully",
//     data: updatedUser,
//   });
// });

// const updateUser: RequestHandler = catchAsync(async (req, res) => {
//   const userId = req.params.id; // Get the userId from the URL
//   const userData: Partial<TUserCreate> = req.body; // Get the updated user data from the request body

//   // Update the user, allowing for status and role updates
//   const updatedUser = await UserServices.updateUserById(userId, userData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User updated successfully",
//     data: updatedUser,
//   });
// });

// Update user details
const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const userData: Partial<TUserCreate> = req.body;

  const updatedUser = await UserServices.updateUserById(userId, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const userData = await req?.body;

  const user = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

const singIn: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.signIn(req?.body);
  const { refreshtoken, user, token } = result;
  res.cookie("refreshtoken", refreshtoken, {
    secure: config.NODE_ENV === "development",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: {
      user,
      token,
    },
  });
});
// const refreshToken: RequestHandler = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await UserServices.refreshToken(refreshToken);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Assess token is retrive succesfully!",
//     data: result,
//   });
// });

export const UserControllers = {
  createUser,
  singIn,
  getAllUsers,
  getUserById,
  updateUser,
};
