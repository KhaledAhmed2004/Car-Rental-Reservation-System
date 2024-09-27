import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { RequestHandler } from "express";

const createBooking: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const bookingData = { ...req.body, userId };
  // console.log(bookingData);
  const booking = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: booking,
  });
});

const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  // Extract query parameters from the request object

  const allBookings = await BookingServices.getAllBookings(req?.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: allBookings,
  });
});

const updateBookingStatus: RequestHandler = catchAsync(async (req, res) => {
  const { bookingId } = req.params; // Get booking ID from route parameters
  const { status } = req.body; // Get status from the request body

  // Call the service to update the booking's status
  const updatedBooking = await BookingServices.updateBookingStatus(
    bookingId,
    status
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking status updated successfully",
    data: updatedBooking,
  });
});

const myBookings = catchAsync(async (req, res) => {
  const { userId } = req.user;
  console.log(userId);
  const myBookings = await BookingServices.getMyBookings(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Bookings retrieved successfully",
    data: myBookings,
  });
});
export const BookingControllers = {
  updateBookingStatus,
  createBooking,
  getAllBookings,
  myBookings,
};
