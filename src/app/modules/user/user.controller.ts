import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

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
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Assess token is retrive succesfully!",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  singIn,
  refreshToken,
};
