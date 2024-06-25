import { Schema, model } from "mongoose";
import { TUserCreate, TUserSignIn } from "./user.interface";

const userCreateSchema = new Schema<TUserCreate>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"] },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<TUserCreate>("User", userCreateSchema);
