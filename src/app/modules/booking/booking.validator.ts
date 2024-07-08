import { z } from "zod";

const createBooking = z.object({
  body: z.object({
    date: z.string(),
    carId: z.string(),
    userId: z.string().optional(),
    startTime: z.string(),
    endTime: z.string().nullable().default(null),
    totalCost: z.number().default(0),
  }),
});

export const BookingValidation = { createBooking };
