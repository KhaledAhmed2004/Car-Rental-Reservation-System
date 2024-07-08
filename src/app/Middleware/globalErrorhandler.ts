import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handelValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";
export const globalErrohandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  //seting defult valuse
  let statusCode = 500;
  let message = "Somting want wrong!!!";

  let errorSourse: TErrorSource = [
    {
      path: "",
      message: "Somting want wrong!!!",
    },
  ];

  if (error instanceof ZodError) {
    const simplifideError = handleZodError(error);
    statusCode = simplifideError?.statusCode;
    message = simplifideError?.message;
    errorSourse = simplifideError?.errorSource;
  } else if (error?.name === "ValidationError") {
    const simplifideError = handleValidationError(error);
    statusCode = simplifideError?.statusCode;
    message = simplifideError?.message;
    errorSourse = simplifideError?.errorSource;
  } else if (error?.name === "CastError") {
    const simplifideError = handleCastError(error);
    statusCode = simplifideError?.statusCode;
    message = simplifideError?.message;
    errorSourse = simplifideError?.errorSource;
  } else if (error?.code === 11000) {
    const simplifideError = handleDuplicateError(error);
    statusCode = simplifideError?.statusCode;
    message = simplifideError?.message;
    errorSourse = simplifideError?.errorSource;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSourse = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message;
    errorSourse = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  // ultimate returen
  return res.status(statusCode).json({
    success: false,
    message,
    errorSourse,
    stack: config.NODE_ENV === "development" ? error?.stack : null,
    // error,
  });
};
