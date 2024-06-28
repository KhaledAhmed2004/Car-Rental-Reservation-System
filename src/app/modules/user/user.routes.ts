import express from "express";
import { UserControllers } from "./user.controller";
import { userValidation } from "./user.validators";
import validateRequest from "../../Middleware/validateRequest";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createUser
);
router.post("/signin", UserControllers.singIn);

export const AuthRoutes = router;
