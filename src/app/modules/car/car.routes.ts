import express from "express";
import validateRequest from "../../Middleware/validateRequest";

import { CarControllers } from "./car.controller";
import { carValidation } from "./car.validators";

const router = express.Router();

router.post(
  "/",
  validateRequest(carValidation.createCarSchema),
  CarControllers.createCar
);

export const CarRouter = router;
