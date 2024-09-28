import express from "express";
import { UserControllers } from "./user.controller";
import { userValidation } from "./user.validators";
import validateRequest from "../../Middleware/validateRequest";
import auth from "../../Middleware/auth";

const router = express.Router();

router.get(
  "/users/:id",
  //  auth,
  UserControllers.getUserById
);

router.put(
  "/users/:id",
  // auth,
  // validateRequest(userValidation.updateUserValidationSchema),
  UserControllers.updateUser
);

router.post(
  "/signup",
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createUser
);
router.get(
  "/users",
  //  auth,
  UserControllers.getAllUsers
);
router.post(
  "/signin",
  validateRequest(userValidation.userSingInValidationSchema),
  UserControllers.singIn
);
// router.post(
//   "/refresh-token",
//   validateRequest(userValidation.refreshtokenValidationSchema),
//   UserControllers.refreshToken
// );

export const AuthRoutes = router;
