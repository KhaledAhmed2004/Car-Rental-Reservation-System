"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    carId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
});
exports.Booking = (0, mongoose_1.model)("Booking", BookingSchema);
