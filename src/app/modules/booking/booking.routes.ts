import express from "express";
import validateRequest from "../../Middleware/validateRequest";
import { BookingValidation } from "./booking.validator";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookingValidation.createBooking),
  BookingControllers.createBooking
);
router.get("/", BookingControllers.getAllBookings);
export const BookingRouter = router;
