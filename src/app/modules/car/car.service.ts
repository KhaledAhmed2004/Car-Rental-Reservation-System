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
const getAllCarsFromDB = async () => {
  const getAllCars = await Car.find();
  return getAllCars;
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
  console.log(pricePerHour);

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
