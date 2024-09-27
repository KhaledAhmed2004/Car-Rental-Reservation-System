import express from "express";
import validateRequest from "../../Middleware/validateRequest";
import { BookingValidation } from "./booking.validator";
import { BookingControllers } from "./booking.controller";
import auth from "../../Middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.createBooking),
  BookingControllers.createBooking
);
router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBookings);
router.patch(
  "/:bookingId/status",
  auth(USER_ROLE.admin),
  BookingControllers.updateBookingStatus
);

router.get("/my-bookings", auth(USER_ROLE.user), BookingControllers.myBookings);
export const BookingRouter = router;
