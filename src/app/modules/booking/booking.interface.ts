import { Types } from "mongoose";

export type TBooking = {
  date: string;
  userId: Types.ObjectId;
  carId: Types.ObjectId;
  startTime: string;
  endTime: string | null;
  totalCost: number;
  status?: string;
  nidOrPassport: string;
  drivingLicense: string;
  // paymentInformation: string;
  additionalOptions: {
    gps: boolean;
    childSeat: boolean;
  };
};
