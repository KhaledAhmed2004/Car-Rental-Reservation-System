import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const BookingSchema = new Schema<TBooking>({
  date: { type: String, required: true },
  carId: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    default: null,
  },
  totalCost: { type: Number, default: 0 },
});

export const Booking = model<TBooking>("Booking", BookingSchema);
