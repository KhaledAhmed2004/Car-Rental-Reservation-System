import { TCar } from "./car.interface";
import { Car } from "./car.model";

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

export const CarService = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateCar,
  deleteCarFromDB,
};
