import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TgenericErrorResponse } from "../interface/error";

const handleZodError = (error: ZodError): TgenericErrorResponse => {
  const errorSource: TErrorSource = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1], // last index of issue
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSource,
  };
};

export default handleZodError;
