import { Car } from "../car/car.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createBookingIntoDB = async (bookingData: TBooking) => {
  const carId = bookingData.carId;
  const car = await Car.findById(carId);

  if (!car || car.isDeleted || car.status !== "available") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Car is not available for booking"
    );
  }

  car.status = "unavailable";
  await car.save();

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
};
