import { Car } from "../car/car.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createBookingIntoDB = async (bookingData: TBooking) => {
  const car = await Car.findById(bookingData.carId);
  // console.log("Booking Data:", bookingData);
  // console.log("Car Object:", car);
  if (!car || car.isDeleted || car.status !== "available") {
    console.log(car);
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Car is not available for booking"
    );
  }

  car.status = "unavailable";
  await car.save();

  // Set the status to "pending"
  bookingData.status = "pending";

  const createBooking = (
    await (await Booking.create(bookingData)).populate("carId")
  ).populate("userId");
  return createBooking;
};

const getAllBookings = async (query: Record<string, unknown>) => {
  const allBookings = await Booking.find(query)
    .populate("carId")
    .populate("userId");
  return allBookings;
};

const updateBookingStatus = async (bookingId: string, status: string) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  // Update the booking status
  booking.status = status;
  await booking.save();

  return booking;
};

const getMyBookings = async (userId: string) => {
  const myAllBookings = await Booking.find({ userId })
    .populate("carId")
    .populate("userId");
  return myAllBookings;
};
export const BookingServices = {
  createBookingIntoDB,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
};
