import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CarService } from "./car.service";

const createCar: RequestHandler = catchAsync(async (req, res) => {
  const carData = req?.body;
  console.log(carData);
  const car = await CarService.createCarIntoDB(carData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Car created successfully",
    data: car,
  });
});

export const CarControllers = {
  createCar,
};
