export type TCar = {
  brand: string;
  model: string;
  color: string;
  description: string;
  pricePerHour: number;
  fuelType: "Gasoline" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  seats: number;
  luggageCapacity: number;
  doors: number;
  rating: number;
  status: "available" | "unavailable";
  features: string[];
  images: string[];
  // location: string;
  mileage: number;
  isDeleted: boolean;
  carType: "suv" | "economy" | "luxury" | "electric";
};
