import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Booking } from "../booking/booking.model";
import { TCar } from "./car.interface";
import { Car } from "./car.model";
import { calculateTotalCost } from "../../utils/calculateTotalCost";

const createCarIntoDB = async (carData: TCar) => {
  const createCar = await Car.create(carData);
  return createCar;
};

const getAllCarsFromDB = async (
  searchQuery?: string,
  selectedTransmission?: string,
  selectedFuelType?: string,
  type?: string[],
  // selectedBrands?: string
  selectedBrands?: string[],
  selectedColors?: string[],
  minPrice?: number,
  maxPrice?: number,
  availableNow?: boolean
) => {
  // Base filter object
  let filter: any = {};

  // If searchQuery is provided, create a filter to match brand, model, or carType
  if (searchQuery) {
    const query = new RegExp(searchQuery, "i"); // Case-insensitive search using regex
    filter = {
      $or: [{ brand: query }, { model: query }, { carType: query }],
    };
  }

  // If selectedTransmission is provided, add it to the filter
  if (selectedTransmission) {
    filter.transmission = selectedTransmission;
  }

  // If selectedFuelType is provided, add it to the filter
  if (selectedFuelType) {
    filter.fuelType = selectedFuelType; // Assuming your DB has a 'fuelType' field
  }

  // Add type (assuming it's another filterable field) to the filter
  if (type) {
    filter.carType = type; // Assuming 'type' is a field in the DB
  }
  // if (selectedBrands) {
  //   filter.brand = selectedBrands; // Assuming 'type' is a field in the DB
  // }
  // If selectedBrands is an array, use $in to match any brand from the array
  if (selectedBrands && selectedBrands.length > 0) {
    filter.brand = { $in: selectedBrands };
  }

  // If type is an array and contains elements, add it to the filter
  if (type && type.length > 0) {
    filter.carType = { $in: type }; // Assuming 'carType' is a field in the DB
  }

  // If selectedColors is an array, use $in to match any color from the array
  if (selectedColors && selectedColors.length > 0) {
    filter.color = { $in: selectedColors }; // Assuming 'color' is a field in the DB
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    filter.pricePerHour = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice !== undefined) {
    filter.pricePerHour = { $gte: minPrice };
  } else if (maxPrice !== undefined) {
    filter.pricePerHour = { $lte: maxPrice };
  }

  // Filter for available cars if availableNow is true
  if (availableNow === true) {
    filter.status = "available"; // Assuming your car model has an 'isAvailable' field
  }

  // Query the database with the built filter
  const cars = await Car.find(filter);
  return cars;
};

const getSingleCarFromDB = async (id: string) => {
  const GetSingleCar = await Car.findById(id);
  return GetSingleCar;
};

// Partial<TCar> makes all properties of TCar optional
const updateCar = async (id: string, payload: Partial<TCar>) => {
  const update = await Car.findByIdAndUpdate(id, payload, { new: true });
  return update;
};

const deleteCarFromDB = async (id: string) => {
  const deleting = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return deleting;
};

const returnTheCar = async (payload: Record<string, string>) => {
  const { bookingId, endTime } = payload;
  const booking = await Booking.findById(bookingId)
    .populate("carId")
    .populate("userId");
  if (!booking || booking.endTime) {
    throw new AppError(
      httpStatus.NOT_EXTENDED,
      "Invalid booking ID or car already returned"
    );
  }
  booking.endTime = endTime;

  const car = await Car.findById(booking.carId);

  if (car) {
    car.status = "available";
    await car.save();
  }

  const pricePerHour = car?.pricePerHour;

  booking.totalCost = calculateTotalCost(
    pricePerHour as number,
    booking.startTime,
    booking.endTime
  );
  await booking.save();
  return booking;
};

export const CarService = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCar,
  deleteCarFromDB,
  returnTheCar,
};
