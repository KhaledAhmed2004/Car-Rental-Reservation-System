import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";

const createCarSchema = new Schema<TCar>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  isElectric: { type: Boolean, required: true },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  features: { type: [String], required: true },
  pricePerHour: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Car = model<TCar>("Car", createCarSchema);
