import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import { userValidation } from "./user.validators";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const userData = await req?.body;

  // Validate user data
  const validation = userValidation.userValidationSchema.safeParse(userData);
  if (!validation.success) {
    return res.status(400).send({
      success: false,
      message: "Validation failed",
      errors: validation.error.errors,
    });
  }

  const user = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

// const createUser: RequestHandler = async (req, res, next) => {
//   const userData = await req?.body;

//   // Validate user data
//   const validation = userValidation.userValidationSchema.safeParse(userData);
//   if (!validation.success) {
//     return res.status(400).send({
//       success: false,
//       message: "Validation failed",
//       errors: validation.error.errors,
//     });
//   }

//   try {
//     const user = await UserServices.createUserIntoDB(userData);

//     sendResponse(res, {
//       statusCode: httpStatus.CREATED,
//       success: true,
//       message: "User registered successfully",
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const singIn: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await UserServices.signIn(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: result,
  });
});

// const singIn: RequestHandler = async (req, res, next) => {
//   try {
//     const result = await UserServices.signIn(req?.body);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "User is logged in succesfully!",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const UserControllers = {
  createUser,
  singIn,
};
