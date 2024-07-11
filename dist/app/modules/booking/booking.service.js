"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const car_model_1 = require("../car/car.model");
const booking_model_1 = require("./booking.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createBookingIntoDB = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = bookingData.carId;
    const car = yield car_model_1.Car.findById(carId);
    if (!car || car.isDeleted || car.status !== "available") {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car is not available for booking");
    }
    car.status = "unavailable";
    yield car.save();
    const createBooking = (yield (yield booking_model_1.Booking.create(bookingData)).populate("carId")).populate("userId");
    return createBooking;
});
const getAllBookings = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const allBookings = yield booking_model_1.Booking.find(query)
        .populate("carId")
        .populate("userId");
    return allBookings;
});
const getMyBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const myAllBookings = yield booking_model_1.Booking.find({ userId })
        .populate("carId")
        .populate("userId");
    return myAllBookings;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookings,
    getMyBookings,
};
