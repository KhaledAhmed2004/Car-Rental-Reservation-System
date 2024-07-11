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
exports.CarControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const car_service_1 = require("./car.service");
const createCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies);
    const carData = req === null || req === void 0 ? void 0 : req.body;
    const car = yield car_service_1.CarService.createCarIntoDB(carData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Car created successfully",
        data: car,
    });
}));
const getCallCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getCallCars = yield car_service_1.CarService.getAllCarsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cars retrieved successfully",
        data: getCallCars,
    });
}));
const getSingleCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const singleCar = yield car_service_1.CarService.getSingleCarFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "A Car retrieved successfully",
        data: singleCar,
    });
}));
const updateCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const updatedData = req === null || req === void 0 ? void 0 : req.body;
    const updatedCar = yield car_service_1.CarService.updateCar(id, updatedData);
    console.log("update:", updateCar);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car updated successfully",
        data: updatedCar,
    });
}));
const deleteCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const deletedCar = yield car_service_1.CarService.deleteCarFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car Deleted successfully",
        data: deletedCar,
    });
}));
const returnTheCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnedData = req === null || req === void 0 ? void 0 : req.body;
    const updatedCar = yield car_service_1.CarService.returnTheCar(returnedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Car returned successfully",
        data: updatedCar,
    });
}));
exports.CarControllers = {
    createCar,
    getCallCars,
    getSingleCar,
    updateCar,
    deleteCar,
    returnTheCar,
};
