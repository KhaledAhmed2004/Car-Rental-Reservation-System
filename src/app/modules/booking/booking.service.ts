import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (bookingData: TBooking) => {
  // console.log(userId);
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
