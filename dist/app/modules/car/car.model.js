"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = require("mongoose");
const createCarSchema = new mongoose_1.Schema({
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
exports.Car = (0, mongoose_1.model)("Car", createCarSchema);
