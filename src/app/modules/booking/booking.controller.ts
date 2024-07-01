import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { RequestHandler } from "express";

const createBooking: RequestHandler = catchAsync(async (req, res) => {
  const bookingData = req?.body;
  const booking = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: booking,
  });
});

const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const allBookings = await BookingServices.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: allBookings,
  });
});

export const BookingControllers = { createBooking, getAllBookings };
