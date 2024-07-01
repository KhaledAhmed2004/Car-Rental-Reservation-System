import { Types } from "mongoose";

export type TBooking = {
  date: string;
  carId: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
};
