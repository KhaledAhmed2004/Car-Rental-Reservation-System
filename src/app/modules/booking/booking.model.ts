import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const BookingSchema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    status: { type: String, default: "pending" },
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
    nidOrPassport: { type: String, required: true },
    drivingLicense: { type: String, required: true },
    // paymentInformation: { type: String, required: true },
    additionalOptions: {
      gps: { type: Boolean, default: false },
      childSeat: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export const Booking = model<TBooking>("Booking", BookingSchema);
