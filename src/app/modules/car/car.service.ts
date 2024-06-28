import { TCar } from "./car.interface";
import { Car } from "./car.model";

const createCarIntoDB = async (carData: TCar) => {
  const createCar = await Car.create(carData);
  return createCar;
};
export const CarService = {
  createCarIntoDB,
};
