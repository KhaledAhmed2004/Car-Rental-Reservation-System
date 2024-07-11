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
exports.CarService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const booking_model_1 = require("../booking/booking.model");
const car_model_1 = require("./car.model");
const calculateTotalCost_1 = require("../../utils/calculateTotalCost");
const createCarIntoDB = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    const createCar = yield car_model_1.Car.create(carData);
    return createCar;
});
const getAllCarsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllCars = yield car_model_1.Car.find();
    return getAllCars;
});
const getSingleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const GetSingleCar = yield car_model_1.Car.findById(id);
    return GetSingleCar;
});
// Partial<TCar> makes all properties of TCar optional
const updateCar = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield car_model_1.Car.findByIdAndUpdate(id, payload, { new: true });
    return update;
});
const deleteCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleting = yield car_model_1.Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return deleting;
});
const returnTheCar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, endTime } = payload;
    const booking = yield booking_model_1.Booking.findById(bookingId)
        .populate("carId")
        .populate("userId");
    if (!booking || booking.endTime) {
        throw new AppError_1.default(http_status_1.default.NOT_EXTENDED, "Invalid booking ID or car already returned");
    }
    booking.endTime = endTime;
    const car = yield car_model_1.Car.findById(booking.carId);
    if (car) {
        car.status = "available";
        yield car.save();
    }
    const pricePerHour = car === null || car === void 0 ? void 0 : car.pricePerHour;
    console.log(pricePerHour);
    booking.totalCost = (0, calculateTotalCost_1.calculateTotalCost)(pricePerHour, booking.startTime, booking.endTime);
    yield booking.save();
    return booking;
});
exports.CarService = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCar,
    deleteCarFromDB,
    returnTheCar,
};
