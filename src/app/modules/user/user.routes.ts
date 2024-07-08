import express from "express";
import { UserControllers } from "./user.controller";
import { userValidation } from "./user.validators";
import validateRequest from "../../Middleware/validateRequest";
import auth from "../../Middleware/auth";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createUser
);
router.post(
  "/signin",
  validateRequest(userValidation.userSingInValidationSchema),
  UserControllers.singIn
);

export const AuthRoutes = router;
