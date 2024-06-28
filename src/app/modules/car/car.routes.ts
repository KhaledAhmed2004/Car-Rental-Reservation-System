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

router.get("/", CarControllers.getCallCars);
router.get("/:id", CarControllers.getSingleCar);
router.put("/:id", CarControllers.updateCar);
router.delete("/:id", CarControllers.deleteCar);

export const CarRouter = router;
