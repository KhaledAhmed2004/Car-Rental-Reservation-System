import { z } from "zod";

const createCarSchema = z.object({
  body: z.object({
    brand: z.string(),
    model: z.string(),
    color: z.string(),
    description: z.string(),
    pricePerHour: z.number().positive(),
    fuelType: z.enum(["Gasoline", "Diesel", "Electric", "Hybrid"]),
    carType: z.enum(["SUV", "Economy", "Luxury", "Electric"]),
    transmission: z.enum(["Automatic", "Manual"]),
    seats: z.number().int().positive(),
    luggageCapacity: z.number().int().positive(),
    doors: z.number().int().positive(),
    rating: z.number().min(0).max(5),
    status: z.enum(["available", "unavailable"]),
    features: z.array(z.string()),
    images: z.array(z.string()),
    mileage: z.number().positive(),
    isDeleted: z.boolean(),
  }),
});

export const carValidation = {
  createCarSchema,
};
