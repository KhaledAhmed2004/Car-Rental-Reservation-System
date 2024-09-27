import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { CarService } from "./car.service";

const createCar: RequestHandler = catchAsync(async (req, res) => {
  console.log(req.cookies);
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
  const {
    searchQuery,
    selectedTransmission,
    selectedFuelType,
    type,
    selectedBrands,
    selectedColors,
    minPrice,
    maxPrice,
    availableNow,
  } = req.query;

  // Parse selectedBrands as an array if it comes as a comma-separated string, or set to undefined if empty
  const brandsArray = selectedBrands
    ? (selectedBrands as string).split(",")
    : undefined;

  // Parse type as an array if it comes as a comma-separated string, or set to undefined if empty
  const typeArray = type ? (type as string).split(",") : undefined;

  // Parse selectedColors as an array if it comes as a comma-separated string, or set to undefined if empty
  const colorsArray = selectedColors
    ? (selectedColors as string).split(",")
    : undefined;

  // Parse minPrice and maxPrice to numbers, or set to undefined if not provided
  const parsedMinPrice = minPrice ? Number(minPrice) : undefined;
  const parsedMaxPrice = maxPrice ? Number(maxPrice) : undefined;

  // Parse availableNow to a boolean (true/false)
  const parsedAvailableNow = availableNow === "true";
  // const getCallCars = await CarService.getAllCarsFromDB();
  const getCallCars = await CarService.getAllCarsFromDB(
    searchQuery as string,
    selectedTransmission as string,
    selectedFuelType as string,
    typeArray as string[],
    brandsArray as string[],
    colorsArray as string[],
    parsedMinPrice,
    parsedMaxPrice,
    parsedAvailableNow
  );

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
  console.log("update:", updateCar);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car updated successfully",
    data: updatedCar,
  });
});

const deleteCar: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req?.params;
  const deletedCar = await CarService.deleteCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car Deleted successfully",
    data: deletedCar,
  });
});

const returnTheCar: RequestHandler = catchAsync(async (req, res) => {
  const returnedData = req?.body;
  const updatedCar = await CarService.returnTheCar(returnedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car returned successfully",
    data: updatedCar,
  });
});
export const CarControllers = {
  createCar,
  getCallCars,
  getSingleCar,
  updateCar,
  deleteCar,
  returnTheCar,
};
