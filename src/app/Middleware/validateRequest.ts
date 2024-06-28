import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the req.body by wrapping it in an object with a body property                    against the schema
      await schema.parseAsync({ body: req.body });
      // If validation is successful, proceed to the next middleware or route handler
      next();
    } catch (error) {
      // If validation fails, pass the error to the next error-handling middleware
      next(error);
    }
  };
};

export default validateRequest;
