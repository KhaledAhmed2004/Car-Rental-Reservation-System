import mongoose from "mongoose";
import { TErrorSource, TgenericErrorResponse } from "../interface/error";

const handleCastError = (
  error: mongoose.Error.CastError
): TgenericErrorResponse => {
  const errorSource: TErrorSource = [
    { path: error.path, message: error.message },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid ID",
    errorSource,
  };
};
export default handleCastError;
