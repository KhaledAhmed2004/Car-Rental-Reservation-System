import { Types } from "mongoose";

export type TBooking = {
  date: string;
  userId: Types.ObjectId;
  carId: Types.ObjectId;
  startTime: string;
  endTime: string | null;
  totalCost: number;
};
