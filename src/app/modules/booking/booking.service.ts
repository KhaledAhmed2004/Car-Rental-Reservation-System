import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (bookingData: TBooking) => {
  const createBooking = await Booking.create(bookingData);
  return createBooking;
};

const getAllBookings = async (query: Record<string, unknown>) => {
  console.log(query);
  const allBookings = await Booking.find(query).populate("carId");
  return allBookings;
};
export const BookingServices = { createBookingIntoDB, getAllBookings };
