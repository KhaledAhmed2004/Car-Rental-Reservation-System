"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string(),
        carId: zod_1.z.string(),
        userId: zod_1.z.string().optional(),
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string().nullable().default(null),
        totalCost: zod_1.z.number().default(0),
    }),
});
exports.BookingValidation = { createBooking };
