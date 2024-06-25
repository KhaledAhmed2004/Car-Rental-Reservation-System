import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import { userValidation } from "./user.validators";

const createUser: RequestHandler = async (req, res, next) => {
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

  try {
    const user = await UserServices.createUserIntoDB(userData);
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const singIn: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.signIn(req?.body);
    res.send({
      success: true,
      statusCode: 200,
      message: "User is logged in succesfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createUser,
  singIn,
};
