import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";

const createCarSchema = new Schema<TCar>({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  fuelType: {
    type: String,
    enum: ["Gasoline", "Diesel", "Electric", "Hybrid"],
    required: true,
  },
  transmission: {
    type: String,
    enum: ["Automatic", "Manual"],
    required: true,
  },
  seats: { type: Number, required: true },
  luggageCapacity: { type: Number, required: true },
  doors: { type: Number, required: true },
  rating: { type: Number, required: true },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  features: { type: [String], required: true },
  images: { type: [String], required: true },
  mileage: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  carType: {
    type: String,
    enum: ["suv", "economy", "luxury", "electric"],
    required: true,
  },
});

export const Car = model<TCar>("Car", createCarSchema);
