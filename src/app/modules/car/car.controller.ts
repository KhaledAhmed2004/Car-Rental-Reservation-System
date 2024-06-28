import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CarService } from "./car.service";

const createCar: RequestHandler = catchAsync(async (req, res) => {
  const carData = req?.body;
  const car = await CarService.createCarIntoDB(carData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Car created successfully",
    data: car,
  });
});

const getCallCars: RequestHandler = catchAsync(async (req, res) => {
  const getCallCars = await CarService.getAllCarsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars retrieved successfully",
    data: getCallCars,
  });
});

const getSingleCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const singleCar = await CarService.getSingleCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "A Car retrieved successfully",
    data: singleCar,
  });
});

const updateCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const updatedData = req?.body;
  const updatedCar = await CarService.updateCar(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car updated successfully",
    data: updatedCar,
  });
});

const deleteCar: RequestHandler = catchAsync(async (req, res) => {
    
});

export const CarControllers = {
  createCar,
  getCallCars,
  getSingleCar,
  updateCar,
  deleteCar
};
